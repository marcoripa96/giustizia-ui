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
    case 'addType': {
      return {
        ...state,
        // types: addType(state.types, action.payload)
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}