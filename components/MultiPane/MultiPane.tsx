import styled from "@emotion/styled";
import { Children, isValidElement, MouseEvent, PropsWithChildren, useEffect, useRef, useState } from "react";

type MultiPaneProps = {}

type PaneProps = {
  width: number | undefined;
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  height: '100%'
})

const Pane = styled.div<PaneProps>(({ width }) => ({
  position: 'relative',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  minWidth: width == null ? 'initial' : `${width}px`,
  maxWidth: width == null ? 'initial' : `${width}px`
}));

const RisizeHandle = styled.div({
  width: '11px',
  margin: '0 -5px',
  borderLeft: '5px solid transparent',
  borderRight: '5px solid transparent',
  background: 'padding-box rgba(0,0,0,0.05)',
  zIndex: 1,
  cursor: 'col-resize',
  '&:hover': {
    borderColor: 'rgba(0,0,0,0.05)'
  }
})

type SizesState = Record<number, number>;
type InitialSizeState = {
  position: number,
  size: number,
  index: number
}


const MultiPane = ({ children }: PropsWithChildren<MultiPaneProps>) => {
  // keep track of the sizes for each left panel
  const [sizes, setSizes] = useState<SizesState>({});
  // refs to each pane
  const paneRefs = useRef<HTMLDivElement[]>([]);
  // initial size and position of the current left pane. If null the user is not resizing
  const initials = useRef<InitialSizeState | null>(null);

  useEffect(() => {
    if (Children.count(children) === 1) {
      setSizes({});
    }
  }, [children])

  const handleDragStart = (index: number) => (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    initials.current = {
      index,
      position: event.clientX,
      size: paneRefs.current[index].offsetWidth
    }
  }

  const handleResize = (event: MouseEvent<HTMLDivElement>) => {
    if (!initials.current || paneRefs.current.length === 0) return;
    event.preventDefault();
    const {
      index,
      position,
      size
    } = initials.current;
    const newWidth = size + (event.clientX - position);

    setSizes((s) => ({
      ...s,
      [index]: newWidth
    }))
  }

  const handleFinishResize = (event: MouseEvent<HTMLDivElement>) => {
    initials.current = null;
  }

  const setPaneRefs = (node: HTMLDivElement | null) => {
    if (!node) return;
    paneRefs.current.push(node);
  }


  const renderPanes = () => {
    const nPanes = Children.count(children);

    return Children.map(children, (child, index) => {
      if (!isValidElement(child)) {
        return null;
      }
      // always resize the left panel
      const resizable = nPanes > 1 && index !== nPanes - 1;
      return (
        <>
          <Pane ref={setPaneRefs} width={sizes[index]}>
            {child}
          </Pane>
          {resizable && (
            <RisizeHandle
              onMouseDown={handleDragStart(index)} />
          )}
        </>
      )
    })
  }

  return (
    <Container onMouseMove={handleResize} onMouseUp={handleFinishResize}>
      {renderPanes()}
    </Container>
  )
};

export default MultiPane;