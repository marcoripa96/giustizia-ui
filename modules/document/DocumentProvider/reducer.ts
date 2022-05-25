import { NERAnnotation } from "@/server/routers/document";
import { removeProp } from "@/utils/shared";
import { FlatTreeNode, getAllNodeData } from "../SidebarAddAnnotation/Tree";
import { State, Action } from "./types";
import { addAnnotation } from "./utils";

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
      if (!state.data) {
        return state;
      }
      const { type, startOffset, endOffset, text } = action.payload;
      const { annotation } = state.data;

      const newLastIndexId = state.data.lastIndexId + 1

      const newAnnotation: NERAnnotation = {
        id: newLastIndexId,
        start_pos: startOffset,
        end_pos: endOffset,
        ner_type: type,
        mention: text,
        top_url: ''
      }

      return {
        ...state,
        data: {
          ...state.data,
          annotation: addAnnotation(annotation, newAnnotation),
          lastIndexId: newLastIndexId
        }
      };
    }
    case 'deleteAnnotation': {
      if (!state.data) {
        return state;
      }
      const { id } = action.payload;
      const { annotation } = state.data;
      const newAnnotation = annotation.filter((ann) => ann.id !== id);
      return {
        ...state,
        data: {
          ...state.data,
          annotation: newAnnotation
        }
      };
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
    case 'addTaxonomyType': {
      const { type } = action.payload;
      const { taxonomy } = state;
      const { key, label, parent, ...rest } = type;

      const newType = {
        key,
        label,
        ...(!parent && { ...rest }),
        parent: parent || null
      } as FlatTreeNode

      const newTaxonomy = {
        ...taxonomy,
        [key]: newType
      }

      return {
        ...state,
        taxonomy: {
          ...taxonomy,
          [key]: newType
        }
      }
    }
    default: {
      throw new Error(`Unhandled action type`)
    }
  }
}