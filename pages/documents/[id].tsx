import { AnnotationTypeFilter, DocumentViewerSkeleton, ToolbarLayout } from "@/components";
import { withAuthSsr } from "@/lib/withAuthSsr";
import { GetServerSideProps } from "next";
import { ReactElement, useState } from "react";
import styled from '@emotion/styled';
import { NERAnnotation } from "@/server/routers/document";
import { NextPageWithLayout } from "../_app";
import DocumentProvider from "@/modules/document/DocumentProvider/DocumentProvider";
import ToolbarContent from "@/modules/document/ToolbarContent/ToolbarContent";
import DocumentViewer from "@/modules/document/DocumentViewer/DocumentViewer";
import { ContentLayout } from "@/modules/document/ContentLayout";
import { useDocumentData, useDocumentTaxonomy } from "@/modules/document/DocumentProvider/selectors";
import AnnotationTypeFilterSkeleton from "@/components/AnnotationTypeFilter/AnnotationTypeFilterSkeleton";


const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

const DocumentContainer = styled.div({
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

export type DocumentState = {
  id: string;
  title: string;
  content: string;
  annotations: NERAnnotation[];
  lastIndexId: number;
};

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
  const taxonomy = useDocumentTaxonomy();
  const document = useDocumentData();
  const [entityFilter, setEntityFilter] = useState('all');

  const handleAnnotationTypeFilterChange = (key: string) => {
    setEntityFilter(key);
  }

  if (!document) {
    return <DocumentSkeleton />
  }

  return (
    <Container>
      <AnnotationTypeFilterContainer>
        <AnnotationTypeFilter
          value={entityFilter}
          onChange={handleAnnotationTypeFilterChange}
          taxonomy={taxonomy}
          annotations={document.annotation} />
      </AnnotationTypeFilterContainer>
      <DocumentContainer>
        <DocumentViewer
          taxonomy={taxonomy}
          document={document}
          filter={entityFilter} />
      </DocumentContainer>
    </Container>
  )
}

Document.getLayout = function getLayout(page: ReactElement) {
  return (
    <DocumentProvider>
      <ToolbarLayout
        // siderbarContent={<ActionSidebar />}
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
