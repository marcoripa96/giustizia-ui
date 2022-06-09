import { DocumentViewerSkeleton, NERViewer, SelectionNode } from "@/components";
import { Document, EntityAnnotation } from "@/server/routers/document";
import styled from "@emotion/styled";
import { Card } from "@nextui-org/react";
import { MouseEvent, useMemo } from "react";
import { selectDocumentAction, selectDocumentCurrentEntityId, useDocumentDispatch, useSelector } from "../DocumentProvider/selectors";
import { FlattenedTaxonomy } from "../DocumentProvider/types";
import { getAllNodeData } from "../SidebarAddAnnotation/Tree";

type DocumentViewerProps = {
  taxonomy: FlattenedTaxonomy;
  document: Document;
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
  const action = useSelector(selectDocumentAction);
  const selectedEntityId = useSelector(selectDocumentCurrentEntityId);
  const dispatch = useDocumentDispatch();
  const {
    text,
    annotation_sets: {
      entities: {
        annotations
      }
    }
  } = document;

  const filteredAnnotations = useMemo(() => {
    return annotations.filter((ann) => {
      if (filter === 'all') {
        return true;
      }
      return filter === ann.type;
    })
  }, [annotations, filter])

  const handleTagClick = (event: MouseEvent, annotation: EntityAnnotation) => {
    switch (action.value) {
      case 'select': {
        dispatch({
          type: 'setCurrentEntityId',
          payload: { annotationId: annotation.id }
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
          selectedEntityId={selectedEntityId}
          taxonomy={taxonomy}
          content={text}
          annotations={filteredAnnotations}
          onTagClick={handleTagClick}
          onTextSelection={onTextSelection}
        />
      </DocumentContainer>
    </Container>
  )
}

export default DocumentViewer;