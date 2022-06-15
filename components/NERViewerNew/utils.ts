import { NERNode } from "@/hooks/use-ner";
import { SectionNode } from "@/hooks/use-ner-new";
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
  sectionId,
  nodeId,
  startOffsetNode,
  endOffsetNode
}: {
  nodes: SectionNode<AdditionalAnnotationProps>[];
  sectionId: number;
  nodeId: number;
  startOffsetNode: number;
  endOffsetNode: number;
}) => {
  const sectionsToKey = nodes.slice(0, sectionId + 1);

  const startOffset = sectionsToKey.reduce((accSections, section, index) => {
    if (!section.nodes) {
      return accSections;
    }
    const sectionNodes = index === sectionId
      ? section.nodes.slice(0, nodeId)
      : section.nodes

    return sectionNodes.reduce((accNodes, node) => {
      return accNodes + node.text.length;
    }, accSections);
  }, 0) + startOffsetNode + sectionId;

  const endOffset = startOffset + (endOffsetNode - startOffsetNode);
  return {
    startOffset,
    endOffset
  }
}