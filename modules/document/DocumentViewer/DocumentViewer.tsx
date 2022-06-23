import { NERViewer, SelectionNode } from "@/components";
import { useHashUrlId } from "@/hooks";
import { EntityAnnotation } from "@/server/routers/document";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { MouseEvent, useEffect } from "react";
import {
  selectAddSelectionColor,
  selectDocumentAction,
  selectDocumentSectionAnnotations,
  selectDocumentTaxonomy,
  selectDocumentText,
  selectFilteredEntityAnnotations,
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
  const addSelectionColor = useSelector(selectAddSelectionColor);
  const sectionUrlHashId = useHashUrlId();
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
          payload: { annotationId: `${viewIndex}/${annotation.id}` }
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

  const onSectionChange = (sectionId: string) => {
    // dispatch({
    //   type: 'setUI',
    //   payload: {
    //     activeSection: sectionId
    //   }
    // })
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
          text={text}
          entityAnnotations={filteredAnnotations}
          sectionAnnotations={sectionAnnotations}
          onTagClick={handleTagClick}
          onTextSelection={onTextSelection}
          onSectionChange={onSectionChange}
        />
      </DocumentContainer>
    </Container>
  )
}

export default DocumentViewer;