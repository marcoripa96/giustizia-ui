import { AdditionalAnnotationProps, Candidate } from "@/server/routers/document";
import styled from "@emotion/styled";
import { forwardRef, MouseEvent, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useReviewDispatch } from "../ReviewProvider/selectors";
import ReviewListItem from "./ReviewListItem";
import { InView } from 'react-intersection-observer';
import ScrollArea from "./ScrollArea";
import { Virtualizer } from "@tanstack/react-virtual";
import { useWindowEventListener } from "@/hooks";
import { Annotation } from "@/lib/ner/core/types";
import LinkPopover from "./LInkPopover";

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
  highlightOptionIndex: number | null;
  items: ReviewListItem[];
  onChange: (cursor: number, index: number) => void;
  onChangeActiveItem: (index: number, inView: boolean, entry: IntersectionObserverEntry) => void;
}

const ReviewList = forwardRef<Virtualizer<HTMLDivElement, Element>, ReviewListProps>(function ReviewList({ cursor, highlightOptionIndex, items, onChange, onChangeActiveItem }, ref) {
  const handleClickItem = (cursor: number) => (index: number) => {
    onChange(cursor, index);
  }

  const changeActiveItem = (index: number, inView: boolean, entry: IntersectionObserverEntry) => {
    onChangeActiveItem(index, inView, entry);
  }

  return (
    <>
      <ScrollArea ref={ref}>
        {items.map((item, index) => (
          <ItemInViewContainer key={index} onChange={(inView, entry) => changeActiveItem(index, inView, entry)} threshold={0.6}>
            <ReviewListItem
              onClick={handleClickItem(index)}
              active={cursor === index}
              highlightSelectionItem={index === cursor && highlightOptionIndex != null ? highlightOptionIndex : null}
              {...item} />
          </ItemInViewContainer>
        ))}
      </ScrollArea>
    </>

  )
});

export default ReviewList;