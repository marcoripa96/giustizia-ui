import { FC, FocusEvent, MouseEvent, useMemo } from "react";
import styled from '@emotion/styled';
import { getNode, getOriginalOffset, getTextSelection, _render } from "./utils";
import { NERAnnotation } from "@/server/routers/document";

/**
 * Data required
 */
type NERDocumentViewerProps = {
  content: string;
  annotation: NERAnnotation[];
  onSelection?: (event: SelectionEvent) => void;
  onEntityClick?: (event: MouseEvent<HTMLSpanElement>, annotationEvent: AnnotationClickEvent) => void;
  onEntityFocus?: (event: FocusEvent<HTMLSpanElement>, annotationEvent: AnnotationClickEvent) => void;
}

export type SelectionEvent = { startOffset: number, endOffset: number, text: string };
export type AnnotationClickEvent = { annotation: NERAnnotation };

export type Annotation = {
  id: number;
  start_pos_original: number;
  end_pos_original: number;
  ner_type: keyof typeof annotationTypes;
  top_url: string;
  top_wikipedia_id?: string;
  top_title?: string;
  mention?: string;
  candidates?: Candidate[];
}

type Candidate = {
  id: string;
  score: number;
  title: string;
  url: string;
  wikipedia_id: string;
}

export type DocumentNode = string | JSX.Element;

export const annotationTypes: Record<string, { label: string, color: string }> = {
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
  content, annotation,
  onSelection: onSelectionProp,
  onEntityClick: onEntityClickProp,
  onEntityFocus: onEntityFocusProp
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
    const text = selection.toString()
    onSelectionProp({ startOffset, endOffset, text });
  }

  /**
   * 
   */
  const onEntityClick = (event: MouseEvent<HTMLSpanElement>, annotationEvent: AnnotationClickEvent) => {
    if (!onEntityClickProp) {
      return;
    }
    onEntityClickProp(event, annotationEvent);
  }

  const onEntityFocus = (event: FocusEvent<HTMLSpanElement>, annotationEvent: AnnotationClickEvent) => {
    if (!onEntityFocusProp) {
      return;
    }
    onEntityFocusProp(event, annotationEvent);
  }

  // build nodes to render
  const nodes = useMemo(() => {
    return _render({ content, annotation, onEntityClick, onEntityFocus });
  }, [content, annotation, onEntityClickProp, onEntityFocusProp]);

  return (
    <DocumentContent onMouseUp={onSelection}>
      {nodes}
    </DocumentContent>
  )
};

export default NERDocumentViewer;