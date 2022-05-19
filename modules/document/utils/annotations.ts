import { Annotation, SelectionEvent } from "@/components/NERDocumentViewer";
import { DocumentState } from "@/lib/useQueryDocument";
import { DocumentAction } from "@/pages/documents/[id]";
import { NERAnnotation } from "@/server/routers/document";

/**
 * Delete annotation by id from previous state and returns a new state
 */
export const deleteAnnotation = (s: DocumentState | undefined, annotation: NERAnnotation) => {
  if (!s) {
    return s;
  }
  return {
    ...s,
    annotation: s.annotation.filter((ann) => ann.id !== annotation.id)
  }
}

/**
 * Add annotation to the previous state returning a new state
 */
export const addAnnotation = (s: DocumentState | undefined, event: SelectionEvent, documentAction: DocumentAction) => {
  if (!s) {
    return s;
  }

  const { startOffset, endOffset, text } = event;

  const insIndex = s.annotation.findIndex((annotation) => startOffset < annotation.start_pos);

  const newAnnotation: NERAnnotation = {
    id: s.lastIndexId + 1,
    start_pos: startOffset,
    end_pos: endOffset,
    ner_type: documentAction.payload.type,
    mention: text,
    top_url: ''
  }

  return {
    ...s,
    annotation: [
      ...s.annotation.slice(0, insIndex),
      newAnnotation,
      ...s.annotation.slice(insIndex, s.annotation.length)
    ],
    lastIndexId: s.lastIndexId + 1
  }
}


/**
 * Get the y position of the annotation card
 */
export const getAnnotationCardPosition = (docRef: HTMLDivElement, targetRef: HTMLSpanElement) => {
  const { y: yDoc, height: heightDoc } = docRef.getBoundingClientRect();
  const { y: yTarget } = targetRef.getBoundingClientRect();
  let y = yTarget - yDoc - 10;

  return y;
}
