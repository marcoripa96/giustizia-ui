import { useContext } from "react";
import { DocumentStateContext, DocumentDispatchContext } from "./DocumentContext";
import { State } from "./types";

/**
 * Access the document state within the DocumentProvider.
 */
export const useDocumentState = () => {
  const context = useContext(DocumentStateContext);

  if (context === undefined) {
    throw new Error('useDocumentState must be used within a DocumentProvider')
  }

  return context;
};

/**
 * Access the document disptach within the DocumentProvider.
 */
export const useDocumentDispatch = () => {
  const context = useContext(DocumentDispatchContext);

  if (context === undefined) {
    throw new Error('useDocumentDispatch must be used within a DocumentProvider')
  }

  return context;
};

/**
 * An hook to select the state partially
 */
export function useSelector<T>(cb: (state: State) => T) {
  const _state = useDocumentState();
  return cb(_state);
}

export const useDocumentAction = () => useSelector((state) => state.ui.action);
export const useDocumentTypes = () => useSelector((state) => state.types);
export const useDocumentActiveType = () => useSelector((state) => state.ui.action.data);
