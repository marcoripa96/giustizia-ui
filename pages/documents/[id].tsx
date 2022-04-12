import { Card, DocumentViewerSkeleton, Toolbar } from "@/components";
import { Annotation, AnnotationClickEvent, NERDocumentViewer, SelectionEvent } from "@/components/NERDocumentViewer";
import { useParam } from "@/hooks";
import { withAuthSsr } from "@/lib/withAuthSsr";
import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { DocumentByIdResponse } from "../api/document/[id]";

const Container = styled.div`
  min-height: 100vh;
  padding: 100px 0 40px 0;
`

type DocumentAction = {
  key: string;
  payload?: any;
}

const DocumentContainer = styled(Card)`
  min-height: 100vh;
  background: #FFF;
  max-width: 900px;
  padding: 24px 36px;
  border-radius: 6px;
  margin: 0 auto;
`

export type DocumentState = {
  id: string;
  title: string;
  content: string;
  annotations: Annotation[];
  lastIndexId: number;
};



const Document: NextPage = () => {
  const [data, setData] = useState<DocumentState>();
  const [id, isRouterReady] = useParam('id');
  const [documentAction, setDocumentAction] = useState<DocumentAction>({ key: 'select', payload: {} });

  useEffect(() => {
    // on initial render is undefined because rendered on server
    if (!isRouterReady) {
      return;
    }
    fetch(`/api/document/${id}`)
      .then((res) => res.json())
      .then((data: DocumentByIdResponse) => {
        const processedData = {
          ...data,
          annotations: data.annotations.map((annotation, index) => ({ id: index, ...annotation })),
          lastIndexId: data.annotations.length - 1
        };
        setData(processedData);
      });
  }, [id, isRouterReady]);

  const onActionChange = (props: DocumentAction) => {
    setDocumentAction(props);
  }

  const onAnnotationClick = (event: AnnotationClickEvent) => {
    if (documentAction.key === 'erase') {
      const { annotation } = event;

      setData((s) => {
        if (!s) {
          return s;
        }

        return {
          ...s,
          annotations: s.annotations.filter((ann) => ann.id !== annotation.id)
        }
      })
    }
  }

  const onTextSelection = (event: SelectionEvent) => {
    if (documentAction.key !== 'add') {
      return;
    }
    const { startOffset, endOffset } = event;

    setData((s) => {
      if (!s) {
        return s;
      }

      const insIndex = s.annotations.findIndex((annotation) => startOffset < annotation.start_pos_original);

      const newAnnotation: Annotation = {
        id: s.lastIndexId + 1,
        start_pos_original: startOffset,
        end_pos_original: endOffset,
        ner_type: documentAction.payload.type,
        top_url: ''
      }

      return {
        ...s,
        annotations: [
          ...s.annotations.slice(0, insIndex),
          newAnnotation,
          ...s.annotations.slice(insIndex, s.annotations.length)
        ],
        lastIndexId: s.lastIndexId + 1
      }
    })
  }


  return (
    <>

      <Toolbar onActionChange={onActionChange} />
      <Container>
        {data ? (
          <>
            <DocumentContainer>
              <NERDocumentViewer
                content={data.content}
                annotations={data.annotations}
                onSelection={onTextSelection}
                onEntityClick={onAnnotationClick} />
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
