import { AnnotationTypeFilter, DocumentViewerSkeleton, ToolbarLayout } from "@/components";
import { withAuthSsr } from "@/lib/withAuthSsr";
import { GetServerSideProps } from "next";
import { ReactElement, useState } from "react";
import styled from '@emotion/styled';
import { NextPageWithLayout } from "../_app";
import DocumentProvider from "@/modules/document/DocumentProvider/DocumentProvider";
import ToolbarContent from "@/modules/document/ToolbarContent/ToolbarContent";
import DocumentViewer from "@/modules/document/DocumentViewer/DocumentViewer";
import { ContentLayout } from "@/modules/document/ContentLayout";
import { selectDocumentCurrentEntityId, selectDocumentData, selectDocumentTaxonomy, useDocumentDispatch, useSelector } from "@/modules/document/DocumentProvider/selectors";
import AnnotationTypeFilterSkeleton from "@/components/AnnotationTypeFilter/AnnotationTypeFilterSkeleton";
import { useClickOutside } from "@/hooks";


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

const Overlay = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 100
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


const Document: NextPageWithLayout = () => {
  const taxonomy = useSelector(selectDocumentTaxonomy);
  const doc = useSelector(selectDocumentData);
  const [entityFilter, setEntityFilter] = useState('all');


  const handleAnnotationTypeFilterChange = (key: string) => {
    setEntityFilter(key);
  }

  if (!doc) {
    return <DocumentSkeleton />
  }

  const { annotations } = doc.annotation_sets.entities

  return (
    <Container>
      <AnnotationTypeFilterContainer>
        <AnnotationTypeFilter
          value={entityFilter}
          onChange={handleAnnotationTypeFilterChange}
          taxonomy={taxonomy}
          annotations={annotations} />
      </AnnotationTypeFilterContainer>
      <DocumentContainer>
        <DocumentViewer
          taxonomy={taxonomy}
          document={doc}
          filter={entityFilter} />
      </DocumentContainer>
    </Container>
  )
}

Document.getLayout = function getLayout(page: ReactElement) {
  return (
    <DocumentProvider>
      <ToolbarLayout
        toolbarContent={<ToolbarContent />}>
        <ContentLayout>
          {page}
        </ContentLayout>
      </ToolbarLayout>
    </DocumentProvider>
  )
}

export const getServerSideProps: GetServerSideProps = withAuthSsr(async (context) => {
  return {
    props: {}
  }
});

export default Document;
