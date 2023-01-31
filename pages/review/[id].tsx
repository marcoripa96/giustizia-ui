import { useParam, useQueryParam, useWindowEventListener } from "@/hooks";
import ReviewList from "@/modules/review/ReviewList/ReviewList";
import { ReviewListItemProps } from "@/modules/review/ReviewList/ReviewListItem";
import ReviewListHeader from "@/modules/review/ReviewListHeader/ReviewListHeader";
import ReviewProvider from "@/modules/review/ReviewProvider/ReviewProvider";
import { selectCurrentEntities, selectListAnnotations, selectProgress, useReviewDispatch, useSelector } from "@/modules/review/ReviewProvider/selectors";
import Searchbar from "@/modules/review/Searchbar/Searchbar";
import { Candidate, EntityAnnotation } from "@/server/routers/document";
import { useQuery } from "@/utils/trpc";
import styled from "@emotion/styled";
import { Virtualizer } from "@tanstack/react-virtual";
import { useRouter } from "next/router";
import { ChangeEvent, ReactElement, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

const OuterContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  inset: 0
})

const InnerContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100%',
  maxWidth: '1264px',
  margin: '0 auto'
})

// const Toolbar = styled.div({
//   display: 'flex',
//   flexDirection:
// })
const ButtonNextPrev = styled.div({
  minWidth: '200px',
  height: '100px'
})

const MainContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%'
})

const ReviewDocument = () => {
  const [searchKey, setSearchKey] = useState('');
  const listItems = useSelector(selectListAnnotations);
  const currentItemListCursor = useSelector((state) => state.ui.currentItemCursor);
  const refScroller = useRef<Virtualizer<HTMLDivElement, Element>>(null);
  const { total } = useSelector(selectProgress);
  const dispatch = useReviewDispatch();
  const router = useRouter();
  const docId = useQueryParam('doc');

  useEffect(() => {
    setSearchKey(listItems[currentItemListCursor].annotation.features.mention);
  }, [currentItemListCursor, listItems]);

  const handleChangeActiveItem = (index: number, inView: boolean, entry: IntersectionObserverEntry) => {
    if (!inView) {
      return;
    }
    dispatch({
      type: 'setActiveItem',
      payload: {
        cursor: index
      }
    })
  }

  const handleChangeReviewList = (candidate: Candidate, index: number) => {
    nextItem(candidate);
  }

  const handleItemSelected = (candidate: Candidate) => {
    nextItem(candidate, true);
  }

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKey(event.target.value);
  }

  const nextItem = (candidate: Candidate, withAdd = false) => {
    flushSync(() => {
      dispatch({
        type: withAdd ? 'addCandidateOptionItem' : 'nextAnnotation',
        payload: {
          candidate
        }
      })
    })
    if (currentItemListCursor + 1 < total) {
      refScroller.current?.scrollToIndex(currentItemListCursor + 1, {
        align: 'start'
      })
    } else {
      console.log('save')
      // save doc and change doc
    }
  }

  return (
    <OuterContainer>
      <InnerContainer>
        <ButtonNextPrev />
        <MainContent>
          <ReviewListHeader />
          <ReviewList
            ref={refScroller}
            items={listItems}
            cursor={currentItemListCursor}
            onChange={handleChangeReviewList}
            onChangeActiveItem={handleChangeActiveItem} />
          <Searchbar
            value={searchKey}
            onChange={handleSearchInputChange}
            onItemSelected={handleItemSelected} />
        </MainContent>
        <ButtonNextPrev />
      </InnerContainer>
    </OuterContainer>
  )
};

export default ReviewDocument;

ReviewDocument.getLayout = function getLayout(page: ReactElement) {
  return (
    <ReviewProvider>
      {page}
    </ReviewProvider>
  )
}