import { FC, useReducer, useState } from "react";
import styled, { CSSObject } from 'styled-components';
import { ActionKey } from "../Toolbar/actions";
import MentionTag from "./MentionTag/MentionTag";
import { DocumentReducer, reducer } from "./reducer";
import { Mention } from "./types";
import { VDoc, _createVDoc, _renderContent } from "./virtual-doc";

type DocumentViewerProps = {
  content: string;
  annotations: Mention[];
  action: ActionKey;
};

const DocumentContainer = styled.div`
  min-height: 100vh;
  background: #FFF;
  max-width: 900px;
  padding: 24px 36px;
  border-radius: 6px;
  margin: 0 auto;
`

type DocumentContentProps = {
  action: ActionKey
}

const addStyles: CSSObject = {
  '&::selection': {
    background: 'rgb(170, 156, 252)'
  }
}

const DocumentContent = styled('p')<DocumentContentProps>(({ action }) => ({
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  lineHeight: 1.7,
  ...(action === 'add' && addStyles)
}));

const _getSelection = () => {
  const selection = window.getSelection();
  if (!selection) {
    return null
  }
  return selection;
}

const initialState = { textNodes: [], entityNodes: [] }

const DocumentViewer: FC<DocumentViewerProps> = ({ content, annotations, action }) => {
  const [virtualDoc, dispatch] = useReducer<DocumentReducer, VDoc>(
    reducer,
    initialState,
    // lazily initialize virtualDoc
    () => _createVDoc(content, annotations)
  );

  const onSelection = () => {
    if (action !== 'add') {
      return;
    }
    // get user text selection
    const selection = _getSelection();
    if (!selection || !selection.anchorNode || selection.anchorOffset === selection.focusOffset) {
      return;
    }

    const {
      anchorNode,
      anchorOffset: startOffsetNode,
      focusOffset: endOffsetNode } = selection;

    dispatch({
      type: 'ADD_ENTITY',
      payload: {
        selectedNode: anchorNode.nodeValue,
        startOffsetNode,
        endOffsetNode,
        entityType: 'DATE'
      }
    })
  }

  return (
    <DocumentContainer>
      <DocumentContent onMouseUp={onSelection} action={action}>
        {_renderContent(virtualDoc)}
      </DocumentContent>
    </DocumentContainer>
  )
};

export default DocumentViewer;