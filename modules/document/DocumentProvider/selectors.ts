import { beautifyString, isEmptyObject } from "@/utils/shared";
import { useContext, useMemo } from "react";
import { createSelector } from "reselect";
import { buildTreeFromFlattenedObject, getAllNodeData } from "../SidebarAddAnnotation/Tree";
import { DocumentStateContext, DocumentDispatchContext } from "./DocumentContext";
import { State } from "./types";
import { getAnnotationTypes, getCandidateId } from "./utils";

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
export const selectDocumentText = (state: State) => state.data.text;
export const selectDocumentAnnotationSets = (state: State) => state.data.annotation_sets;
// export const selectDocumentEntityAnnotations = (state: State) => state.data.annotation_sets.entities.annotations;
export const selectDocumentSectionAnnotations = (state: State) => state.data.annotation_sets.Sections?.annotations;
export const selectDocumentTaxonomy = (state: State) => state.taxonomy;
export const selectDocumentAction = (state: State) => state.ui.action;
export const selectDocumentActiveType = (state: State) => state.ui.action.data;
export const selectDocumentCurrentEntityId = (state: State) => state.ui.selectedEntityId;
export const selectDocumentLeftSidebarOpen = (state: State) => state.ui.leftActionBarOpen;
// export const selectDocumentTagTypeFilter = (state: State) => state.ui.typeFilter;
// export const selectDocumentActiveAnnotationSet = (state: State) => state.ui.activeAnnotationSet;
// export const selectDocumentActiveSection = (state: State) => state.ui.activeSection;
export const selectViews = (state: State) => state.ui.views;

// selector which receives an input
const selectViewIndex = (state: State, viewIndex: number) => viewIndex;

export const selectDocumentTagTypeFilter = createSelector(
  [
    selectViews,
    selectViewIndex
  ],
  (views, viewIndex) => views[viewIndex].typeFilter
);

export const selectDocumentActiveAnnotationSet = createSelector(
  [
    selectViews,
    selectViewIndex
  ],
  (views, viewIndex) => views[viewIndex].activeAnnotationSet
);

export const selectActiveEntityAnnotations = createSelector(
  selectDocumentActiveAnnotationSet,
  selectDocumentAnnotationSets,
  (activeAnnotationSet, annotationSets) => {
    if (annotationSets[activeAnnotationSet]) {
      return annotationSets[activeAnnotationSet].annotations
    }
    return [];
  }
);

export const selectAllEntityAnnotationSets = createSelector(
  selectDocumentAnnotationSets,
  (annotationSets) => Object.values(annotationSets).filter((set) => set.name.startsWith('entities'))
)

// For expensive selectors memoize them with createSelector (e.g. array operations)
export const selectTaxonomyTree = createSelector(selectDocumentTaxonomy, (taxonomy) => buildTreeFromFlattenedObject(taxonomy));
export const selectCurrentEntity = createSelector(
  selectActiveEntityAnnotations,
  selectDocumentCurrentEntityId,
  (annotation, entityId) => {
    if (entityId == null) {
      return undefined;
    }
    return annotation.find((ann) => ann.id === entityId);
  }
);

/**
 * Select linking features for the current entity
 */
export const selectCurrentEntityLinkingFeatures = createSelector(
  selectCurrentEntity,
  (annotation) => {
    if (!annotation) {
      return undefined;
    }
    const { candidates, top_candidate, ...rest } = annotation.features.linking;

    if (!candidates) {
      return undefined
    }
    // order candidates
    const orderedCandidates = candidates.sort((a, b) => {
      if (getCandidateId(a) === getCandidateId(top_candidate)) {
        return -1;
      }
      if (getCandidateId(b) === getCandidateId(top_candidate)) {
        return 1;
      }
      return b.score - a.score;
    })
    return {
      candidates: orderedCandidates,
      top_candidate,
      ...rest
    }
  }
)

/**
 * Get entities filtered by the current type filter
 */
export const selectFilteredEntityAnnotations = createSelector(
  selectActiveEntityAnnotations,
  selectDocumentTagTypeFilter,
  (annotations, typeFilter) => {
    return annotations.filter((ann) => {
      return typeFilter.indexOf(ann.type) !== -1;
    })
  }
)

/**
 * Get add selection color based on the taxonomy type selected
 */
export const selectAddSelectionColor = createSelector(
  selectDocumentTaxonomy,
  selectDocumentAction,
  (taxonomy, action) => {
    if (!action.data) {
      return ''
    }
    try {
      return getAllNodeData(taxonomy, action.data).color
    } catch (err) {
      // trying to access a node that doesn't exist
      return ''
    }
  }
)

export const selectSectionsSidebar = createSelector(
  selectDocumentSectionAnnotations,
  (sectionAnnotations) => {
    if (!sectionAnnotations) {
      return [];
    }
    return sectionAnnotations.map((section) => ({
      id: section.type,
      label: beautifyString(section.type)
    }));
  }
)