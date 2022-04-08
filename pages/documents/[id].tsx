import { DocumentViewer, DocumentViewerSkeleton, Toolbar } from "@/components";
import { ActionKey } from "@/components/Toolbar/actions";
import { useParam } from "@/hooks";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { DocumentByIdResponse } from "../api/document/[id]";

const Container = styled.div`
  min-height: 100vh;
  padding: 100px 0 40px 0;
`

const Document: NextPage = () => {
  const [data, setData] = useState<DocumentByIdResponse>();
  const [action, setAction] = useState<{ key: ActionKey, payload: any }>({ key: 'select', payload: {} });
  const [id, isRouterReady] = useParam('id');

  useEffect(() => {
    // on initial render is undefined because rendered on server
    if (!isRouterReady) {
      return;
    }
    fetch(`/api/document/${id}`)
      .then((res) => res.json())
      .then((data: DocumentByIdResponse) => {
        setData(data);
      });
  }, [id, isRouterReady]);

  const onActionSelect = (key: ActionKey, payload: any) => {
    setAction({ key, payload });
  }

  return (
    <>
      <Toolbar onSelect={onActionSelect} />
      <Container>
        {data ? (
          <>
            <DocumentViewer
              content={data.content}
              annotations={data.annotations}
              action={action}
            />
          </>
        ) : (
          <DocumentViewerSkeleton />
        )}

      </Container>
    </>
  )
}

export default Document;
