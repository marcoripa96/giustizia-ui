import { NERNode } from "@/hooks/use-ner";
import { AdditionalAnnotationProps } from "@/server/routers/document";

/**
 * Get the text selection
 */
export const getTextSelection = () => {
  const selection = window.getSelection();
  if (!selection || !selection.anchorNode || selection.anchorOffset === selection.focusOffset) {
    return null;
  }
  return selection;
}

/**
 * Get startOffset
 */
export const getNodeSelectionOffset = (selection: Selection) => {
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

export const getOriginalOffset = ({
  nodes,
  nodeKey,
  startOffsetNode,
  endOffsetNode
}: {
  nodes: NERNode<AdditionalAnnotationProps>[];
  nodeKey: number;
  startOffsetNode: number;
  endOffsetNode: number;
}) => {
  const arrayToKey = nodes.slice(0, nodeKey);
  const startOffset = arrayToKey.reduce((acc, node, index) => acc + node.text.length, 0) + startOffsetNode;
  const endOffset = startOffset + (endOffsetNode - startOffsetNode);
  return {
    startOffset,
    endOffset
  }
}