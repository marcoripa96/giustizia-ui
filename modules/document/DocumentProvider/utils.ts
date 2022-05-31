import { NERAnnotation } from "@/server/routers/document";

/**
 * Add a new annotation
 */
export const addAnnotation = (annotation: NERAnnotation[], newAnnotation: NERAnnotation) => {
  const insIndex = annotation.findIndex((annotation) => newAnnotation.start_pos < annotation.start_pos);

  return [
    ...annotation.slice(0, insIndex),
    newAnnotation,
    ...annotation.slice(insIndex, annotation.length)
  ]
}

/**
 * Scroll to an enitity position in the document
 */
export const scrollEntityIntoView = (id: number) => {
  const element = document.getElementById(`entity-tag-${id}`);
  if (!element) return;

  const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
  window.scrollTo({ top: y, behavior: 'smooth' });
}