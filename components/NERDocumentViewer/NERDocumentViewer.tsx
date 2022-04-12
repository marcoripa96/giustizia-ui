import { FC, useMemo } from "react";
import styled from "styled-components";
import AnnotationTag from "./AnnotationTag/AnnotationTag";
import { getNode, getOriginalOffset, getTextSelection, _render } from "./utils";

/**
 * Data required
 */
type NERDocumentViewerProps = {
  content: string;
  annotations: Annotation[];
  onSelection?: (event: SelectionEvent) => void;
  onEntityClick?: (event: AnnotationClickEvent) => void;
}

export type SelectionEvent = { startOffset: number, endOffset: number };
export type AnnotationClickEvent = { annotation: Annotation };

export type Annotation = {
  id: number;
  start_pos_original: number;
  end_pos_original: number;
  ner_type: keyof typeof annotationTypes;
  top_url: string;
}

export type DocumentNode = string | JSX.Element;

export const annotationTypes = {
  PER: {
    label: 'Person',
    color: 'rgb(254, 202, 116)'
  },
  MISC: {
    label: 'Miscellaneous',
    color: 'rgb(97, 232, 225)'
  },
  DATE: {
    label: 'Date',
    color: 'rgb(170, 156, 252)'
  },
  LOC: {
    label: 'Location',
    color: 'rgb(191, 225, 217)'
  },
  ORG: {
    label: 'Organization',
    color: 'rgb(234, 193, 204)'
  }
}

const DocumentContent = styled.p`
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.7;
`


const NERDocumentViewer: FC<NERDocumentViewerProps> = ({
  content, annotations,
  onSelection: onSelectionProp,
  onEntityClick: onEntityClickProp
}) => {
  /**
   * On text selection
   */
  const onSelection = () => {
    if (!onSelectionProp) {
      return;
    }
    // get user text selection
    const selection = getTextSelection();
    if (!selection) {
      return;
    }
    const node = getNode(selection);
    if (!node) {
      return;
    }

    const { anchorNode, startOffsetNode, endOffsetNode } = node;

    const startOffset = getOriginalOffset(nodes, anchorNode, startOffsetNode);
    const endOffset = startOffset + (endOffsetNode - startOffsetNode);
    onSelectionProp({ startOffset, endOffset });
  }

  /**
   * 
   */
  const onEntityClick = (event: AnnotationClickEvent) => {
    if (!onEntityClickProp) {
      return;
    }
    onEntityClickProp(event);
  }

  // build nodes to render
  const nodes = useMemo(() => {
    return _render({ content, annotations, onEntityClick });
  }, [content, annotations, onEntityClickProp]);

  return (
    <DocumentContent onMouseUp={onSelection}>
      {nodes}
    </DocumentContent>
  )
};

export default NERDocumentViewer;