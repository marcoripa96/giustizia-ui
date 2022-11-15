import { FlatTreeObj } from "@/components/TreeSpecialization";
import { createImmerReducer } from "@/utils/immerReducer";

export type State = {
  taxonomy: FlatTreeObj;
}

export type Dispatch = (action: Action) => void;

type Action =
  | { type: 'setTaxonomy', payload: { data: FlatTreeObj } }
// add type
// edit type
// delete type

export const taxonomyReducer = createImmerReducer<State, Action>({
  setTaxonomy: (state, payload) => {
    state.taxonomy = payload.data;
  }
}) 