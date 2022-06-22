import { ToolbarLayout } from "@/components";
import { withAuthSsr } from "@/lib/withAuthSsr";
import { GetServerSideProps } from "next";
import { ReactElement } from "react";
import styled from '@emotion/styled';
import { NextPageWithLayout } from "../_app";
import DocumentProvider from "@/modules/document/DocumentProvider/DocumentProvider";
import ToolbarContent from "@/modules/document/ToolbarContent/ToolbarContent";
import DocumentViewer from "@/modules/document/DocumentViewer/DocumentViewer";
import { ContentLayout } from "@/modules/document/ContentLayout";
import { Toolsbar } from "@/modules/document/Toolsbar";
import { selectViews, useSelector } from "@/modules/document/DocumentProvider/selectors";
import View from "@/modules/document/ViewProvider/View";
import ViewProvider from "@/modules/document/ViewProvider/ViewProvider";
import { MultiPane } from "@/components/MultiPane";

const ViewsContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  height: '100%'
})

const Container = styled.div({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
})

const DocumentContainer = styled.div({
  height: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  // margin: '20px',
  padding: '20px',
  overflowY: 'auto'
})

const Document: NextPageWithLayout = () => {
  const views = useSelector(selectViews);

  return (
    <MultiPane>
      {views.map((view, index) => (
        <ViewProvider key={index} viewIndex={index} />
      ))}
    </MultiPane>
    // <ViewsContainer>
    //   {views.map((view, index) => (
    //     <ViewProvider key={index} viewIndex={index} />
    //   ))}
    // </ViewsContainer>
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
