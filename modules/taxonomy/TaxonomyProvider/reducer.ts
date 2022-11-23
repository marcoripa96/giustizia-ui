import { FlatTreeNode, FlatTreeObj } from "@/components/TreeSpecialization";
import { createImmerReducer } from "@/utils/immerReducer";
import { original } from "immer";

export type State = {
  taxonomy: FlatTreeObj;
}

export type Dispatch = (action: Action) => void;

type Action =
  | { type: 'setTaxonomy', payload: FlatTreeObj }
  | { type: 'addType', payload: FlatTreeNode }
  | {
    type: 'editType', payload: {
      oldKey: string;
      newNode: { label: string; key: string; terms: string[]; }
    }
  }
  | {
    type: 'deleteType', payload: {
      key: string;
    }
  }
// add type
// edit type
// delete type

export const taxonomyReducer = createImmerReducer<State, Action>({
  setTaxonomy: (state, payload) => {
    state.taxonomy = payload;
  },
  addType: (state, payload) => {
    state.taxonomy = {
      ...state.taxonomy,
      [payload.key]: payload
    }
  },
  editType: (state, payload) => {
    const { [payload.oldKey]: oldNode, ...taxonomy } = state.taxonomy;

    const newTaxonomy = Object.keys(state.taxonomy).reduce((acc, key) => {
      if (key === oldNode.key) {
        acc[payload.newNode.key] = {
          ...oldNode,
          ...payload.newNode
        }
      } else {
        acc[key] = state.taxonomy[key];
      }

      return acc;
    }, {} as FlatTreeObj);

    state.taxonomy = newTaxonomy;
  },
  deleteType: (state, payload) => {
    const { [payload.key]: _, ...taxonomy } = state.taxonomy;

    state.taxonomy = taxonomy;
  }
}) 