import styled from '@emotion/styled';
import * as ScrollAreaRadix from '@radix-ui/react-scroll-area';
import { useVirtualizer, Virtualizer } from '@tanstack/react-virtual';
import { Children, forwardRef, PropsWithChildren, useEffect, useRef } from 'react';


type ScrollAreaProps = PropsWithChildren<{
  internalScrollbar?: boolean
}>;

const ScrollAreaRoot = styled(ScrollAreaRadix.Root)({
  // height: '100%',
  position: 'relative',
  flexGrow: 1,
  overflow: 'hidden'
})

const ScrollAreaViewport = styled(ScrollAreaRadix.Viewport)({
  width: '100%',
  height: '100%',
  '> div': {
    height: '100%'
  },
  contain: 'strict'
})

const Scrollbar = styled(ScrollAreaRadix.ScrollAreaScrollbar)({
  display: 'flex',
  userSelect: 'none',
  touchAction: 'none',
  padding: '2px',
  background: 'rgba(0,0,0,0.05)',
  transition: 'background 250ms ease-in-out',
  width: '10px'
})

const ScrollbarThumb = styled(ScrollAreaRadix.ScrollAreaThumb)({
  flex: 1,
  background: 'rgba(0,0,0,0.2)',
  borderRadius: '10px',
  position: 'relative'
})


const List = styled.div({
  width: '100%',
  position: 'relative'
});

const ViewPort = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  padding: '0px 10px 10px 10px',
})

const VirtualItem = styled.div({})

const ScrollArea = forwardRef<Virtualizer<HTMLDivElement, Element>, ScrollAreaProps>(function ScrollArea({ internalScrollbar, children }, ref) {
  const parentRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const count = items.length;

  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 600
  })

  useEffect(() => {
    // set forwarded ref to virtualizer
    if (ref) {
      if (typeof ref === 'function') {
        ref(virtualizer);
      } else if (ref) {
        ref.current = virtualizer;
      }
    }
  }, [virtualizer])

  const virtualItems = virtualizer.getVirtualItems()


  return (
    <ScrollAreaRoot
      style={{
        margin: internalScrollbar ? '0px 0px 0px -10px' : '0 -10px'
      }}>
      <ScrollAreaViewport ref={parentRef}>
        {virtualItems.length > 0 ? (
          <List
            style={{
              height: virtualizer.getTotalSize()
            }}>
            <ViewPort
              style={{
                transform: `translateY(${virtualItems[0].start}px)`,
              }}
            >
              {virtualItems.map((virtualRow) => (
                <VirtualItem
                  key={virtualRow.key}
                  data-index={virtualRow.index}
                  ref={virtualizer.measureElement}>
                  {items[virtualRow.index]}
                </VirtualItem>
              ))}
            </ViewPort>
          </List>
        ) : null}
      </ScrollAreaViewport>
      <Scrollbar orientation="vertical">
        <ScrollbarThumb />
      </Scrollbar>
      <Scrollbar orientation="horizontal">
        <ScrollbarThumb />
      </Scrollbar>
      <ScrollAreaRadix.Corner />
    </ScrollAreaRoot>
  )
});

export default ScrollArea;