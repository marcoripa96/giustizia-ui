import NER from "@/components/NER/NER";
import { SelectionNode } from "@/components/NER/TextNode";
import { useHashUrlId } from "@/hooks";
import useNER from "@/lib/ner/core/use-ner";
import { EntityAnnotation } from "@/server/routers/document";
import styled from "@emotion/styled";
import { MouseEvent, useEffect } from "react";
import {
  selectAddSelectionColor,
  selectDocumentAction,
  selectDocumentSectionAnnotations,
  selectDocumentTaxonomy,
  selectDocumentText,
  selectFilteredEntityAnnotations,
  selectHighlightAnnotationId,
  useDocumentDispatch,
  useSelector
} from "../DocumentProvider/selectors";
import { useViewIndex } from "../ViewProvider/ViewProvider";

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
  content-visibility: auto;
`


const DocumentViewer = () => {
  const viewIndex = useViewIndex();
  const action = useSelector(selectDocumentAction);
  const text = useSelector(selectDocumentText);
  const sectionAnnotations = useSelector(selectDocumentSectionAnnotations);
  const taxonomy = useSelector(selectDocumentTaxonomy);
  const filteredAnnotations = useSelector((state) => selectFilteredEntityAnnotations(state, viewIndex));
  const sectionUrlHashId = useHashUrlId();
  const highlightAnnotationId = useSelector(selectHighlightAnnotationId);
  const dispatch = useDocumentDispatch();

  useEffect(() => {
    const element = document.querySelector(`#${sectionUrlHashId}`);
    if (element) {
      element.scrollIntoView()
    }
  }, [sectionUrlHashId]);

  const handleTagClick = (event: MouseEvent, annotation: EntityAnnotation) => {
    switch (action.value) {
      case 'select': {
        dispatch({
          type: 'setCurrentEntityId',
          payload: {
            viewIndex,
            annotationId: annotation.id
          }
        })
      }
        break;
      case 'delete': {
        dispatch({
          type: 'deleteAnnotation',
          payload: {
            viewIndex,
            id: annotation.id
          }
        })
      }
        break;
      default: {
        return;
      }
    }
  }

  const handleTagDelete = (event: MouseEvent, annotation: EntityAnnotation) => {
    dispatch({
      type: 'deleteAnnotation',
      payload: {
        viewIndex,
        id: annotation.id
      }
    })
  }

  const onTextSelection = (event: MouseEvent, selectionNode: SelectionNode) => {
    dispatch({
      type: 'addAnnotation',
      payload: {
        viewIndex,
        type: action.data || '',
        ...selectionNode
      }
    })
  }

  return (
    <Container>
      <DocumentContainer>
        <NER
          taxonomy={taxonomy}
          text={text}
          entityAnnotations={filteredAnnotations}
          sectionAnnotations={sectionAnnotations}
          highlightAnnotation={highlightAnnotationId}
          showAnnotationDelete
          isAddMode={action.value === 'add'}
          onTagClick={handleTagClick}
          onTextSelection={onTextSelection}
          onTagDelete={handleTagDelete}
        />
      </DocumentContainer>
    </Container>
  )
}

export default DocumentViewer;