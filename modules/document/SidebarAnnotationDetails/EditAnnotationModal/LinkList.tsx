import { Flex } from "@/components";
import { Candidate } from "@/server/routers/document";
import styled from "@emotion/styled";
import { Checkbox, Text, Link } from "@nextui-org/react";
import { MouseEvent } from "react";


const LinkListContainer = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '10px'
})

const ItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
  borderRadius: '6px',
  border: '1px solid rgba(0,0,0,0.1)',
  padding: '10px',
  cursor: 'pointer',
  transition: 'background 200ms ease-out',
  '&:hover': {
    background: 'rgba(0,0,0,0.02)'
  }
});

const LinkItemDetailsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column'
})

type LinkItemProps = {
  candidate: Candidate;
  selected: boolean;
  onClick: (event: MouseEvent) => void;
}

const LinkItem = ({ candidate, selected, onClick }: LinkItemProps) => {
  return (
    <ItemContainer role="button" onClick={onClick}>
      <Checkbox aria-label="candiate-check" isSelected={selected} />
      <LinkItemDetailsContainer>
        <Flex direction="row" gap="10px" alignItems="center">
          <Text>{candidate.title}</Text>
          <Text size={12} css={{ color: 'rgba(0,0,0,0.7)' }}>Score: {candidate.score.toFixed(2)}</Text>
        </Flex>
        <Link href={candidate.url} target="_blank" css={{ fontSize: '12px' }}>{candidate.url}</Link>
      </LinkItemDetailsContainer>
    </ItemContainer>
  )
}

type LinkListProps = {
  candidates: Candidate[] | undefined;
  value: number | undefined;
  onChange: (id: number) => void;
}

const LinkList = ({ candidates, value, onChange }: LinkListProps) => {
  if (!candidates || candidates.length === 0) {
    return <Text css={{ color: 'rgba(0,0,0,0.7)' }}>There are no links.</Text>
  }

  return (
    <LinkListContainer>
      {candidates.map((candidate) => (
        <LinkItem
          key={candidate.wikipedia_id}
          candidate={candidate}
          selected={value === candidate.wikipedia_id}
          onClick={() => onChange(candidate.wikipedia_id)} />
      ))}
    </LinkListContainer>
  )
}

export default LinkList;


