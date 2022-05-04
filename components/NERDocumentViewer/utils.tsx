import { NERAnnotation } from "@/server/routers/document";
import { FocusEvent, MouseEvent } from "react";
import AnnotationTag from "./AnnotationTag/AnnotationTag";
import { Annotation, AnnotationClickEvent, DocumentNode } from "./NERDocumentViewer";

export const getTextSelection = () => {
  const selection = window.getSelection();
  if (!selection || !selection.anchorNode || selection.anchorOffset === selection.focusOffset) {
    return null;
  }
  return selection;
}

export const getNode = (selection: Selection) => {
  const { anchorNode, anchorOffset, focusOffset } = selection;
  if (!anchorNode || !anchorNode.nodeValue) {
    return null;
  }

  const startOffsetNode = anchorOffset > focusOffset ? focusOffset : anchorOffset;
  const endOffsetNode = startOffsetNode === anchorOffset ? focusOffset : anchorOffset;
  return {
    anchorNode: anchorNode.nodeValue,
    startOffsetNode,
    endOffsetNode
  }
}

export const getOriginalOffset = (nodes: DocumentNode[], anchorNode: string, anchorSelectionStartOffset: number) => {
  let startOffset = 0;

  for (const node of nodes) {
    if (node === anchorNode) {
      startOffset += anchorSelectionStartOffset;
      return startOffset;
    }
    if (typeof node === 'string') {
      startOffset += node.length;
    } else {
      startOffset += node.props.children.length;
    }
  }
  return startOffset;
}

type RenderProps = {
  content: string;
  annotation: NERAnnotation[];
  onEntityClick: (event: MouseEvent<HTMLSpanElement>, annotationEvent: AnnotationClickEvent) => void;
  onEntityFocus: (event: FocusEvent<HTMLSpanElement>, annotationEvent: AnnotationClickEvent) => void;
}

export const _render = ({
  content,
  annotation,
  onEntityClick,
  onEntityFocus
}: RenderProps) => {
  let contentToRender: DocumentNode[] = [];
  let lastPosition = 0;

  annotation.forEach((ann, index) => {
    const { id, start_pos, end_pos } = ann;
    // node of type text
    const nodeText = content.slice(lastPosition, start_pos);
    const entity = content.slice(start_pos, end_pos);
    // node of type entity
    const nodeEntity = (
      <AnnotationTag
        id={`entity-node-${id}`}
        key={id}
        annotation={ann}
        onFocus={(event) => onEntityFocus(event, { annotation: ann })}
        onClick={(event) => onEntityClick(event, { annotation: ann })}>
        {entity}
      </AnnotationTag>
    )
    contentToRender.push(nodeText);
    contentToRender.push(nodeEntity)

    lastPosition = end_pos;
  });
  const residualText = content.slice(lastPosition, content.length);
  contentToRender.push(residualText);

  return contentToRender;
}