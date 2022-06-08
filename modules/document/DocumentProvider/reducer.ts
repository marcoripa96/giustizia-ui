import { createImmerReducer } from "@/utils/immerReducer";
import { generateAddPatch } from "@/utils/patches";
import { removeProps } from "@/utils/shared";

import { FlatTreeNode, getNodeAndChildren } from "../SidebarAddAnnotation/Tree";
import { State, Action } from "./types";
import { addAnnotation, eachGeneratePatches, generateAddAnnotationPatches, generateDeleteAnnotationPatches, generateDeleteAnnotationsPatches, generateEditAnnotationPatches } from "./utils";


export const documentReducer = createImmerReducer<State, Action>({
  setData: (state, payload) => {
    state.data = payload.data;
  },
  changeAction: (state, payload) => {
    state.ui.action = payload.action;
  },
  setCurrentEntityId: (state, payload) => {
    state.ui.selectedEntityId = payload.annotationId;
  },
  addAnnotation: (state, payload) => {
    if (!state.data) return;
    const { type, startOffset, endOffset, text } = payload;
    const {
      next_annid,
    } = state.data.annotation_sets.entities;

    const newAnnotation: any = {
      id: next_annid,
      start: startOffset,
      end: endOffset,
      type: type,
      features: {
        mention: text,
        ner: {},
        linking: {}
      }
    }
    return generateAddAnnotationPatches(state, newAnnotation);
  },
  editAnnotation: (state, payload) => {
    if (!state.data) return;

    return generateEditAnnotationPatches(state, payload);
  },
  deleteAnnotation: (state, payload) => {
    if (!state.data) return;
    return generateDeleteAnnotationPatches(state, payload);
  },
  addTaxonomyType: (state, payload) => {
    const { type } = payload;
    const { taxonomy } = state;
    const { key, label, parent, ...rest } = type;

    const newType = {
      key,
      label,
      ...(!parent && { ...rest }),
      recognizable: false,
      parent: parent || null
    } as FlatTreeNode

    state.taxonomy[key] = newType;
  },
  deleteTaxonomyType: (state, payload) => {
    if (!state.data) return;
    const { taxonomy } = state;
    const { key } = payload;

    const types = getNodeAndChildren(taxonomy, key, (node) => node.key);

    // state.ui.selectedEntityId = null;
    state.taxonomy = removeProps(taxonomy, types);

    return generateDeleteAnnotationsPatches(state, (ann) => types.indexOf(ann.type) === -1);

    // console.log(t);

    // return stateTransition(state, (draft) => {
    //   if (!draft.data) return;
    //   draft.data.annotation_sets.entities.annotations = annotations.filter((ann) => types.indexOf(ann.type) === -1);
    // }, (draft) => {
    //   draft.ui.selectedEntityId = null;
    //   draft.taxonomy = removeProps(taxonomy, types)
    // })
  },
  setUI: (state, payload) => {
    state.ui = {
      ...state.ui,
      ...payload
    }
  }
})
