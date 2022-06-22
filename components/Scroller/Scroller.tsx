import useResizeObserver from "@/hooks/use-resize-ovserver";
import styled from "@emotion/styled"
import { MouseEvent, PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

const SCROLL_BOX_MIN_HEIGHT = 20;

const scrollbarBoxSizes = {
  boxHeight: SCROLL_BOX_MIN_HEIGHT,
  thumbTop: 0
}

const ScrollHostContainer = styled.div({
  position: 'relative',
  height: '100%',
  overflow: 'hidden'
});

const ScrollHost = styled.div({
  overflow: 'auto',
  height: '100%',
  // hide native scrollbar
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '::-webkit-scrollbar': {
    display: 'none'
  },
})

const StyledScrollbar = styled.div({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  height: '100%',
  width: '14px',
  padding: '2px 0',
  '&.thumb-enter': {
    opacity: 0
  },
  '&.thumb-enter-active': {
    opacity: 1,
    transition: 'opacity 0.2s cubic-bezier(0.4,0,0.2,1)'
  },
  '&.thumb-exit': {
    opacity: 1
  },
  '&.thumb-exit-active': {
    opacity: 0,
    transition: 'opacity 0.2s 0.5s cubic-bezier(0.4,0,0.2,1)'
  },
})

const ScrollbarThumb = styled.div<Omit<ScrollbarProps, 'onMouseDown'>>(({ boxHeight, thumbTop, isDragging }) => ({
  width: '8px',
  height: `${boxHeight}px`,
  position: 'absolute',
  left: '3px',
  transform: `translate3d(0, ${thumbTop}px, 0)`,
  borderRadius: '12px',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  ...(isDragging && {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  })
}));

type ScrollbarProps = ScrollBoxSizes & {
  isVisible: boolean;
  isDragging: boolean;
  onMouseDown: (event: MouseEvent<HTMLDivElement>) => void;
}

type ScrollBoxSizes = {
  boxHeight: number;
  thumbTop: number;
}

const Scrollbar = (props: ScrollbarProps) => {
  return (
    <CSSTransition
      in={props.isVisible || props.isDragging}
      timeout={{
        appear: 200,
        enter: 200,
        exit: 700
      }}
      classNames="thumb"
      unmountOnExit
    >
      <StyledScrollbar>
        <ScrollbarThumb {...props} />
      </StyledScrollbar>
    </CSSTransition>
  )
}

/**
 * Custom scroll container
 */
const Scroller = ({ children }: PropsWithChildren<{}>) => {
  const [scrollBoxSizes, setScrollBoxSizes] = useState<ScrollBoxSizes>(scrollbarBoxSizes);
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const scrollHostRef = useRef<HTMLDivElement | null>(null);
  const lastScrollPosition = useRef<number>(0);

  useResizeObserver(scrollHostRef, () => {
    // adjust sizes with resize observer when content changes
    update();
  });

  const handleMouseEnter = () => {
    setIsScrollbarVisible(true);
  }

  const handleMouseLeave = () => {
    setIsScrollbarVisible(false);
  }

  const handleScroll = () => {
    if (!scrollHostRef.current) {
      return;
    }
    const scrollHostElement = scrollHostRef.current;
    const { scrollTop, scrollHeight, offsetHeight } = scrollHostElement;
    let newTop = (scrollTop / scrollHeight) * offsetHeight;
    newTop = Math.min(newTop, offsetHeight - scrollBoxSizes.boxHeight);
    setScrollBoxSizes((s) => ({ ...s, thumbTop: newTop }));
  }

  const update = () => {
    if (!scrollHostRef.current) return;

    const scrollHostElement = scrollHostRef.current;
    const { clientHeight, scrollHeight } = scrollHostElement;
    const scrollThumbPercentage = clientHeight / scrollHeight;
    const scrollThumbHeight = scrollThumbPercentage * clientHeight
    setScrollBoxSizes((s) => ({ ...s, boxHeight: scrollThumbHeight }));
  }

  const handleScrollThumbMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    lastScrollPosition.current = event.clientY;
    setIsDragging(true);
  };

  const handleDocumentMouseUp = useCallback(
    (e: DocumentEventMap['mouseup']) => {
      if (isDragging) {
        e.preventDefault();
        setIsDragging(false);
      }
    },
    [isDragging]
  );

  const handleDocumentMouseMove = useCallback(
    (e: DocumentEventMap['mousemove']) => {
      if (isDragging) {
        if (!scrollHostRef.current) return;
        e.preventDefault();
        e.stopPropagation();
        const scrollHostElement = scrollHostRef.current;
        const { scrollHeight, offsetHeight } = scrollHostElement;
        const { boxHeight, thumbTop } = scrollBoxSizes;

        let deltaY = e.clientY - lastScrollPosition.current;
        let percentage = deltaY * (scrollHeight / offsetHeight);

        // setScrollThumbPosition(e.clientY);
        setScrollBoxSizes((s) => ({
          ...s, thumbTop: Math.min(
            Math.max(0, thumbTop + deltaY),
            offsetHeight - boxHeight
          )
        }))

        lastScrollPosition.current = e.clientY;

        setScrollBoxSizes((s) => ({
          ...s,
          thumbTop: Math.min(
            Math.max(0, thumbTop + deltaY),
            offsetHeight - boxHeight
          )
        }))

        scrollHostElement.scrollTop = Math.min(
          scrollHostElement.scrollTop + percentage,
          scrollHeight - offsetHeight
        );
      }
    },
    [isDragging, scrollBoxSizes]
  );

  useEffect(() => {
    if (!scrollHostRef.current) return;
    const scrollHostElement = scrollHostRef.current;

    scrollHostElement.addEventListener("scroll", handleScroll, true);
    return () => {
      scrollHostElement.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  useEffect(() => {
    update();
  }, [children]);

  useEffect(() => {
    //this is handle the dragging on scroll-thumb
    document.addEventListener("mousemove", handleDocumentMouseMove);
    document.addEventListener("mouseup", handleDocumentMouseUp);
    document.addEventListener("mouseleave", handleDocumentMouseUp);
    return function cleanup() {
      document.removeEventListener("mousemove", handleDocumentMouseMove);
      document.removeEventListener("mouseup", handleDocumentMouseUp);
      document.removeEventListener("mouseleave", handleDocumentMouseUp);
    };
  }, [handleDocumentMouseMove, handleDocumentMouseUp]);

  return (
    <ScrollHostContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <ScrollHost ref={scrollHostRef}>
        {children}
      </ScrollHost>
      <Scrollbar
        {...scrollBoxSizes}
        isVisible={isScrollbarVisible}
        isDragging={isDragging}
        onMouseDown={handleScrollThumbMouseDown} />
    </ScrollHostContainer>
  )
}

export default Scroller;