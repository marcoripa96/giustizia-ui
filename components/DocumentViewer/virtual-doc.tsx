import MentionTag from "./MentionTag/MentionTag";
import { Mention } from "./types";

export type VDoc = {
  textNodes: TextNode[];
  entityNodes: EntityNode[];
};
export type VDocNode = TextNode | EntityNode;
export type TextNode = string;
export type EntityNode = {
  id: number,
  text: string,
  elementToRender: JSX.Element
};

/**
 * Create virtual doc given content and annotatins
 */
export const _createVDoc = (content: string, annotations: Mention[]) => {
  if (!content || !annotations) {
    return { textNodes: [], entityNodes: [] };
  }

  let vDoc: VDoc = { textNodes: [], entityNodes: [] };

  let lastPosition = 0;

  annotations.forEach((mention, index) => {
    const { start_pos_original, end_pos_original } = mention;
    // node of type text
    const nodeText = content.slice(lastPosition, start_pos_original);
    const entity = content.slice(start_pos_original, end_pos_original);
    // node of type entity
    const nodeEntity = {
      id: index,
      text: entity,
      elementToRender: <MentionTag key={index} mention={mention}>{entity}</MentionTag>,
    };

    vDoc.textNodes.push(nodeText);
    vDoc.entityNodes.push(nodeEntity);

    lastPosition = end_pos_original;
  });

  return vDoc;
}

/**
 * Create rendering array from virtual document
 */
export const _renderContent = (vDoc: VDoc) => {
  const { textNodes, entityNodes } = vDoc;

  let content = [];

  // cancatenation of textNode and entityNode
  for (let i = 0; i < textNodes.length - 1; i++) {
    content.push(textNodes[i]);
    content.push(entityNodes[i].elementToRender);
  }
  return content;
}

/**
 * Split a text node for an entity [first, entity, last]
 */
export const _splitNode = (node: TextNode, startOffset: number, endOffset: number) => {
  const firstTextNode = node.slice(0, startOffset);
  const entity = node.slice(startOffset, endOffset);
  const secondTextNode = node.slice(endOffset, node.length);

  return [firstTextNode, entity, secondTextNode] as const;
}

/**
 * Insert textNodes of a splitted node (see _splitNode)
 */
export const _insertSplittedNode = (nodes: TextNode[], node: TextNode[], index: number) => {
  return [...nodes.slice(0, index), ...node, ...nodes.slice(index + 1, nodes.length)];
}

/**
 * Insert entity node
 */
export const _insertEntityNode = (nodes: EntityNode[], entityNode: EntityNode, index: number) => {
  return [...nodes.slice(0, index), entityNode, ...nodes.slice(index, nodes.length)];
}

/**
 * find offset on original document given the selection node
 */
export const _findOriginalOffset = (virtualDoc: VDoc, selectionNode: TextNode, startOffset: number) => {
  let originalOffset = 0;
  let vDocIndex = -1;

  const { textNodes, entityNodes } = virtualDoc;

  for (const node of textNodes) {
    if (node === selectionNode) {
      originalOffset += startOffset;
      vDocIndex += 1;
      return { originalOffset, vDocIndex };
    }
    if (entityNodes[vDocIndex]) {
      originalOffset += entityNodes[vDocIndex].text.length;
    }
    vDocIndex += 1;
  }

  return {
    originalOffset,
    vDocIndex
  };
}