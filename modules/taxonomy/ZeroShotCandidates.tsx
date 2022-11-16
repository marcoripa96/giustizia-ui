import { Candidate } from "@/server/routers/taxonomy";
import { useQuery } from "@/utils/trpc";
import styled from "@emotion/styled";
import { Button, Checkbox, Text } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import fakeCandidates from "./fakeCandidates";
import { FiChevronDown } from '@react-icons/all-files/fi/FiChevronDown';

type ZeroShotCandidatesProps = {
  candidates: Candidate[];
}

type CandidatesListProps = {
  candidates: Candidate[];
  selectedItems: number[];
  onChange: (index: number) => void;
}

type CandidateItemProps = {
  index: number;
  candidate: Candidate;
  isSelected: boolean;
  onClick: () => void;
}

const ListItemContainer = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
  padding: '10px',
  borderRadius: '6px',

  '&:hover': {
    background: 'rgba(0,0,0,0.05)',
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
  }
})

const Tag = styled.mark({
  padding: '2px',
  background: '#fcfcb5',
  borderRadius: '6px'
})

const CandidateItemWrapper = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px'
})

const CandidateItem = ({ candidate, onClick, isSelected, index }: CandidateItemProps) => {
  const content = useMemo(() => {
    const { context, offset_ex_start, offset_ex_end } = candidate;
    const start = `...${context.slice(0, offset_ex_start)}`;
    const mention = context.slice(offset_ex_start, offset_ex_end);
    const end = `${context.slice(offset_ex_end, context.length)}...`;

    return [
      start,
      <Tag key={0}>{mention}</Tag>,
      end
    ]
  }, [candidate]);

  return (
    <ListItemContainer onClick={onClick}>
      <Text css={{ color: 'rgba(0,0,0,0.5)', marginRight: '10px' }}>{index + 1}</Text>
      <Text css={{ marginRight: 'auto' }}>{content}</Text>
      <Checkbox onChange={onClick} isSelected={isSelected} size="lg" />
    </ListItemContainer>
  )
}

const ListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  // gap: '10px'
})

const ShowMoreButton = styled.button({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'center',
  gap: '10px',
  outline: 'none',
  border: '2px solid black',
  background: 'transparent',
  color: 'black',
  padding: '10px',
  fontWeight: '600',
  borderRadius: '26px',
  margin: '20px 0 0 0',
  transition: 'all 150ms ease-out',
  cursor: 'pointer',
  '&:active': {
    transform: 'scale(0.95)'
  },
  '&:hover': {
    background: 'black',
    color: '#FFF'
  }
})

const CANDIDATES_PER_PAGE = 20;

const CandidatesList = ({ candidates, selectedItems, onChange }: CandidatesListProps) => {
  const [page, setPage] = useState(1);

  const pageCandidates = useMemo(() => {
    return candidates.slice(0, page * CANDIDATES_PER_PAGE);
  }, [candidates, page]);

  const handleOnPageChange = () => {
    setPage((prev) => prev + 1);
  }

  const handleChange = (index: number) => {
    onChange(index);
  }

  const remainingCandidates = candidates.length - pageCandidates.length;

  return (
    <ListContainer>
      {pageCandidates.map((candidate, index) => (
        <CandidateItem
          key={index}
          index={index}
          candidate={candidate}
          onClick={() => handleChange(index)}
          isSelected={selectedItems.includes(index)}
        />
      ))}
      {remainingCandidates > 0 ? (
        <>
          <ListItemContainer>
            <Text css={{ margin: '0 auto', color: 'rgba(0,0,0,0.7)' }}>
              {`${remainingCandidates} esempi rimanenti`}
            </Text>
          </ListItemContainer>
          <ShowMoreButton onClick={handleOnPageChange}>
            <span>Mostra altri</span>
            <FiChevronDown />
          </ShowMoreButton>
        </>
      ) : null}
    </ListContainer>
  )
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

  // const pageCandidates = useMemo(() => {
  //   return candidates.slice(0, page * CANDIDATES_PER_PAGE);
  // }, [candidates, page]);

  const handleSelectionChange = (index: number) => {
    setSelectedItems((old) => {
      if (old.includes(index)) {
        return selectedItems.filter((item) => item !== index);
      }
      return [...selectedItems, index];
    })
  }

  // const handleOnPageChange = () => {
  //   setPage((prev) => prev + 1);
  // }


  return (
    <Container>
      <CandidatesList
        selectedItems={selectedItems}
        candidates={candidates}
        onChange={handleSelectionChange}
      />

      <Footer>
        <Text b css={{ marginLeft: 'auto', borderRadius: '12px', background: '#E2E2E2', padding: '12px 16px' }}>{`Esempi selezionati: ${selectedItems.length}`}</Text>
        <Button auto size="lg">Conferma</Button>
      </Footer>
    </Container>
  )
}

export default ZeroShotCandidates