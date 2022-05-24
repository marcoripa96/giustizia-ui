import { DocumentViewerSkeleton, NERViewer } from "@/components";
import styled from "@emotion/styled";
import { Card } from "@nextui-org/react";
import { useMemo } from "react";
import { useDocumentData } from "../DocumentProvider/selectors";
import { FlattenedTaxonomy } from "../DocumentProvider/types";
import { DocumentState } from "../DocumentProvider/useInitState";

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
  const { text, annotation } = document;

  const annotations = useMemo(() => {
    return annotation.filter((ann) => {
      if (filter === 'all') {
        return true;
      }
      return filter === ann.ner_type;
    })
  }, [annotation, filter])

  console.log(annotations);

  return (
    <Container>
      <DocumentContainer>
        <NERViewer
          taxonomy={taxonomy}
          content={text}
          annotations={annotations}
          disableLink
          disablePreview
        />
      </DocumentContainer>
    </Container>
  )
}

export default DocumentViewer;