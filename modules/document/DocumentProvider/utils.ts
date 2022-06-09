import { Candidate, EntityAnnotation } from "@/server/routers/document";
import { deepEqual } from "@/utils/shared";
import { Draft } from "immer";
import { Action, State } from "./types";

/**
 * Add a new annotation
 */
export const addAnnotation = (annotation: EntityAnnotation[], newAnnotation: EntityAnnotation) => {
  const insIndex = annotation.findIndex((annotation) => newAnnotation.start < annotation.start);

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

/**
 * Compose unique id given a candidate id and indexer
 */
export const getCandidateId = (candidate: Candidate | undefined) => {
  if (!candidate) {
    return ''
  }
  return `${candidate.indexer}/${candidate.id}`;
};

export const toggleLeftSidebar = (state: Draft<State>, payload: (Action & { type: 'changeAction' })['payload']) => {
  if (state.ui.action.value === payload.action) {
    state.ui.leftActionBarOpen = !state.ui.leftActionBarOpen;
  } else {
    state.ui.leftActionBarOpen = true;
  }
}

export const isSameAction = (oldAction: State['ui']['action'], newAction: State['ui']['action']) => deepEqual(oldAction, newAction);