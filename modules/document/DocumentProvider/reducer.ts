import { NERAnnotation } from "@/server/routers/document";
import { removeProp, removeProps } from "@/utils/shared";
import { FlatTreeNode, getAllNodeData, getNodeAndChildren, getNodesPath } from "../SidebarAddAnnotation/Tree";
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
          ...state.ui,
          action: action.payload.action
        }
      };
    }
    case 'setCurrentEntity': {
      const { annotation } = action.payload;
      return {
        ...state,
        ui: {
          ...state.ui,
          selectedEntity: annotation
        }
      }
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

      const types = getNodeAndChildren(taxonomy, key, (node) => node.key);
      // delete types and subtypes from the taxonomy
      // delete annotation for the type and its subtypes
      return {
        ...state,
        ...(state.data && {
          data: {
            ...state.data,
            annotation: state.data.annotation.filter((ann) => types.indexOf(ann.ner_type) === -1)
          }
        }),
        taxonomy: removeProps(taxonomy, types)
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