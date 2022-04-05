import { DocumentByIdResponse } from "@/pages/api/document/[id]";
import { DocumentState, VDoc } from "@/pages/documents/[id]";
import { FC, useMemo } from "react";
import styled, { CSSObject } from 'styled-components';
import { ActionKey } from "../Toolbar/actions";
import MentionTag from "./MentionTag/MentionTag";
import { Mention } from "./types";

type DocumentViewerProps = {
  document: DocumentState;
  action: ActionKey;
  onSelectionEnd: (selection: Selection) => void;
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

const getSelection = () => {
  const selection = window.getSelection();
  if (!selection) {
    return null
  }
  return selection;
}

const DocumentViewer: FC<DocumentViewerProps> = ({ document, action, onSelectionEnd }) => {
  const { virtualDoc } = document;

  const onMouseUp = () => {
    if (action !== 'add') {
      return;
    }
    const selection = getSelection();

    if (!selection) {
      return;
    }
    onSelectionEnd(selection);
  }

  return (
    <DocumentContainer>
      <DocumentContent onMouseUp={onMouseUp} action={action}>
        {virtualDoc}
      </DocumentContent>
    </DocumentContainer>
  )
};

export default DocumentViewer;