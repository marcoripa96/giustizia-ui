import { createImmerReducer } from "@/utils/immerReducer";
import { removeProps } from "@/utils/shared";
import { FlatTreeNode, getNodeAndChildren } from "../SidebarAddAnnotation/Tree";
import { State, Action } from "./types";
import { addAnnotation } from "./utils";

export const documentReducer = createImmerReducer<State, Action>({
  setData: (state, payload) => {
    state.data = payload.data;
  },
  changeAction: (state, payload) => {
    state.ui.action = payload.action
  },
  setCurrentEntityId: (state, payload) => {
    state.ui.selectedEntityId = payload.annotationId;
  },
  addAnnotation: (state, payload) => {
    if (!state.data) return;
    const { type, startOffset, endOffset, text } = payload;
    const {
      next_annid,
      annotations
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
    state.data.annotation_sets.entities.annotations = addAnnotation(annotations, newAnnotation);
    state.data.annotation_sets.entities.next_annid = next_annid + 1;
  },
  editAnnotation: (state, payload) => {
    if (!state.data) return;
    const { annotationId, type, topCandidate } = payload;
    const { annotations } = state.data.annotation_sets.entities;
    const newAnnotations = annotations.map((ann) => {
      if (ann.id === annotationId) {
        return {
          ...ann,
          type,
          features: {
            ...ann.features,
            linking: {
              ...ann.features.linking,
              top_candidate: topCandidate
            }
          }
        }
      }
      return ann;
    });
    state.data.annotation_sets.entities.annotations = newAnnotations;
  },
  deleteAnnotation: (state, payload) => {
    if (!state.data) {
      return state;
    }
    const { id } = payload;
    const { annotations } = state.data.annotation_sets.entities;
    const newAnnotations = annotations.filter((ann) => ann.id !== id);
    state.data.annotation_sets.entities.annotations = newAnnotations;
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
    if (!state.data) {
      return state;
    }
    const { taxonomy } = state;
    const { annotations } = state.data.annotation_sets.entities;
    const { key } = payload;

    const types = getNodeAndChildren(taxonomy, key, (node) => node.key);
    state.data.annotation_sets.entities.annotations = annotations.filter((ann) => types.indexOf(ann.type) === -1);
    state.ui.selectedEntityId = null;
    state.taxonomy = removeProps(taxonomy, types)
  },
  setUI: (state, payload) => {
    state.ui = {
      ...state.ui,
      ...payload
    }
  }
})
