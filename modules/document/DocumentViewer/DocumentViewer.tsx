import { NERViewer, SelectionNode } from "@/components";
import { EntityAnnotation } from "@/server/routers/document";
import styled from "@emotion/styled";
import { MouseEvent } from "react";
import { selectAddSelectionColor, selectDocumentAction, selectDocumentTaxonomy, selectDocumentText, selectFilteredEntityAnnotations, useDocumentDispatch, useSelector } from "../DocumentProvider/selectors";

const Container = styled.div({
  padding: '0 20px',
})

const DocumentContainer = styled.div`
  min-height: 100vh;
  background: #FFF;
  max-width: 900px;
  padding: 24px 36px;
  border-radius: 6px;
  margin: 0 auto;
`


const DocumentViewer = () => {
  const action = useSelector(selectDocumentAction);
  const text = useSelector(selectDocumentText);
  const taxonomy = useSelector(selectDocumentTaxonomy);
  const filteredAnnotations = useSelector(selectFilteredEntityAnnotations);
  const addSelectionColor = useSelector(selectAddSelectionColor);
  const dispatch = useDocumentDispatch();

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

  return (
    <Container>
      <DocumentContainer>
        <NERViewer
          disableLink
          disablePreview
          addMode={action.value === 'add'}
          addSelectionColor={addSelectionColor}
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