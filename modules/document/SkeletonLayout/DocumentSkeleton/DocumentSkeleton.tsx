import { DocumentViewerSkeleton } from "@/components";
import styled from "@emotion/styled";
import AnnotationTypeFilterSkeleton from "./AnnotationTypeFilterSkeleton";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

const DocumentContainer = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  margin: '20px'
})

const AnnotationTypeFilterContainer = styled.div({
  position: 'sticky',
  top: '48px',
  display: 'flex',
  flexDirection: 'column',
  padding: '5px',
  zIndex: 10,
  background: '#FFF',
  borderBottom: '1px solid #F3F3F5'
})

const DocumentSkeleton = () => {
  return (
    <Container>
      <AnnotationTypeFilterContainer>
        <AnnotationTypeFilterSkeleton />
      </AnnotationTypeFilterContainer>
      <DocumentContainer>
        <DocumentViewerSkeleton />
      </DocumentContainer>
    </Container>
  )
}

export default DocumentSkeleton;