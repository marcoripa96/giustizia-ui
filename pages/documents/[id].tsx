import { DocumentViewer } from "@/components";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { DocumentByIdResponse } from "../api/document/[id]";

const Container = styled.div`
  min-height: 100vh;
  padding: 100px 0 40px 0;
`

const Document: NextPage = () => {
  const [document, setDocument] = useState<DocumentByIdResponse>();

  const router = useRouter()
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    fetch(`/api/document/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDocument(data);
      });
  }, [id]);

  return (
    <Container>
      <DocumentViewer document={document} />
    </Container>
  )
}

export default Document;