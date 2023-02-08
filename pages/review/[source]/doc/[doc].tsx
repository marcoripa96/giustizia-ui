import {
  useDocumentEventListener,
  useParam,
  useQueryParam,
  useWindowEventListener,
} from '@/hooks';
import Helper from '@/modules/review/Helper/Helpter';
import LoadingOverlay from '@/modules/review/LoadingOverlay';
import ReviewList from '@/modules/review/ReviewList/ReviewList';
import { ReviewListItemProps } from '@/modules/review/ReviewList/ReviewListItem';
import ReviewListHeader from '@/modules/review/ReviewListHeader/ReviewListHeader';
import ReviewProvider from '@/modules/review/ReviewProvider/ReviewProvider';
import {
  selectCurrentAnnotation,
  selectCurrentEntities,
  selectDocumentToSave,
  selectIsDocDone,
  selectListAnnotations,
  selectProgress,
  useReviewDispatch,
  useSelector,
} from '@/modules/review/ReviewProvider/selectors';
import { createNewCandidate } from '@/modules/review/ReviewProvider/utils';
import Searchbar from '@/modules/review/Searchbar/Searchbar';
import { Candidate, EntityAnnotation } from '@/server/routers/document';
import { useMutation, useQuery } from '@/utils/trpc';
import styled from '@emotion/styled';
import { Virtualizer } from '@tanstack/react-virtual';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ChangeEvent, ReactElement, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

const OuterContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  inset: 0,
  maxWidth: '900px',
  margin: '0 auto',
  padding: '0px 20px',
});

const InnerContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100%',
  maxWidth: '1264px',
  margin: '0 auto',
});

const OverlayLoading = styled(motion.div)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.06)',
});

const LoadingSpinner = styled(motion.div)({
  width: '20px',
  height: '20px',
  // border: '2px solid #000'
  background: '#000',
});

const MainContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
});

const ReviewDocument = () => {
  const [searchKey, setSearchKey] = useState('');
  const [searchbarActive, setSearchbarActive] = useState(false);
  const [highlightSelectionListItem, setHighlightSelectionListItem] = useState<
    number | null
  >(null);
  const loading = useSelector((state) => state.isLoading);
  const listItems = useSelector(selectListAnnotations);
  const currentItemListCursor = useSelector(
    (state) => state.ui.currentItemCursor
  );
  const docToSave = useSelector(selectDocumentToSave);
  const refScroller = useRef<Virtualizer<HTMLDivElement, Element>>(null);
  const { total, done } = useSelector(selectProgress);
  const isDocDone = useSelector(selectIsDocDone);
  const [sourceId] = useParam<string>('source');
  const [docId] = useParam<string>('doc');
  const saveDocumentMutation = useMutation(['review.saveDocument']);
  const dispatch = useReviewDispatch();
  const router = useRouter();
  const currentAnnotation = useSelector(selectCurrentAnnotation);

  const isLoading = loading || saveDocumentMutation.isLoading;

  useEffect(() => {
    if (listItems.length > 0) {
      const key = listItems[currentItemListCursor].annotation.features.mention
        .replace(/\s{1,}/g, ' ')
        .toLowerCase();
      setSearchKey(key);
    }
  }, [currentItemListCursor, listItems]);

  useEffect(() => {
    if (!sourceId || !docId || total === 0 || isDocDone) {
      return;
    }
    if (done !== total) {
      return;
    }

    console.log(`Saving docId ${docId}`);

    saveDocumentMutation.mutate(
      {
        sourceId,
        docId,
        document: docToSave,
      },
      {
        onSuccess: () => {
          router.push(
            `/review/${sourceId}/doc/${Number(docId) + 1}`,
            undefined,
            { shallow: true }
          );
        },
      }
    );
  }, [total, done, sourceId, docId, docToSave, isDocDone]);

  useDocumentEventListener('keydown', (event) => {
    if (isLoading) {
      return;
    }
    // open search
    if (event.key === 'f' && event.ctrlKey) {
      event.preventDefault();
      setSearchbarActive(true);
      return;
    }
    // assign new item and go next
    if (event.key === 'a' && event.ctrlKey) {
      event.preventDefault();
      nextItem({
        cursor: currentItemListCursor,
        withAdd: true,
        candidate: createNewCandidate({ title: searchKey, url: searchKey }),
      });
      setSearchbarActive(false);
      return;
    }

    // assign new item and go next
    if (event.key === 'q' && event.ctrlKey) {
      event.preventDefault();
      const hrefKey = currentAnnotation?.features.mention.replace(/\s{1,}/g, '+').toLowerCase();
      const href = `https://it.wikipedia.org/wiki/Special:Search?go=Go&search=${hrefKey}`
      window.open(href, '_blank');
      return;
    }

    // confirm selection
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault();

      flushSync(() => {
        dispatch({
          type: 'confirmAnnotation'
        });
      });
      scrollToNextItem();
      setSearchbarActive(false);
      return;
    }

    // nil selection
    if (event.key === ' ' && event.ctrlKey) {
      event.preventDefault();
      flushSync(() => {
        dispatch({
          type: 'nilAnnotation'
        });
      });
      scrollToNextItem();
      setSearchbarActive(false);
      return;
    }

    if (!searchbarActive) {
      // highlight an option for the current item
      const n = Number(event.key);
      if (event.key === '\\' || (n > 0 && n < 10)) {
        event.preventDefault();
        setHighlightSelectionListItem(event.key === '\\' ? 9 : n - 1);
        return;
      }
    }
  });

  useWindowEventListener('keyup', (event) => {
    if (!searchbarActive) {
      // select an option for the current item
      if (highlightSelectionListItem != null) {
        event.preventDefault();
        nextItem({
          cursor: currentItemListCursor,
          index: highlightSelectionListItem,
        });
      }
      setHighlightSelectionListItem(null);
    }
  });

  const handleSearchbarOpen = () => {
    setSearchbarActive(true);
  };

  const handleSearchbarClose = () => {
    setSearchbarActive(false);
  };

  const handleChangeActiveItem = (
    index: number,
    inView: boolean,
    entry: IntersectionObserverEntry
  ) => {
    if (!inView) {
      return;
    }
    dispatch({
      type: 'setActiveItem',
      payload: {
        cursor: index,
      },
    });
  };

  const handleChangeReviewList = (cursor: number, index: number) => {
    nextItem({
      cursor,
      index,
    });
  };

  const handleItemSelected = (candidate: Candidate) => {
    nextItem({
      cursor: currentItemListCursor,
      candidate,
      withAdd: true,
    });
  };

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKey(event.target.value);
  };

  const scrollToNextItem = () => {
    if (currentItemListCursor + 1 < total) {
      refScroller.current?.scrollToIndex(currentItemListCursor + 1, {
        align: 'start',
      });
    }
  };

  const nextItem = (props: {
    cursor: number;
    index?: number;
    candidate?: Candidate;
    withAdd?: boolean;
  }) => {
    flushSync(() => {
      dispatch({
        type: props.withAdd ? 'addCandidateOptionItem' : 'nextAnnotation',
        payload: {
          ...props,
        },
      });
    });
    scrollToNextItem();
  };

  return (
    <OuterContainer>
      <MainContent>
        <ReviewListHeader />
        <ReviewList
          ref={refScroller}
          items={listItems}
          cursor={currentItemListCursor}
          highlightOptionIndex={highlightSelectionListItem}
          onChange={handleChangeReviewList}
          onChangeActiveItem={handleChangeActiveItem}
        />
        <Searchbar
          active={searchbarActive}
          value={searchKey}
          onChange={handleSearchInputChange}
          onOpen={handleSearchbarOpen}
          onClose={handleSearchbarClose}
          onItemSelected={handleItemSelected}
        />
      </MainContent>
      <LoadingOverlay show={isLoading} />
      <Helper />
    </OuterContainer>
  );
};

export default ReviewDocument;

ReviewDocument.getLayout = function getLayout(page: ReactElement) {
  return <ReviewProvider>{page}</ReviewProvider>;
};
