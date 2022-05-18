import { PropsWithChildren, useMemo, useReducer } from "react";
import { DocumentStateContext, DocumentDispatchContext } from "./DocumentContext";
import { useInitState } from "./useInitState";

/**
 * Fetches a document and provides it to the context consumer globally for the page.
 * This makes it easier to work with toolbar/sidebar and other components so that props drilling is avoided.
 */
const DocumentProvider = ({ children }: PropsWithChildren<{}>) => {
  const { state, dispatch } = useInitState();

  return (
    <DocumentStateContext.Provider value={state}>
      <DocumentDispatchContext.Provider value={dispatch}>
        {children}
      </DocumentDispatchContext.Provider>
    </DocumentStateContext.Provider>
  )
};

export default DocumentProvider;
