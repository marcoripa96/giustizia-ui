import { Annotation } from "@/lib/ner/core/types";
import { AdditionalAnnotationProps, Candidate, EntityAnnotation } from "@/server/routers/document";
import styled from "@emotion/styled";
import { Link, Text } from "@nextui-org/react";
import { HTMLAttributes, MouseEvent, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { FiExternalLink } from '@react-icons/all-files/fi/FiExternalLink';
import { keyframes } from "@emotion/react";
import useTrackTime from "@/hooks/use-track-time";
import { useReviewDispatch } from "../ReviewProvider/selectors";
import ShortcutButton from "@/components/ShortcutButton/ShortcutButton";
import LinkPopover from "./LInkPopover";

export type ReviewListItemProps = {
  text: string;
  annotation: EntityAnnotation;
  startAnnRelativeOffset: number;
  endAnnRelativeOffset: number;
  active: boolean;
  highlightSelectionItem: number | null;
  onClick: (index: number) => void;
}

const popIn = keyframes({
  '0%': {
    opacity: 0,
    transform: 'scale(0.9)'
  },
  '100%': {
    opacity: 1,
    transform: 'scale(1)'
  }
})

const ItemContainer = styled.div<{ active: boolean }>(({ active }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  opacity: 1,
  animation: `${popIn} 300ms ease-in-out`,
  transition: 'opacity 250ms ease-in-out',
  ':first-of-type': {
    marginTop: 'auto'
  },
  ...(!active && {
    opacity: 0.4,
    userSelect: 'none',
    '&:after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      userSelect: 'none'
    }
  })
}));

const TextContainer = styled.div({
  borderBottom: '1px solid rgba(0,0,0,0.05)',
  padding: '20px 0'
})

const OptionsList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px'
})

const OptionItemContainer = styled.button<{ selected: boolean; highlight: boolean }>(({ selected, highlight }) => ({
  border: 'none',
  outliine: 'none',
  display: 'flex',
  flexDirection: 'row',
  // justifyContent: 'space-between',
  alignItems: 'center',
  gap: '5px',
  background: 'rgba(0,0,0,0.05)',
  padding: '5px 10px',
  borderRadius: '12px',
  transition: 'background 200ms ease-in-out, transform 200ms ease-in-out',
  cursor: 'pointer',
  ':active': {
    transform: 'scale(0.99)'
  },
  '&:hover': {
    ...(!selected && {
      background: 'rgba(0,0,0,0.1)',
    })
  },
  ...(selected && {
    boxShadow: '0 0 0 2px rgba(93, 211, 158, 1)',
    background: 'rgba(93, 211, 158, 0.3)',
  }),
  ...(highlight && {
    boxShadow: '0 0 0 2px rgba(93, 211, 158, 1)',
    transform: 'scale(0.99)'
  })
}));

const StyledTag = styled.a({
  background: '#000',
  padding: '0px 5px',
  color: '#FFF',
  borderRadius: '6px',
})

const StyledTagType = styled.span({
  fontSize: '10px',
  textTransform: 'uppercase',
  fontWeight: 600,
  marginLeft: '5px',
  background: '#FFF',
  color: '#000',
  padding: '0px 4px',
  borderRadius: '2px',
  verticalAlign: 'middle'
})

type TagProps = PropsWithChildren<{
  type: string;
  href?: string;
}>

const Tag = ({ type, href, children }: TagProps) => {
  return (
    <StyledTag href={href} target="_blank">
      {children}
      <StyledTagType>{type}</StyledTagType>
    </StyledTag>
  )
}



type OptionItemProps = {
  index: number;
  selected: boolean;
  highlight: boolean;
  candidate: Candidate;
  onClick: () => void;
  onMouseMove: (event: MouseEvent<HTMLElement>) => void;
  onMouseLeave: (event: MouseEvent<HTMLElement>) => void;
}

const OptionItem = ({ index, selected, highlight, candidate, onClick, onMouseMove, onMouseLeave }: OptionItemProps) => {
  return (
    <OptionItemContainer selected={selected} highlight={highlight} onClick={onClick} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      {index < 10 && <ShortcutButton shortcut={index < 9 ? `${index + 1}` : '\\'} />}
      <Text css={{
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
      }}>
        {candidate.title}
      </Text>
      <Link onClick={(e) => e.stopPropagation()} href={candidate.url} target="_blank"><FiExternalLink /></Link>
    </OptionItemContainer >
  )
};


const ReviewListItem = ({
  text: textProp,
  annotation,
  startAnnRelativeOffset,
  endAnnRelativeOffset,
  active,
  highlightSelectionItem,
  onClick,
}: ReviewListItemProps) => {
  const [popOverState, setPopOverState] = useState<{ x: number; y: number; candidate: Candidate; } | null>(null);

  const { additional_candidates, url } = annotation.features;

  const text = useMemo(() => {
    const types = annotation.features.types || [];
    const firstType = types[0];
    const additionalTypes = types.slice(1, types.length);
    const typeLabel = `${firstType}${additionalTypes.length > 0 ? `+${additionalTypes.length}` : ''}`
    const firstPart = textProp.slice(0, startAnnRelativeOffset);
    const hrefKey = annotation.features.mention.replace(/\s{1,}/g, '+').toLowerCase();
    const href = `https://it.wikipedia.org/wiki/Special:Search?go=Go&search=${hrefKey}`
    const ann = (
      <Tag type={typeLabel} key={annotation.id} href={href}>
        {textProp.slice(startAnnRelativeOffset, endAnnRelativeOffset)}
      </Tag>
    );
    const lastPart = textProp.slice(endAnnRelativeOffset, textProp.length);
    return [firstPart, ann, lastPart];
  }, [
    textProp,
    startAnnRelativeOffset,
    endAnnRelativeOffset
  ])


  const handleMouseMove = (event: MouseEvent<HTMLElement>, candidate: Candidate) => {
    const bbox = event.currentTarget.getBoundingClientRect();
    const x = event.pageX - event.currentTarget.offsetLeft + 20;
    const y = bbox.top;
    setPopOverState({ x, y, candidate });
  }

  const handleMouseLeave = (event: MouseEvent<HTMLElement>) => {
    setPopOverState(null);
  }

  return (
    <ItemContainer active={active}>
      <TextContainer>
        {text}...
      </TextContainer>
      <OptionsList>
        {additional_candidates.map((candidate, index) => (
          <OptionItem
            key={candidate.url}
            index={index}
            highlight={highlightSelectionItem === index}
            selected={url === candidate.url}
            onClick={() => onClick(index)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={(e) => handleMouseMove(e, candidate)}
            candidate={candidate} />
        ))}
      </OptionsList>
      <LinkPopover anchor={popOverState} />
    </ItemContainer>
  )
};

export default ReviewListItem;