import { FC } from "react";
import styled, { CSSObject } from 'styled-components';
import { ActionKey } from "../Toolbar/actions";
import { MENTION_TYPES } from "./MentionTag/mention-tag-colors";
import { MentionTagOnClickProps } from "./MentionTag/MentionTag";
import { AddEntityNodeReducerPayload } from "./reducer";
import { EntityType, Mention } from "./types";
import useDocument from "./use-document";

type DocumentViewerProps = {
  content: string;
  annotations: Mention[];
  action: { key: ActionKey, payload: any };
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
  action: { key: ActionKey, payload: any }
}

const DocumentContent = styled('p')<DocumentContentProps>(({ action }) => ({
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  lineHeight: 1.7,
  ...(action.key === 'add' && {
    '&::selection': {
      background: MENTION_TYPES[action.payload.type as EntityType].color
    }
  })
}));

const _getSelection = () => {
  const selection = window.getSelection();
  if (!selection) {
    return null
  }
  return selection;
}

const DocumentViewer: FC<DocumentViewerProps> = ({ content, annotations, action }) => {

  const onSelection = () => {
    if (action.key !== 'add') {
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

    const payload = {
      selectedNode: anchorNode.nodeValue,
      startOffsetNode,
      endOffsetNode,
      entityType: action.payload.type
    } as AddEntityNodeReducerPayload;

    addAnnotation(payload);
  }

  const onEntityClick = ({ virtualDocIndex, ...props }: MentionTagOnClickProps) => {
    if (action.key !== 'erase') {
      return;
    }

    eraseAnnotation(virtualDocIndex);
  }

  const renderOptions = {
    entity: {
      onClick: onEntityClick,
      ctrlEnabled: action.key === 'select'
    }
  }

  const {
    renderContent,
    addAnnotation,
    eraseAnnotation
  } = useDocument({ content, annotations }, renderOptions)

  return (
    <DocumentContainer>
      <DocumentContent onMouseUp={onSelection} action={action}>
        {renderContent()}
      </DocumentContent>
    </DocumentContainer>
  )
};

export default DocumentViewer;