import { ToolbarLayout } from "@/components";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import DocumentProvider from "@/modules/document/DocumentProvider/DocumentProvider";
import ToolbarContent from "@/modules/document/ToolbarContent/ToolbarContent";
import { ContentLayout } from "@/modules/document/ContentLayout";
import { selectViews, useSelector } from "@/modules/document/DocumentProvider/selectors";
import ViewProvider from "@/modules/document/ViewProvider/ViewProvider";
import { MultiPane } from "@/components/MultiPane";
import dynamic from 'next/dynamic'
import withLocale from "@/components/TranslationProvider/withLocale";

const SidebarAnnotationDetails = dynamic(() => import('../../modules/document/SidebarAnnotationDetails/SidebarAnnotationDetails'));
const NewAnnotationSetModal = dynamic(() => import('../../modules/document/NewAnnotationSetModal/NewAnnotationSetModal'));

const Document: NextPageWithLayout = () => {
  const views = useSelector(selectViews);

  return (
    <>
      <MultiPane>
        {views.map((view, index) => (
          <ViewProvider key={index} viewIndex={index} />
        ))}
      </MultiPane>
      <SidebarAnnotationDetails />
      <NewAnnotationSetModal />
    </>
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

export const getServerSideProps = withLocale(() => {
  return {
    props: {}
  }
})

export default Document;
