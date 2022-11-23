import { ToolbarLayout } from "@/components";
import { ReactElement, useEffect } from "react";
import { NextPageWithLayout } from "../_app";
import DocumentProvider from "@/modules/document/DocumentProvider/DocumentProvider";
import ToolbarContent from "@/modules/document/ToolbarContent/ToolbarContent";
import { ContentLayout } from "@/modules/document/ContentLayout";
import { selectViews, useDocumentDispatch, useSelector } from "@/modules/document/DocumentProvider/selectors";
import ViewProvider from "@/modules/document/ViewProvider/ViewProvider";
import { MultiPane } from "@/components/MultiPane";
import dynamic from 'next/dynamic'
import withLocale from "@/components/TranslationProvider/withLocale";
import { useRouter } from "next/router";

const SidebarAnnotationDetails = dynamic(() => import('../../modules/document/SidebarAnnotationDetails/SidebarAnnotationDetails'));
const NewAnnotationSetModal = dynamic(() => import('../../modules/document/NewAnnotationSetModal/NewAnnotationSetModal'));

const Document: NextPageWithLayout = () => {
  const views = useSelector(selectViews);
  const router = useRouter()
  const dispatch = useDocumentDispatch()

  useEffect(() => {
    const { annotationSetId, annotationId } = router.query
    if (annotationSetId != null) {
      dispatch({
        type: "changeAnnotationSet",
        payload: {
          viewIndex: 0,
          annotationSet: `entities_${annotationSetId}` as string
        }
      })

    }

    setTimeout(() => {
      if (annotationId != null) {
        const element = document.getElementById(`entity-tag-${annotationId}`);
        if (!element) return;

        element.scrollIntoView({ behavior: 'smooth', block: 'center' });

        const observer = new IntersectionObserver(
          (entries) => {
            const [entry] = entries;

            if (entry.isIntersecting) {
              observer.unobserve(element);
              dispatch({
                type: 'highlightAnnotation',
                payload: {
                  annotationId: Number(annotationId)
                },
              });
            }
          },
          { root: null, rootMargin: '0px', threshold: 1 }
        );

        observer.observe(element);

      }
    }, 200)
  }, [router.query])

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
