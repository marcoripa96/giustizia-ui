import MentionTag from "./MentionTag/MentionTag";
import { EntityType, Mention } from "./types";
import { VDoc, VDocNode, _deleteEntityNode, _findOriginalOffset, _insertEntityNode, _insertSplittedNode, _splitNode } from "./virtual-doc";

/**
 * Reducer types
 */
type Action<T, P = {}> = { type: T; payload: P; };
type Reducer<S, A> = (state: S, action: A) => S;
type ReducerFn<S, P = {}> = (state: S, payload: P) => S;
type DocumentReducerAction = Action<keyof typeof ACTIONS, any>;
export type DocumentReducer = Reducer<VDoc, DocumentReducerAction>;

/**
 * Reducer function
 */
export const reducer: DocumentReducer = (state, action) => {
  const { type, payload } = action;

  if (type in ACTIONS) {
    return ACTIONS[type](state, payload);
  }

  return state;
}

type AddEntityNodeReducer = ReducerFn<VDoc, AddEntityNodeReducerPayload>;
export type AddEntityNodeReducerPayload = {
  selectedNode: VDocNode,
  startOffsetNode: number,
  endOffsetNode: number,
  entityType: EntityType
};

const addEntityNodeReducer: AddEntityNodeReducer = (state, payload) => {
  const { textNodes, entityNodes } = state;
  const { selectedNode, startOffsetNode, endOffsetNode, entityType } = payload;

  if (typeof selectedNode !== 'string') {
    throw ('Entity node selection not handled yet');
  }
  // find offset and node to update
  const { originalOffset, vDocIndex } = _findOriginalOffset(state, selectedNode, startOffsetNode);
  const node = textNodes[vDocIndex];
  // split text node in 3 parts [text, entity, text]
  const [first, entity, last] = _splitNode(node, startOffsetNode, endOffsetNode);
  // insert the splitted text nodes
  const newTextNodes = _insertSplittedNode(textNodes, [first, last], vDocIndex);
  // inset entity node
  const mention = {
    start_pos_original: originalOffset,
    end_pos_original: originalOffset + (endOffsetNode - startOffsetNode),
    ner_type: entityType || 'DATE',
    top_url: ''
  }
  const nodeEntity = {
    id: entityNodes.length + 1,
    text: entity,
    mention: mention
  };
  const newEntityNodes = _insertEntityNode(entityNodes, nodeEntity, vDocIndex);
  return { textNodes: newTextNodes, entityNodes: newEntityNodes };
}


type DeleteEntityNodeReducer = ReducerFn<VDoc, DeleteEntityNodeReducerPayload>;
type DeleteEntityNodeReducerPayload = {
  virtualDocIndex: number;
};

const deleteEntityNodeReducer: DeleteEntityNodeReducer = (state, payload) => {
  const { textNodes, entityNodes } = state;
  const { virtualDocIndex } = payload;

  const newState = _deleteEntityNode(textNodes, entityNodes, virtualDocIndex);
  return newState;
}

const ACTIONS = {
  'ADD_ENTITY': addEntityNodeReducer,
  'ERASE_ENTITY': deleteEntityNodeReducer
};
