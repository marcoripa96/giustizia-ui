import { AnnotationSet, Cluster, EntityAnnotation } from "@/server/routers/document";
import { createImmerReducer } from "@/utils/immerReducer";
import { removeProps } from "@/utils/shared";
import { FlatTreeNode, getNodeAndChildren } from "../../../components/Tree";
import { State, Action } from "./types";
import { addAnnotation, getAnnotationTypes, getEntityIndex, getTypeFilter, isSameAction, toggleLeftSidebar } from "./utils";

export const documentReducer = createImmerReducer<State, Action>({
  setData: (state, payload) => {
    state.data = payload.data;
  },
  highlightAnnotation: (state, payload) => {
    state.ui.highlightAnnotation.entityId = payload.annotationId;
  },
  changeAction: (state, payload) => {
    toggleLeftSidebar(state, payload);
    state.ui.action.value = payload.action;
    state.ui.action.data = undefined;
  },
  changeActionData: (state, payload) => {
    state.ui.action.data = payload.data
  },
  createAnnotationSet: (state, payload) => {
    const { name, preset } = payload;

    const keyAnnSet = `entities_${name}`;

    const newAnnSet: AnnotationSet<EntityAnnotation> = {
      name: keyAnnSet,
      annotations: [],
      next_annid: 0
    };

    if (preset !== '') {
      newAnnSet.annotations = state.data.annotation_sets[preset].annotations
    }

    state.data.annotation_sets[keyAnnSet] = newAnnSet;
  },
  deleteAnnotationSet: (state, payload) => {
    const { name } = payload;
    const { [name]: omit, ...rest } = state.data.annotation_sets;
    state.data.annotation_sets = rest;
  },
  udpateAnnotationSets: (state, payload) => {
    const { annotationSets } = payload;

    annotationSets.forEach((set) => {
      state.data.annotation_sets[set.name] = {
        ...set
      }
    })
  },
  setCurrentEntityId: (state, payload) => {
    const { viewIndex, annotationId } = payload;
    const { views } = state.ui;
    const { activeAnnotationSet } = views[viewIndex];
    const { annotations } = state.data.annotation_sets[activeAnnotationSet];
    const entityIndex = annotations.findIndex((ann) => ann.id === annotationId);
    if (entityIndex !== -1) {
      state.ui.selectedEntity = {
        viewIndex,
        entityIndex
      };
    } else {
      state.ui.selectedEntity = null;
    }
  },
  nextCurrentEntity: (state) => {
    if (!state.ui.selectedEntity) {
      return state;
    }
    const { views } = state.ui;
    const previousSelectedEntity = state.ui.selectedEntity;
    const { activeAnnotationSet } = views[previousSelectedEntity.viewIndex];
    const { annotations } = state.data.annotation_sets[activeAnnotationSet];
    if (annotations.length - 1 === previousSelectedEntity.entityIndex) {
      state.ui.selectedEntity.entityIndex = 0;
    } else {
      state.ui.selectedEntity.entityIndex = previousSelectedEntity.entityIndex + 1;
    }
  },
  previousCurrentEntity: (state) => {
    if (!state.ui.selectedEntity) {
      return state;
    }
    const { views } = state.ui;
    const previousSelectedEntity = state.ui.selectedEntity;
    const { activeAnnotationSet } = views[previousSelectedEntity.viewIndex];
    const { annotations } = state.data.annotation_sets[activeAnnotationSet];
    if (previousSelectedEntity.entityIndex === 0) {
      state.ui.selectedEntity.entityIndex = annotations.length - 1;
    } else {
      state.ui.selectedEntity.entityIndex = previousSelectedEntity.entityIndex - 1;
    }
  },
  addAnnotation: (state, payload) => {
    const { views } = state.ui
    const { viewIndex, type, start, end, text } = payload;
    const { activeAnnotationSet, typeFilter } = views[viewIndex];

    const {
      next_annid,
      annotations
    } = state.data.annotation_sets[activeAnnotationSet];

    const newAnnotation: any = {
      id: next_annid,
      start,
      end,
      type: type,
      features: {
        mention: text,
        ner: {},
        linking: {}
      }
    }
    state.data.annotation_sets[activeAnnotationSet].annotations = addAnnotation(annotations, newAnnotation);
    state.data.annotation_sets[activeAnnotationSet].next_annid = next_annid + 1;

    if (typeFilter.indexOf(type) === -1) {
      typeFilter.push(type);
    }
  },
  editAnnotation: (state, payload) => {
    const { views, selectedEntity } = state.ui;
    if (!selectedEntity) {
      return state;
    }

    const { annotationId, types, topCandidate } = payload;
    const { viewIndex } = selectedEntity;

    const { activeAnnotationSet } = views[viewIndex];
    const { annotations } = state.data.annotation_sets[activeAnnotationSet];
    const newAnnotations = annotations.map((ann) => {
      if (ann.id === annotationId) {
        return {
          ...ann,
          type: types[0],
          features: {
            ...ann.features,
            types: types.slice(1),
            linking: {
              ...ann.features.linking,
              ...(!!topCandidate && {
                top_candidate: topCandidate
              })
            }
          }
        }
      }
      return ann;
    });
    state.data.annotation_sets[activeAnnotationSet].annotations = newAnnotations;
    state.ui.views[viewIndex].typeFilter = getTypeFilter(newAnnotations);
  },
  deleteAnnotation: (state, payload) => {
    const { views } = state.ui;
    const { viewIndex, id } = payload;
    const { activeAnnotationSet } = views[viewIndex];
    const { annotations } = state.data.annotation_sets[activeAnnotationSet];
    // delete annotation
    const indexToDelete = annotations.findIndex((ann) => ann.id === id);

    if (indexToDelete !== -1) {
      const annToDelete = annotations[indexToDelete];
      const newAnnotations = [...annotations.slice(0, indexToDelete), ...annotations.slice(indexToDelete + 1, annotations.length)];
      state.data.annotation_sets[activeAnnotationSet].annotations = newAnnotations;
      state.ui.views[viewIndex].typeFilter = getTypeFilter(newAnnotations);

      const newClusters = state.data.features.clusters[activeAnnotationSet].map((cluster) => {
        if (cluster.id === annToDelete.features.cluster) {
          return {
            ...cluster,
            mentions: cluster.mentions.filter((mention) => mention.id !== annToDelete.id)
          }
        }
        return cluster
      })

      state.data.features.clusters[activeAnnotationSet] = newClusters.filter((cluster) => cluster.mentions.length > 0);

    }
  },
  addTaxonomyType: (state, payload) => {
    const { type } = payload;
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
    const { taxonomy } = state;
    const { key } = payload;

    const types = getNodeAndChildren(taxonomy, key, (node) => node.key);

    Object.values(state.data.annotation_sets).forEach((annSet) => {
      if (annSet.name.startsWith('entities')) {
        annSet.annotations = annSet.annotations.filter((ann) => types.indexOf(ann.type) === -1);
      }
    })

    state.ui.views.forEach((view) => {
      const indexToRemove = view.typeFilter.indexOf(key);
      if (indexToRemove !== -1) {
        view.typeFilter.splice(indexToRemove, 1);
      }
    })
    state.ui.selectedEntity = null;
    state.taxonomy = removeProps(taxonomy, types)

  },
  changeAnnotationSet: (state, payload) => {
    const { annotationSet, viewIndex } = payload;
    const { annotations } = state.data.annotation_sets[annotationSet]

    state.ui.views[viewIndex].typeFilter = getTypeFilter(annotations);
    state.ui.views[viewIndex].activeAnnotationSet = annotationSet;
  },
  setView: (state, payload) => {
    const { viewIndex, view } = payload;
    state.ui.views[viewIndex] = {
      ...state.ui.views[viewIndex],
      ...view
    }
  },
  addView: (state) => {
    state.ui.views = [
      ...state.ui.views,
      state.ui.views[0]
    ]
  },
  removeView: (state) => {
    state.ui.views.splice(1, 1);
  },
  setUI: (state, payload) => {
    state.ui = {
      ...state.ui,
      ...payload
    }
  }
})
