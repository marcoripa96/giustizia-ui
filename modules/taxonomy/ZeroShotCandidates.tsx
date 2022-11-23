import { useParam } from "@/hooks";
import { Candidate } from "@/server/routers/taxonomy";
import styled from "@emotion/styled";
import { Button, Text } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import CandidatesList from "./CandidatesList";


type ZeroShotCandidatesProps = {
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

const ZeroShotCandidates = ({ candidates }: ZeroShotCandidatesProps) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [type] = useParam<string>('type');
  const router = useRouter();

  const handleSelectionChange = (index: number) => {
    setSelectedItems((old) => {
      if (old.includes(index)) {
        return selectedItems.filter((item) => item !== index);
      }
      return [...selectedItems, index];
    })
  }

  const handleConfirm = () => {
    router.push(`/taxonomy/${type}/few-shot-examples`, undefined, { shallow: true });
  }

  return (
    <Container>
      <CandidatesList
        selectedItems={selectedItems}
        selectable
        candidates={candidates}
        onChange={handleSelectionChange}
        getUrl={(candidate) => `/documents/${candidate.doc_id}?annotationSetId=PoC_specialization_template&annotationId=${candidate.id}`}
      />

      <Footer>
        <Text b css={{ marginLeft: 'auto', borderRadius: '12px', background: '#E2E2E2', padding: '12px 16px' }}>{`Esempi selezionati: ${selectedItems.length}`}</Text>
        <Button onClick={handleConfirm} auto size="lg">Conferma</Button>
      </Footer>
    </Container>
  )
}

export default ZeroShotCandidates