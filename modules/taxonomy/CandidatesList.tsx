import { Candidate } from "@/server/routers/taxonomy";
import styled from "@emotion/styled";
import { Tooltip, Checkbox, Text } from "@nextui-org/react";
import { FiChevronDown } from "@react-icons/all-files/fi/FiChevronDown";
import Link from "next/link";
import { useMemo, useState, MouseEvent } from "react";

type CandidatesListProps = {
  candidates: Candidate[];
  selectedItems?: number[];
  selectable?: boolean;
  getUrl: (candidate: Candidate) => string;
  onChange?: (index: number) => void;
}

type CandidateItemProps = {
  index: number;
  selectable: boolean;
  candidate: Candidate;
  isSelected?: boolean;
  getUrl: (candidate: Candidate) => string;
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

const Tag = styled.a({
  padding: '2px',
  background: '#fcfcb5',
  borderRadius: '6px',
  "&:hover": {
    background: '#fcf653'
  }
})

const CandidateItem = ({ candidate, onClick, isSelected, selectable, index, getUrl }: CandidateItemProps) => {
  const content = useMemo(() => {
    const { text, offset_ex_start, offset_ex_end } = candidate;
    const start = `...${text.slice(0, offset_ex_start)}`;
    const mention = text.slice(offset_ex_start, offset_ex_end);
    const end = `${text.slice(offset_ex_end, text.length)}...`;

    const handleLinkOnClick = (event: MouseEvent) => {
      event.stopPropagation();
    }

    // TODO: sistemare url href con PoC_specialization_template
    return [
      start,
      <Tooltip css={{ display: 'inline' }} color="invert" key={0} content={`Visualizza nel documento ${candidate.doc_id}`}>
        {/* <Link href={`/documents/${candidate.doc_id}?annotationSetId=PoC_gold&annotationId=${candidate.id}`} passHref> */}
        <Link href={getUrl(candidate)} passHref>
          <Tag key={0} onClick={handleLinkOnClick} target="_blank" >
            {mention}
          </Tag>
        </Link>
      </Tooltip>,
      end
    ]
  }, [candidate]);

  const handleClick = () => {
    if (selectable) {
      onClick();
    }
  }

  return (
    <ListItemContainer onClick={handleClick}>
      <Text css={{ color: 'rgba(0,0,0,0.5)', marginRight: '10px' }}>{index + 1}</Text>
      <Text as="div" css={{ marginRight: 'auto' }}>{content}</Text>
      {selectable && <Checkbox onChange={handleClick} isSelected={isSelected} size="lg" />}
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

const CandidatesList = ({ candidates, selectedItems, selectable, onChange, getUrl }: CandidatesListProps) => {
  const [page, setPage] = useState(1);

  const pageCandidates = useMemo(() => {
    return candidates.slice(0, page * CANDIDATES_PER_PAGE);
  }, [candidates, page]);

  const handleOnPageChange = () => {
    setPage((prev) => prev + 1);
  }

  const handleChange = (index: number) => {
    if (selectable && onChange) {
      onChange(index);
    }
  }

  const remainingCandidates = candidates.length - pageCandidates.length;

  return (
    <ListContainer>
      {pageCandidates.map((candidate, index) => (
        <CandidateItem
          key={index}
          index={index}
          selectable={!!selectable}
          candidate={candidate}
          onClick={() => handleChange(index)}
          getUrl={getUrl}
          isSelected={selectedItems && selectedItems.includes(index)}
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

export default CandidatesList;