import { AdditionalAnnotationProps, Candidate } from "@/server/routers/document";
import styled from "@emotion/styled";
import { forwardRef, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useReviewDispatch } from "../ReviewProvider/selectors";
import ReviewListItem from "./ReviewListItem";
import { InView } from 'react-intersection-observer';
import ScrollArea from "./ScrollArea";
import { Virtualizer } from "@tanstack/react-virtual";
import { useWindowEventListener } from "@/hooks";
import { Annotation } from "@/lib/ner/core/types";

const ItemInViewContainer = styled(InView)({
  marginTop: 'auto'
})

type ReviewListItem = {
  text: string;
  annotation: Annotation<AdditionalAnnotationProps>;
  startAnnRelativeOffset: number;
  endAnnRelativeOffset: number;
}

type ReviewListProps = {
  cursor: number;
  items: ReviewListItem[];
  onChange: (candidate: Candidate, index: number) => void;
  onChangeActiveItem: (index: number, inView: boolean, entry: IntersectionObserverEntry) => void;
}

const ReviewList = forwardRef<Virtualizer<HTMLDivElement, Element>, ReviewListProps>(function ReviewList({ cursor, items, onChange, onChangeActiveItem }, ref) {
  const [highlightSelectionItem, setHighlightSelectionItem] = useState<number | null>(null);

  useWindowEventListener('keydown', (event) => {
    const n = Number(event.key);
    if (event.key === '\\' || n > 0 && n < 10) {
      event.preventDefault();
      setHighlightSelectionItem(event.key === '\\' ? 9 : n - 1);
    }
  });

  useWindowEventListener('keyup', (event) => {

    if (highlightSelectionItem != null) {
      event.preventDefault();
      const candidate = items[cursor].annotation.features.additional_candidates[highlightSelectionItem];
      onChange(candidate, cursor);
    }
    setHighlightSelectionItem(null);
  });

  const handleClickItem = (candidate: Candidate) => {
    onChange(candidate, cursor);
  }

  const changeActiveItem = (index: number, inView: boolean, entry: IntersectionObserverEntry) => {
    onChangeActiveItem(index, inView, entry);
  }

  return (
    <ScrollArea ref={ref}>
      {items.map((item, index) => (
        <ItemInViewContainer key={index} onChange={(inView, entry) => changeActiveItem(index, inView, entry)} threshold={0.6}>
          <ReviewListItem
            onClick={handleClickItem}
            active={cursor === index}
            highlightSelectionItem={index === cursor && highlightSelectionItem != null ? highlightSelectionItem : null}
            {...item} />
        </ItemInViewContainer>
      ))}
    </ScrollArea>
  )
});

export default ReviewList;