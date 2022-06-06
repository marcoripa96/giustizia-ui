import { useContext, useMemo } from "react";
import { createSelector } from "reselect";
import { buildTreeFromFlattenedObject } from "../SidebarAddAnnotation/Tree";
import { DocumentStateContext, DocumentDispatchContext } from "./DocumentContext";
import { State } from "./types";

/**
 * Access the document state within the DocumentProvider.
 */
export const useDocumentState = () => {
  const context = useContext(DocumentStateContext);

  if (context === undefined) {
    throw new Error('useDocumentState must be used within a DocumentProvider')
  }

  return context;
};

/**
 * Access the document disptach within the DocumentProvider.
 */
export const useDocumentDispatch = () => {
  const context = useContext(DocumentDispatchContext);

  if (context === undefined) {
    throw new Error('useDocumentDispatch must be used within a DocumentProvider')
  }

  return context;
};

/**
 * An hook to select the state partially
 */
export function useSelector<T>(cb: (state: State) => T) {
  const _state = useDocumentState();
  return cb(_state);
}

// input selectors just select part of the state
export const selectDocumentData = (state: State) => state.data;
export const selectDocumentText = (state: State) => state.data?.text;
export const selectDocumentAnnotation = (state: State) => state.data?.annotation_sets.entities.annotations;
export const selectDocumentTaxonomy = (state: State) => state.taxonomy;
export const selectDocumentAction = (state: State) => state.ui.action;
export const selectDocumentActiveType = (state: State) => state.ui.action.data;
export const selectDocumentCurrentEntityId = (state: State) => state.ui.selectedEntityId;
export const selectDocumentCallbacks = (state: State) => state.callbacks;

// For expensive selectors memoize them with createSelector (e.g. array operations)
export const selectTaxonomyTree = createSelector(selectDocumentTaxonomy, (taxonomy) => buildTreeFromFlattenedObject(taxonomy));
export const selectCurrentEntity = createSelector(
  selectDocumentAnnotation,
  selectDocumentCurrentEntityId,
  (annotation, entityId) => {
    if (!annotation || entityId == null) {
      return undefined;
    }
    return annotation.find((ann) => ann.id === entityId);
  }
);