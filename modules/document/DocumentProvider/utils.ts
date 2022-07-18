import { AnnotationSet, Candidate, EntityAnnotation } from "@/server/routers/document";
import { deepEqual } from "@/utils/shared";
import { Draft } from "immer";
import { ChildNode, flattenTree, FlatTreeNode, getNode } from "../SidebarAddAnnotation/Tree";
import { Action, FlattenedTaxonomy, State, Taxonomy } from "./types";

/**
 * Add a new annotation
 */
export const addAnnotation = (annotation: EntityAnnotation[], newAnnotation: EntityAnnotation) => {
  if (annotation.length === 0) {
    return [newAnnotation]
  }
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

export const getAnnotationTypes = (taxonomy: FlattenedTaxonomy, annotations: EntityAnnotation[]) => {

  let map = {} as Record<string, {
    key: string;
    label: string;
    n: number;
  }>;

  for (const ann of annotations) {
    const node = getNode(taxonomy, ann.type);

    if (!map[node.key]) {
      map[node.key] = {
        key: node.key,
        label: node.label,
        n: 1
      };
    } else {
      map[node.key] = {
        ...map[node.key],
        n: map[node.key].n + 1
      };
    }
  }

  return Object.values(map).sort((a, b) => b.n - a.n);
}

export const getTypeFilter = (annotations: EntityAnnotation[]) => {
  let typeFilter = new Set<string>();
  annotations.forEach((ann) => {
    typeFilter.add(ann.type);
  })
  return Array.from(typeFilter);
}

export const getEntityIndex = (id: string) => {
  const [viewIndex, index] = id.split('/');
  return [parseInt(viewIndex), parseInt(index)] as const;
}

export const createTaxonomy = (taxonomy: Taxonomy, annotationSets: AnnotationSet<EntityAnnotation>[]) => {
  const flatTaxonomy = flattenTree(taxonomy);
  const unknownNodes: Record<string, FlatTreeNode> = {};

  annotationSets.forEach((annSet) => {
    annSet.annotations.forEach((ann) => {
      if (!unknownNodes[ann.type] && !flatTaxonomy[ann.type]) {
        const node: ChildNode = {
          key: ann.type,
          label: `${ann.type[0].toUpperCase()}${ann.type.slice(1).toLowerCase()}`,
          parent: 'UNK',
          recognizable: false
        }
        unknownNodes[ann.type] = node;
      }
    })
  })

  return {
    ...flatTaxonomy,
    ...unknownNodes
  }
};
