import { DocumentViewerSkeleton, NERViewer, SelectionNode } from "@/components";
import { NERAnnotation } from "@/server/routers/document";
import styled from "@emotion/styled";
import { Card } from "@nextui-org/react";
import { MouseEvent, useMemo } from "react";
import { useDocumentAction, useDocumentData, useDocumentDispatch } from "../DocumentProvider/selectors";
import { FlattenedTaxonomy } from "../DocumentProvider/types";
import { DocumentState } from "../DocumentProvider/useInitState";
import { getAllNodeData } from "../SidebarAddAnnotation/Tree";

type DocumentViewerProps = {
  taxonomy: FlattenedTaxonomy;
  document: DocumentState;
  filter: string;
}

const Container = styled.div({
  padding: '0 20px',
  // margin: '20px'
})

const DocumentContainer = styled.div`
  min-height: 100vh;
  background: #FFF;
  max-width: 900px;
  padding: 24px 36px;
  border-radius: 6px;
  margin: 0 auto;
`


const DocumentViewer = ({ taxonomy, document, filter }: DocumentViewerProps) => {
  const action = useDocumentAction();
  const dispatch = useDocumentDispatch();
  const { text, annotation } = document;

  const annotations = useMemo(() => {
    return annotation.filter((ann) => {
      if (filter === 'all') {
        return true;
      }
      return filter === ann.ner_type;
    })
  }, [annotation, filter])

  const handleTagClick = (event: MouseEvent, annotation: NERAnnotation) => {
    switch (action.value) {
      case 'select': {
        dispatch({
          type: 'setCurrentEntity',
          payload: { annotation }
        })
      }
        break;
      case 'delete': {
        dispatch({
          type: 'deleteAnnotation',
          payload: { id: annotation.id }
        })
      }
        break;
      default: {
        return;
      }
    }
  }

  const onTextSelection = (event: MouseEvent, selectionNode: SelectionNode) => {
    dispatch({
      type: 'addAnnotation',
      payload: {
        type: action.data || '',
        ...selectionNode
      }
    })
  }

  const isAddMode = action.value === 'add';
  const addSelectionColor = useMemo(() => {
    if (!action.data) {
      return ''
    }
    try {
      return getAllNodeData(taxonomy, action.data).color
    } catch (err) {
      // trying to access a node that doesn't exist
      return ''
    }
  }, [taxonomy, action.data]);

  return (
    <Container>
      <DocumentContainer>
        <NERViewer
          disableLink
          disablePreview
          addMode={isAddMode}
          addSelectionColor={addSelectionColor}
          taxonomy={taxonomy}
          content={text}
          annotations={annotations}
          onTagClick={handleTagClick}
          onTextSelection={onTextSelection}
        />
      </DocumentContainer>
    </Container>
  )
}

export default DocumentViewer;