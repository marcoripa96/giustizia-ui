import { Candidate } from "@/server/routers/taxonomy";
import styled from "@emotion/styled";
import { Button, Text } from "@nextui-org/react";
import { useState } from "react";
import CandidatesList from "./CandidatesList";


type FewShotExamplesProps = {
  candidates: Candidate[];
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column'
})

const Footer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
  position: 'sticky',
  width: '100%',
  bottom: 0,
  left: 0,
  padding: '10px',
  background: 'rgba(255,255,255,0.8)',
  zIndex: 999
})

const FewShotExamples = ({ candidates }: FewShotExamplesProps) => {

  return (
    <Container>
      <CandidatesList
        getUrl={(candidate) => `/documents/${candidate.doc_id}?annotationSetId=PoC_test_fewshot&annotationId=${candidate.id}`}
        candidates={candidates} />
    </Container>
  )
}

export default FewShotExamples