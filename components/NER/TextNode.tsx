import { TextNode } from "@/lib/ner/core/types";
import styled from "@emotion/styled";
import { MouseEvent } from "react";
import { useNERContext } from "./nerContext";

type TextNodeProps = TextNode;

export type SelectionNode = {
  text: string;
  start: number;
  end: number;
}

/**
 * Get the text selection
 */
const getTextSelection = () => {
  const selection = window.getSelection();
  if (!selection || !selection.anchorNode || selection.anchorOffset === selection.focusOffset) {
    return null;
  }
  return selection;
}

/**
 * Get startOffset
 */
const getNodeSelectionOffset = (selection: Selection) => {
  const { anchorNode, anchorOffset, focusOffset } = selection;
  if (!anchorNode || !anchorNode.nodeValue) {
    return null;
  }

  const startOffsetNode = anchorOffset > focusOffset ? focusOffset : anchorOffset;
  const endOffsetNode = startOffsetNode === anchorOffset ? focusOffset : anchorOffset;
  return {
    startOffsetNode,
    endOffsetNode
  }
}

const getOriginalOffset = ({
  start,
  end,
  startOffsetNode,
  endOffsetNode
}: {
  start: number;
  end: number;
  startOffsetNode: number;
  endOffsetNode: number
}) => {
  const originalStart = start + startOffsetNode;
  const originalEnd = originalStart + (endOffsetNode - startOffsetNode);

  return {
    start: originalStart,
    end: originalEnd
  }
}


type SpanProps = {
  isAddMode: boolean;
  selectionColor: string | undefined;
}

const Span = styled.span<SpanProps>(({ isAddMode, selectionColor }) => ({
  ...(isAddMode && {
    '::selection': {
      background: selectionColor
    }
  })
}));

const TextNode = (props: TextNodeProps) => {
  const { isAddMode, addSelectionColor, onTextSelection } = useNERContext();

  const { text, start, end } = props;

  const handleMouseUp = (event: MouseEvent) => {
    if (!onTextSelection) return;

    // get user text selection
    const selection = getTextSelection();
    if (!selection) {
      return;
    }



    // // get offset of what it is selected inside the node where the selection happens
    // const nodeSelectionOffset = getNodeSelectionOffset(selection);
    // if (!nodeSelectionOffset) {
    //   return;
    // }

    // // get the offset to the original text
    // const offset = getOriginalOffset({ start, end, ...nodeSelectionOffset })
    // if (!offset) {
    //   return;
    // }

    // const text = selection.toString();
    // const selectionNode = { text, ...offset };
    onTextSelection(event, selection)
  }

  return (
    <Span
      isAddMode={!!isAddMode}
      selectionColor={addSelectionColor}
      onMouseUp={handleMouseUp}>
      {text}
    </Span>
  )
}



export default TextNode;