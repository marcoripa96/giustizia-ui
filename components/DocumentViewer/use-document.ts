import { useReducer } from "react";
import { AddEntityNodeReducerPayload, DocumentReducer, reducer } from "./reducer";
import { Mention } from "./types";
import { RenderContentOptions, VDoc, _createVDoc, _renderContent } from "./virtual-doc";

type Data = {
  content: string;
  annotations: Mention[];
}

const initialState = { textNodes: [], entityNodes: [] }

/**
 * A hook which encapsulates the logic to represent a document with its annotations
 */
const useDocument = (data: Data, options?: RenderContentOptions) => {
  const [virtualDoc, dispatch] = useReducer<DocumentReducer, VDoc>(
    reducer,
    initialState,
    // lazily initialize virtualDoc
    () => _createVDoc(data)
  );

  /**
   * Render the virtual document
   */
  const renderContent = () => {
    return _renderContent(virtualDoc, options);
  }

  /**
   * Delete an annotation at a specific index of the virtual document
   */
  const eraseAnnotation = (i: number) => {
    dispatch({
      type: 'ERASE_ENTITY',
      payload: {
        virtualDocIndex: i
      }
    })
  }

  /**
   * Add a new annotation to the virtual document
   */
  const addAnnotation = (payload: AddEntityNodeReducerPayload) => {
    dispatch({
      type: 'ADD_ENTITY',
      payload
    })
  }

  return {
    renderContent,
    addAnnotation,
    eraseAnnotation
  }
};

export default useDocument;