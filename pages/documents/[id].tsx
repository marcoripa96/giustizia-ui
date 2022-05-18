import { Card, DocumentViewerSkeleton, Toolbar, ToolbarSidebarLayout } from "@/components";
import { Annotation, AnnotationClickEvent, NERDocumentViewer, SelectionEvent } from "@/components/NERDocumentViewer";
import { useClickOutside, useParam } from "@/hooks";
import { withAuthSsr } from "@/lib/withAuthSsr";
import { GetServerSideProps, NextPage } from "next";
import { FocusEvent, MouseEvent, ReactElement, useRef, useState } from "react";
import styled from '@emotion/styled';
import { AnnotationCard, AnnotationCardProps } from "@/modules/document/AnnotationCard";
import { addAnnotation, deleteAnnotation, getAnnotationCardPosition } from "@/modules/document/utils/annotations";
import { NERAnnotation } from "@/server/routers/document";
import { NextPageWithLayout } from "../_app";
import DocumentProvider from "@/modules/document/DocumentProvider/DocumentProvider";
import ToolbarContent from "@/modules/document/ToolbarContent/ToolbarContent";
import DocumentViewer from "@/modules/document/DocumentViewer/DocumentViewer";
import { ContentLayout } from "@/modules/document/ContentLayout";
import ActionSidebar from "@/modules/document/ContentLayout/ActionSidebar";

const Container = styled.div`
  min-height: 100vh;
  padding: 100px 0 40px 0;
`

export type DocumentAction = {
  key: string;
  payload?: any;
}

const DocumentContainer = styled(Card) <{ moveToSide: boolean }>`
  position: relative;
  min-height: 100vh;
  background: #FFF;
  max-width: 900px;
  padding: 24px 36px;
  border-radius: 6px;
  margin: 0 auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.7;
  ${({ moveToSide }) => moveToSide && {
    transform: 'translateX(15%)'
  }};
  transition: transform 250ms ease-out;
`

export type DocumentState = {
  id: string;
  title: string;
  content: string;
  annotations: NERAnnotation[];
  lastIndexId: number;
};


const Document: NextPageWithLayout = () => {
  return <DocumentViewer />;
  // // document data
  // const { document, setDocument } = useDocument();
  // // state of the document (keeps track of the action selected by the user)
  // const [documentAction, setDocumentAction] = useState<DocumentAction>({ key: 'select', payload: {} });
  // // state of the annotation card, keeps track of the annotation to show
  // const [annotationCard, setAnnotationCard] = useState<AnnotationCardProps | null>(null);

  // // ref to the document element
  // const docRef = useRef<HTMLDivElement>(null);

  // // handler to detect click outside of the annotation card
  // const annotationCardRef = useClickOutside(() => setAnnotationCard(null))

  // const onActionChange = (props: DocumentAction) => {
  //   setDocumentAction(props);
  // }

  // const onAnnotationClick = (event: MouseEvent<HTMLSpanElement>, annotationEvent: AnnotationClickEvent) => {
  //   const { annotation } = annotationEvent;

  //   if (documentAction.key === 'erase') {
  //     setDocument((s) => deleteAnnotation(s, annotation))
  //   } else if (documentAction.key === 'select') {
  //     if (!docRef.current) {
  //       return;
  //     }
  //     const y = getAnnotationCardPosition(docRef.current, event.currentTarget);
  //     setAnnotationCard({ annotation, y });
  //   }
  // }

  // const onAnnotationFocus = (event: FocusEvent<HTMLSpanElement>, annotationEvent: AnnotationClickEvent) => {
  //   const { annotation } = annotationEvent;

  //   if (documentAction.key === 'select') {
  //     if (!docRef.current) {
  //       return;
  //     }
  //     const y = getAnnotationCardPosition(docRef.current, event.currentTarget);
  //     setAnnotationCard({ annotation, y });
  //   }
  // }

  // const onTextSelection = (event: SelectionEvent) => {
  //   if (documentAction.key === 'add') {
  //     setDocument((s) => addAnnotation(s, event, documentAction));
  //   }
  // }

  // return (
  //   <>
  //     <Toolbar onActionChange={onActionChange} />
  //     <Container>
  //       {document ? (
  //         <>
  //           <DocumentContainer ref={docRef} moveToSide={!!annotationCard}>
  //             <NERDocumentViewer
  //               content={document.text}
  //               annotation={document.annotation}
  //               onSelection={onTextSelection}
  //               onEntityClick={onAnnotationClick}
  //               onEntityFocus={onAnnotationFocus} />
  //             {annotationCard && <AnnotationCard ref={annotationCardRef} {...annotationCard} />}
  //           </DocumentContainer>
  //         </>
  //       ) : (
  //         <DocumentViewerSkeleton />
  //       )}

  //     </Container>
  //   </>
  // )
}

Document.getLayout = function getLayout(page: ReactElement) {
  return (
    <DocumentProvider>
      <ToolbarSidebarLayout
        siderbarContent={<ActionSidebar />}
        toolbarContent={<ToolbarContent />}>
        <ContentLayout>
          {page}
        </ContentLayout>
      </ToolbarSidebarLayout>
    </DocumentProvider>
  )
}

export const getServerSideProps: GetServerSideProps = withAuthSsr(async (context) => {
  return {
    props: {}
  }
});

export default Document;
