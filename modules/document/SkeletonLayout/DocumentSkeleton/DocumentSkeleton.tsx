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
  margin: '20px',
  padding: '0 20px'
})

const DocumentSkeleton = () => {
  return (
    <Container>
      <DocumentContainer>
        <DocumentViewerSkeleton />
      </DocumentContainer>
    </Container>
  )
}

export default DocumentSkeleton;