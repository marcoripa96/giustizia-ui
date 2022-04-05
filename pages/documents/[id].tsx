import { DocumentViewer, DocumentViewerSkeleton, Toolbar } from "@/components";
import MentionTag from "@/components/DocumentViewer/MentionTag/MentionTag";
import { Mention } from "@/components/DocumentViewer/types";
import { ActionKey } from "@/components/Toolbar/actions";
import { useParam } from "@/hooks";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Annotation, DocumentByIdResponse } from "../api/document/[id]";

const Container = styled.div`
  min-height: 100vh;
  padding: 100px 0 40px 0;
`
export type VDoc = VDocNode[];
type VDocNode = string | JSX.Element;

/**
 * The virtual doc represents an annotated text
 */
const createVDoc = (content: string, mentions: Mention[]) => {
  if (!content || !mentions) {
    return [];
  }

  let vDoc: VDoc = [];

  let lastPosition = 0;
  mentions.forEach((mention, index) => {
    const { start_pos_original, end_pos_original } = mention;
    // node of type text
    const nodeText = content.slice(lastPosition, start_pos_original);
    const entity = content.slice(start_pos_original, end_pos_original);
    // node of type entity
    const nodeEntity = <MentionTag key={index} mention={mention}>{entity}</MentionTag>;

    vDoc.push(nodeText)
    vDoc.push(nodeEntity)

    lastPosition = end_pos_original;
  });

  return vDoc;
}

type UpdateVDocProps = {
  virtualDoc: VDoc;
  index: number;
  mention: Mention;
  nodeStartOffset: number;
  nodeEndOffset: number;
}

const updateVDoc = ({
  virtualDoc,
  index,
  mention,
  nodeStartOffset,
  nodeEndOffset
}: UpdateVDocProps) => {
  const beforeItems = virtualDoc.slice(0, index);
  const afterItems = virtualDoc.slice(index + 1, virtualDoc.length);
  const nodeToUpdate = virtualDoc[index] as string;
  const nodeBeforeText = nodeToUpdate.slice(0, nodeStartOffset);
  const entity = nodeToUpdate.slice(nodeStartOffset, nodeEndOffset);
  const nodeAfterText = nodeToUpdate.slice(nodeEndOffset, nodeToUpdate.length);
  const nodeEntity = <MentionTag key={virtualDoc.length} mention={mention}>{entity}</MentionTag>;
  const nodes = [nodeBeforeText, nodeEntity, nodeAfterText];

  return [...beforeItems, ...nodes, ...afterItems];
}

type FindOriginalOffsetProps = {
  virtualDoc: VDoc;
  selectionNode: string;
  startOffset: number
}

const findOriginalOffset = ({
  virtualDoc,
  selectionNode,
  startOffset
}: FindOriginalOffsetProps) => {
  let originalOffset = 0;
  let vDocIndex = -1;
  for (const node of virtualDoc) {
    if (typeof node === 'string') {
      if (node === selectionNode) {
        originalOffset += startOffset;
        vDocIndex += 1;
        return { originalOffset, vDocIndex };
      }
      originalOffset += node.length;
    } else {
      originalOffset += node.props.children.length;
    }
    vDocIndex += 1;
  }
  return {
    originalOffset,
    vDocIndex
  };
}

export type DocumentState = {
  id: string;
  title: string;
  original: string;
  annotation: Annotation;
  virtualDoc: VDoc;
}

/**
 * Create the document state
 */
const createDocumentState = (document: DocumentByIdResponse) => {
  const { id, title, content, annotation } = document;
  // create virtual doc
  const virtualDoc = createVDoc(content, annotation)
  // create state of document
  const state = {
    id,
    title,
    original: content,
    annotation,
    virtualDoc
  }
  return state;
}


const Document: NextPage = () => {
  const [document, setDocument] = useState<DocumentState>();
  const [action, setAction] = useState<ActionKey>('select');
  const [id, isRouterReady] = useParam('id');

  useEffect(() => {
    // on initial render is undefined because rendered on server
    if (!isRouterReady) {
      return;
    }
    fetch(`/api/document/${id}`)
      .then((res) => res.json())
      .then((data: DocumentByIdResponse) => {
        setDocument(createDocumentState(data));
      });
  }, [id, isRouterReady]);

  const onActionSelect = (action: ActionKey) => {
    setAction(action);
  }

  const onSelectionEnd = (selection: Selection | null) => {
    setDocument((doc) => {
      if (!doc || !selection) {
        return doc;
      }
      const {
        anchorNode,
        anchorOffset: startOffset,
        focusOffset: endOffset } = selection;

      if (!anchorNode) {
        return doc;
      }
      const { virtualDoc } = doc;
      const selectionNode = anchorNode.nodeValue || '';
      const annotationLength = endOffset - startOffset;
      // find offset on original text
      const { originalOffset, vDocIndex: index } = findOriginalOffset({ virtualDoc, selectionNode, startOffset })
      // update VDOM
      const mention: Mention = {
        start_pos_original: originalOffset,
        end_pos_original: originalOffset + annotationLength,
        ner_type: 'DATE',
        top_url: ''
      }

      const newVDoc = updateVDoc({
        virtualDoc,
        index,
        mention,
        nodeStartOffset: startOffset,
        nodeEndOffset: endOffset
      })

      // update annotations
      // right now annotations are not synchronized with the vDoc

      return {
        ...doc,
        virtualDoc: newVDoc
      };
    });
  }




  return (
    <>
      <Toolbar onSelect={onActionSelect} />
      <Container>
        {document ? (
          <DocumentViewer
            document={document}
            action={action}
            onSelectionEnd={onSelectionEnd}
          />
        ) : (
          <DocumentViewerSkeleton />
        )}

      </Container>
    </>
  )
}

export default Document;
