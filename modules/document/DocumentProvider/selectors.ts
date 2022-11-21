import { Cluster } from '@/server/routers/document';
import { beautifyString, groupBy, isEmptyObject } from '@/utils/shared';
import { useContext, useMemo } from 'react';
import { createSelector } from 'reselect';
import {
  buildTreeFromFlattenedObject,
  FlatTreeNode,
  FlatTreeObj,
  getAllNodeData,
} from '../../../components/Tree';
import SelectAnnotationSet from '../Toolsbar/SelectAnnotationSet';
import {
  DocumentStateContext,
  DocumentDispatchContext,
} from './DocumentContext';
import { ProcessedCluster, State } from './types';
import { getAnnotationTypes, getCandidateId, getEntityIndex } from './utils';

/**
 * Access the document state within the DocumentProvider.
 */
export const useDocumentState = () => {
  const context = useContext(DocumentStateContext);

  if (context === undefined) {
    throw new Error('useDocumentState must be used within a DocumentProvider');
  }

  return context;
};

/**
 * Access the document disptach within the DocumentProvider.
 */
export const useDocumentDispatch = () => {
  const context = useContext(DocumentDispatchContext);

  if (context === undefined) {
    throw new Error(
      'useDocumentDispatch must be used within a DocumentProvider'
    );
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
export const selectDocumentId = (state: State) => state.data.id;
export const selectDocumentData = (state: State) => state.data;
export const selectDocumentText = (state: State) => state.data.text;
export const selectDocumentAnnotationSets = (state: State) =>
  state.data.annotation_sets;
export const selectDocumentSectionAnnotations = (state: State) =>
  state.data.annotation_sets.Sections?.annotations;
export const selectDocumentTaxonomy = (state: State) => state.taxonomy;
export const selectDocumentAction = (state: State) => state.ui.action;
export const selectDocumentActiveType = (state: State) => state.ui.action.data;
export const selectDocumentCurrentEntity = (state: State) =>
  state.ui.selectedEntity;
export const selectDocumentLeftSidebarOpen = (state: State) =>
  state.ui.leftActionBarOpen;
export const selectNewAnnotationModalOpen = (state: State) =>
  state.ui.newAnnotationModalOpen;
export const selectViews = (state: State) => state.ui.views;
export const selectHighlightAnnotationId = (state: State) =>
  state.ui.highlightAnnotation.entityId;

// selector which receives an input
const selectViewIndex = (state: State, viewIndex: number) => viewIndex;

export const selectDocumentTagTypeFilter = createSelector(
  [selectViews, selectViewIndex],
  (views, viewIndex) => views[viewIndex].typeFilter
);

export const selectDocumentActiveAnnotationSet = createSelector(
  [selectViews, selectViewIndex],
  (views, viewIndex) => views[viewIndex].activeAnnotationSet
);

export const selectActiveEntityAnnotations = createSelector(
  selectDocumentActiveAnnotationSet,
  selectDocumentAnnotationSets,
  (activeAnnotationSet, annotationSets) => {
    if (annotationSets[activeAnnotationSet]) {
      return annotationSets[activeAnnotationSet].annotations;
    }
    return [];
  }
);

export const selectAllEntityAnnotationSets = createSelector(
  selectDocumentAnnotationSets,
  (annotationSets) =>
    Object.values(annotationSets).filter((set) =>
      set.name.startsWith('entities')
    )
);

// For expensive selectors memoize them with createSelector (e.g. array operations)
export const selectTaxonomyTree = createSelector(
  selectDocumentTaxonomy,
  (taxonomy) => buildTreeFromFlattenedObject(taxonomy)
);
export const selectCurrentEntity = createSelector(
  selectViews,
  selectDocumentAnnotationSets,
  selectDocumentCurrentEntity,
  (views, annotationSets, currentEntity) => {
    if (currentEntity == null) {
      return undefined;
    }
    const { viewIndex, entityIndex } = currentEntity;
    const { activeAnnotationSet } = views[viewIndex];
    const { annotations } = annotationSets[activeAnnotationSet];
    return annotations[entityIndex];
  }
);

export const selectDocumentClusters = createSelector(
  selectDocumentData,
  selectViews,
  // current annotation set
  (doc, views) => {
    if (views.length > 1) {
      return null;
    }

    const { activeAnnotationSet } = views[0];

    const { text, annotation_sets, features } = doc;

    const annSet = annotation_sets[activeAnnotationSet];

    const annSetClusters = features.clusters[activeAnnotationSet];

    if (!annSetClusters) {
      return null;
    }

    const clusters = annSetClusters.map((cluster) => {

      const mentions = cluster.mentions.map((mention) => {
        const ann = annSet.annotations.find((ann) => ann.id === mention.id);

        if (!ann) {
          return mention;
        }

        const startOffset = ann.start - 10 < 0 ? 0 : ann.start - 10;
        const endOffset = ann.end + 50 > text.length ? text.length : ann.end + 50;

        return {
          ...mention,
          mentionText: `...${text.slice(startOffset, endOffset)}...`,
        };
      })

      return {
        ...cluster,
        mentions: mentions.filter((m) => (m as any).mentionText),
      } as ProcessedCluster;
    });

    const clusterGroups = groupBy(
      clusters,
      (cluster) => cluster.type
    );

    return clusterGroups;
  }
);

/**
 * Select linking features for the current entity
 */
export const selectAnnotationFeatures = createSelector(
  selectCurrentEntity,
  (annotation) => {
    if (!annotation) {
      return undefined;
    }
    return annotation.features;
    // const { candidates, top_candidate, ...rest } =
    //   annotation.features.linking || {};

    // if (!candidates) {
    //   return undefined;
    // }
    // // order candidates
    // const orderedCandidates = candidates.sort((a, b) => {
    //   if (getCandidateId(a) === getCandidateId(top_candidate)) {
    //     return -1;
    //   }
    //   if (getCandidateId(b) === getCandidateId(top_candidate)) {
    //     return 1;
    //   }
    //   return b.score - a.score;
    // });
    // return {
    //   candidates: orderedCandidates,
    //   top_candidate,
    //   ...rest,
    // };
  }
);

/**
 * Get entities filtered by the current type filter
 */
export const selectFilteredEntityAnnotations = createSelector(
  selectActiveEntityAnnotations,
  selectDocumentTagTypeFilter,
  (annotations, typeFilter) => {
    return annotations.filter((ann) => {
      return typeFilter.indexOf(ann.type) !== -1;
    });
  }
);

/**
 * Get add selection color based on the taxonomy type selected
 */
export const selectAddSelectionColor = createSelector(
  selectDocumentTaxonomy,
  selectDocumentAction,
  (taxonomy, action) => {
    if (!action.data) {
      return '';
    }
    try {
      return getAllNodeData(taxonomy, action.data).color;
    } catch (err) {
      // trying to access a node that doesn't exist
      return '';
    }
  }
);

export const selectSectionsSidebar = createSelector(
  selectDocumentSectionAnnotations,
  (sectionAnnotations) => {
    if (!sectionAnnotations) {
      return [];
    }
    return sectionAnnotations.map((section) => ({
      id: section.type,
      label: beautifyString(section.type),
    }));
  }
);
