import { Card, DocumentViewerSkeleton, Toolbar } from "@/components";
import { Annotation, AnnotationClickEvent, NERDocumentViewer, SelectionEvent } from "@/components/NERDocumentViewer";
import { useClickOutside, useParam } from "@/hooks";
import { withAuthSsr } from "@/lib/withAuthSsr";
import { GetServerSideProps, NextPage } from "next";
import { MouseEvent, useRef, useState } from "react";
import styled from '@emotion/styled';
import { AnnotationCard, AnnotationCardProps } from "@/modules/document/AnnotationCard";
import { useDocument } from "@/lib/useDocument";
import { addAnnotation, deleteAnnotation, getAnnotationCardPosition } from "@/modules/document/utils/annotations";

const Container = styled.div`
  min-height: 100vh;
  padding: 100px 0 40px 0;
  background: #F8F9FA;
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
  ${({ moveToSide }) => moveToSide && {
    transform: 'translateX(15%)'
  }};
  transition: transform 250ms ease-out;
`

export type DocumentState = {
  id: string;
  title: string;
  content: string;
  annotations: Annotation[];
  lastIndexId: number;
};


const Document: NextPage = () => {
  // document data
  const { data, mutate } = useDocument();
  // state of the document (keeps track of the action selected by the user)
  const [documentAction, setDocumentAction] = useState<DocumentAction>({ key: 'select', payload: {} });
  // state of the annotation card, keeps track of the annotation to show
  const [annotationCard, setAnnotationCard] = useState<AnnotationCardProps | null>(null);

  // ref to the document element
  const docRef = useRef<HTMLDivElement>(null);

  // handler to detect click outside of the annotation card
  const annotationCardRef = useClickOutside((event) => {
    console.log(event.target);
    const id = (event.target as HTMLElement).getAttribute('id');
    // if the element is another annotation we do not want to unmount component
    if (id && id.startsWith('entity-node')) return;
    setAnnotationCard(null);
  })

  const onActionChange = (props: DocumentAction) => {
    setDocumentAction(props);
  }

  const onAnnotationClick = (event: MouseEvent<HTMLSpanElement>, annotationEvent: AnnotationClickEvent) => {
    const { annotation } = annotationEvent;

    if (documentAction.key === 'erase') {
      mutate((s) => deleteAnnotation(s, annotation))
    } else if (documentAction.key === 'select') {
      if (!docRef.current) {
        return;
      }
      const y = getAnnotationCardPosition(docRef.current, event.currentTarget);
      setAnnotationCard({ annotation, y });
    }
  }

  const onTextSelection = (event: SelectionEvent) => {
    if (documentAction.key === 'add') {
      mutate((s) => addAnnotation(s, event, documentAction));
    }
  }


  return (
    <>
      <Toolbar onActionChange={onActionChange} />
      <Container>
        {data ? (
          <>
            <DocumentContainer ref={docRef} moveToSide={!!annotationCard}>
              <NERDocumentViewer
                content={data.content}
                annotations={data.annotations}
                onSelection={onTextSelection}
                onEntityClick={onAnnotationClick} />
              {annotationCard && <AnnotationCard ref={annotationCardRef} {...annotationCard} />}
            </DocumentContainer>
          </>
        ) : (
          <DocumentViewerSkeleton />
        )}

      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withAuthSsr(async (context) => {
  return {
    props: {}
  }
});

export default Document;
