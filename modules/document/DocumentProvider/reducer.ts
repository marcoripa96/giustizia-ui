import { removeProp } from "@/utils/shared";
import { getPathToNode } from "../SidebarAddAnnotation/Tree";
import { State, Action } from "./types";
import { addType } from "./utils";

export function documentReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setData': {
      return {
        ...state,
        data: action.payload.data
      };
    }
    case 'changeAction': {
      return {
        ...state,
        ui: {
          action: action.payload.action
        }
      };
    }
    case 'addAnnotation': {
      return state;
    }
    case 'deleteTaxonomyType': {
      const { taxonomy } = state;
      const { key } = action.payload;
      // const path = getPathToNode(flattenedTaxonomy, key);
      return {
        ...state,
        taxonomy: removeProp(taxonomy, key)
      };
    }
    case 'addType': {
      return {
        ...state,
        // types: addType(state.types, action.payload)
      }
    }
    default: {
      throw new Error(`Unhandled action type`)
    }
  }
}