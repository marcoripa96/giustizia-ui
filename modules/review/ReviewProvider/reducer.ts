import { createReducer } from "@/utils/createReducer";
import { createImmerReducer } from "@/utils/immerReducer";
import { current } from "immer";
import { Action, State } from "./types";
import { addIfUnique, setNextItem } from "./utils";

export const reviewReducer = createReducer<State, Action>({
  setState: (state, payload) => {
    return {
      ...state,
      ...payload.data
    }
  },
  setActiveItem: (state, payload) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        currentItemCursor: payload.cursor
      }
    }
  },
  updateTime: (state, payload) => {
    const annSet = Object.keys(state.currentDocument.annotation_sets)[0];
    const { time, cursor } = payload;

    return {
      ...state,
      currentDocument: {
        ...state.currentDocument,
        annotation_sets: {
          ...state.currentDocument.annotation_sets,
          [annSet]: {
            ...state.currentDocument.annotation_sets[annSet],
            annotations: state.currentDocument.annotation_sets[annSet].annotations.map((ann, index) => {
              if (cursor === index) {
                return {
                  ...ann,
                  features: {
                    ...ann.features,
                    review_time: time
                  }
                }
              }
              return ann;
            })
          }
        }
      }
    }
  },
  addCandidateOptionItem: (state, payload) => {
    const annSet = Object.keys(state.currentDocument.annotation_sets)[0];
    const cursor = state.ui.currentItemCursor;

    const newState: State = {
      ...state,
      currentDocument: {
        ...state.currentDocument,
        annotation_sets: {
          ...state.currentDocument.annotation_sets,
          [annSet]: {
            ...state.currentDocument.annotation_sets[annSet],
            annotations: state.currentDocument.annotation_sets[annSet].annotations.map((ann, index) => {
              if (index === cursor) {
                return {
                  ...ann,
                  features: {
                    ...ann.features,
                    additional_candidates: addIfUnique(ann.features.additional_candidates, payload.candidate)
                  }
                }
              }
              return ann;
            })
          }
        }
      }
    }

    return setNextItem(newState, payload.candidate);
  },
  nextAnnotation: (state, payload) => {
    return setNextItem(state, payload.candidate);
  },
  prevAnnotation: (state, payload) => {
    const cursor = state.ui.currentItemCursor;
    return {
      ...state,
      ui: {
        ...state.ui,
        currentItemCursor: cursor > 0 ? cursor - 1 : 0
      }
    }
  }
});
