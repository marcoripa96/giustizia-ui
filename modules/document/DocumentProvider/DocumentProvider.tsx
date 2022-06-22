import { useParam } from "@/hooks";
import { useQuery } from "@/utils/trpc";
import { PropsWithChildren, useReducer } from "react";
import { DocumentStateContext, DocumentDispatchContext } from "./DocumentContext";
import { Document } from "@/server/routers/document";
import { documentReducer } from "./reducer";
import { State } from "./types";
import { initialUIState } from "./state";
import { SkeletonLayout } from "../SkeletonLayout";

/**
 * Fetches a document and provides it to the context consumer globally for the page.
 */
const DocumentProvider = ({ children }: PropsWithChildren<{}>) => {
  const [id] = useParam<string>('id');
  const { data, isFetching } = useQuery(['document.getDocument', { id: parseInt(id) }], { staleTime: Infinity });

  if (isFetching || !data) {
    return <SkeletonLayout />;
  }

  return <DocumentStateProvider data={data}>{children}</DocumentStateProvider>;
}

type DocumentStateProvider = {
  data: Document;
}


const DocumentStateProvider = ({ data, children }: PropsWithChildren<DocumentStateProvider>) => {
  const [state, dispatch] = useReducer(documentReducer, null, () => initializeState(data));

  return (
    <DocumentStateContext.Provider value={state}>
      <DocumentDispatchContext.Provider value={dispatch}>
        {children}
      </DocumentDispatchContext.Provider>
    </DocumentStateContext.Provider>
  )
};

/**
 * Lazy initializer for the reducer
 */
const initializeState = (data: Document): State => {
  // hopefully I get already sorted annotations
  if (data.annotation_sets.entities) {
    data.annotation_sets.entities.annotations.sort((a, b) => a.start - b.start);
    data.annotation_sets.entities_default = {
      ...data.annotation_sets.entities,
      name: 'entities_default'
    }
    data.annotation_sets = {
      ...data.annotation_sets,
      entities_test: {
        ...data.annotation_sets.entities,
        name: 'entities_test',
        annotations: data.annotation_sets.entities.annotations.filter((ent, index) => index % 2 === 0)
      }
    }
    delete data.annotation_sets.entities;
  }
  const firstEntityAnnSetKey = Object.keys((data.annotation_sets)).find((key) => key.startsWith('entities'));
  let typeFilter = new Set<string>();

  if (firstEntityAnnSetKey) {
    data.annotation_sets[firstEntityAnnSetKey].annotations.forEach((ann) => {
      typeFilter.add(ann.type);
    })

  }

  const activeAnnotationSet = Object.values(data.annotation_sets).filter((set) => set.name.startsWith('entities'))[0].name;

  return {
    data,
    ...initialUIState,
    ui: {
      ...initialUIState.ui,
      views: [
        {
          typeFilter: Array.from(typeFilter),
          activeAnnotationSet,
          activeSection: undefined
        }
      ]
    }
  }
}

export default DocumentProvider;
