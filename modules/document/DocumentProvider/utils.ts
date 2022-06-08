import { Candidate, EntityAnnotation } from "@/server/routers/document";
import { generateAddPatch, generateRemovePatch, generateReplacePatch, Patch } from "@/utils/patches";
import { Draft } from "immer";
import { State } from "./types";


export const eachGeneratePatches = <T>(array: T[], cb: (item: T, index: number) => readonly [Patch[], Patch[]] | void): readonly [Patch[], Patch[]] => {
  let patches: Patch[] = [];
  let inversePatches: Patch[] = [];

  array.forEach((item, index) => {
    const changes = cb(item, index);
    if (changes) {
      const [p, i] = changes;
      patches.push(...p);
      inversePatches.push(...i);
    }
  })

  return [patches, inversePatches];
}



/**
 * Generate patches and inverse patches for the state when adding an annotation.
 */
export const generateAddAnnotationPatches = (state: Draft<State>, newAnnotation: EntityAnnotation): readonly [Patch[], Patch[]] => {
  let patches: Patch[] = [];
  let inversePatches: Patch[] = [];
  if (!state.data) return [patches, inversePatches];
  const { annotations } = state.data.annotation_sets.entities;

  const insIndex = annotations.findIndex((annotation) => newAnnotation.start < annotation.start);

  const [addPatches, addInversePatches] = generateAddPatch({
    basePath: '/data',
    path: `/annotation_sets/entities/annotations/${insIndex}`,
    value: newAnnotation
  })

  const [annIdPatch, annIdInversePatch] = generateReplacePatch({
    doc: state.data.annotation_sets.entities.next_annid,
    basePath: '/data',
    path: '/annotation_sets/entities/next_annid',
    value: state.data.annotation_sets.entities.next_annid + 1
  })

  patches.push(addPatches, annIdPatch);
  inversePatches.push(addInversePatches, annIdInversePatch);

  return [patches, inversePatches];
}

/**
 * Generate patches and inverse patches for the state when adding editing an annotation.
 */
export const generateEditAnnotationPatches = (
  state: Draft<State>,
  edits: {
    annotationId: number;
    type: string;
    topCandidate: Candidate;
  }): readonly [Patch[], Patch[]] => {
  let patches: Patch[] = [];
  let inversePatches: Patch[] = [];

  if (!state.data) return [patches, inversePatches];
  const { annotations } = state.data.annotation_sets.entities;

  const editIndex = annotations.findIndex((ann) => ann.id === edits.annotationId);

  const ann = annotations[editIndex];

  const editedAnnotation: EntityAnnotation = {
    ...ann,
    type: edits.type,
    features: {
      ...ann.features,
      linking: {
        ...ann.features.linking,
        top_candidate: edits.topCandidate
      }
    }
  }

  const [patch, inversePatch] = generateReplacePatch({
    doc: ann,
    basePath: '/data',
    path: `/annotation_sets/entities/annotations/${editIndex}`,
    value: editedAnnotation
  })

  patches.push(patch);
  inversePatches.push(inversePatch);

  return [patches, inversePatches];
}

/**
 * Generate patches and inverse patches for the state when deleting an annotation.
 */
export const generateDeleteAnnotationPatches = (
  state: Draft<State>,
  edits: {
    annotationId: number;
  }): readonly [Patch[], Patch[]] => {
  let patches: Patch[] = [];
  let inversePatches: Patch[] = [];

  if (!state.data) return [patches, inversePatches];
  const { annotations } = state.data.annotation_sets.entities;

  const deleteIndex = annotations.findIndex((ann) => ann.id === edits.annotationId);

  const [patch, inversePatch] = generateRemovePatch({
    doc: annotations[deleteIndex],
    basePath: '/data',
    path: `/annotation_sets/entities/annotations/${deleteIndex}`
  })

  patches.push(patch);
  inversePatches.push(inversePatch);

  return [patches, inversePatches];
}

export const generateDeleteAnnotationsPatches = (
  state: Draft<State>,
  cb: (annotation: EntityAnnotation) => boolean
): readonly [Patch[], Patch[]] => {
  let patches: Patch[] = [];
  let inversePatches: Patch[] = [];

  if (!state.data) return [patches, inversePatches];

  const { annotations } = state.data.annotation_sets.entities;

  const newAnnotations = annotations.filter(cb);

  const [patch, inversePatch] = generateReplacePatch({
    doc: annotations,
    basePath: '/data',
    path: `/annotation_sets/entities/annotations`,
    value: newAnnotations
  })

  patches.push(patch);
  inversePatches.push(inversePatch);

  return [patches, inversePatches];
}


/**
 * Add a new annotation
 */
export const addAnnotation = (annotation: EntityAnnotation[], newAnnotation: EntityAnnotation) => {
  const insIndex = annotation.findIndex((annotation) => newAnnotation.start < annotation.start);
  // annotation.splice(insIndex, 0, newAnnotation)

  return [
    ...annotation.slice(0, insIndex),
    newAnnotation,
    ...annotation.slice(insIndex, annotation.length)
  ]
}

export const editAnnotation = (
  draft: Draft<State>,
  edits: {
    annotationId: number;
    type: string;
    topCandidate: Candidate;
  }) => {
  if (!draft.data) return;
  const { annotations } = draft.data.annotation_sets.entities;

  for (let ann of annotations) {
    if (ann.id === edits.annotationId) {
      ann.type = edits.type;
      ann.features.linking.top_candidate = edits.topCandidate
    }
  }
  // draft.data.annotation_sets.entities.annotations.find((annotation) => annotation.id = edits.annotationId);
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