import { FlatTreeNode, FlatTreeObj } from "@/components/TreeSpecialization";
import { createImmerReducer } from "@/utils/immerReducer";

export type State = {
  taxonomy: FlatTreeObj;
}

export type Dispatch = (action: Action) => void;

type Action =
  | { type: 'setTaxonomy', payload: FlatTreeObj }
  | { type: 'addType', payload: FlatTreeNode }
  | { type: 'editType', payload: { oldKey: string; new: FlatTreeNode; } }
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
    const { [payload.oldKey]: _, ...taxonomy } = state.taxonomy;
    state.taxonomy = {
      ...taxonomy,
      [payload.new.key]: payload.new
    }
  }
}) 