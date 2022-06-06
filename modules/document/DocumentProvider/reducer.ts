import { EntityAnnotation } from "@/server/routers/document";
import { removeProps } from "@/utils/shared";
import { FlatTreeNode, getNodeAndChildren } from "../SidebarAddAnnotation/Tree";
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
    case 'setCurrentEntityId': {
      const { annotationId } = action.payload;
      return {
        ...state,
        ui: {
          ...state.ui,
          selectedEntityId: annotationId
        }
      }
    }
    case 'addAnnotation': {
      if (!state.data) {
        return state;
      }
      const { type, startOffset, endOffset, text } = action.payload;
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
          ner: {},
          linking: {}
        }
      }

      return {
        ...state,
        data: {
          ...state.data,
          annotation_sets: {
            ...state.data.annotation_sets,
            entities: {
              ...state.data.annotation_sets.entities,
              annotations: addAnnotation(annotations, newAnnotation),
              next_annid: next_annid + 1
            }
          }
          // annotation: addAnnotation(annotation, newAnnotation),
          // lastIndexId: newLastIndexId
        }
      };
    }
    case 'editAnnotation': {
      if (!state.data) {
        return state;
      }
      const { annotationId, type, topCandidate } = action.payload;
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
      return {
        ...state,
        data: {
          ...state.data,
          annotation_sets: {
            ...state.data.annotation_sets,
            entities: {
              ...state.data.annotation_sets.entities,
              annotations: newAnnotations
            }
          }
        }
      };
    }
    case 'deleteAnnotation': {
      if (!state.data) {
        return state;
      }
      const { id } = action.payload;
      const { annotations } = state.data.annotation_sets.entities;
      const newAnnotation = annotations.filter((ann) => ann.id !== id);
      return {
        ...state,
        data: {
          ...state.data,
          annotation_sets: {
            ...state.data.annotation_sets,
            entities: {
              ...state.data.annotation_sets.entities,
              annotations: newAnnotation
            }
          }
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
            annotation_sets: {
              ...state.data.annotation_sets,
              entities: {
                ...state.data.annotation_sets.entities,
                annotations: state.data.annotation_sets.entities.annotations.filter((ann) => types.indexOf(ann.type) === -1)
              }
            }
          },
          ...(state.ui.selectedEntityId != null && {
            ui: {
              ...state.ui,
              // TODO: if an entity is selected, deselect if it is of the type deleted
              selectedEntityId: null
            }
          })
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
        recognizable: false,
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
    case 'setUI': {
      return {
        ...state,
        ui: {
          ...state.ui,
          ...action.payload
        }
      }
    }
    default: {
      throw new Error(`Unhandled action type`)
    }
  }
}