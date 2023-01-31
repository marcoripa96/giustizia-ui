import { Annotation } from "@/lib/ner/core/types";
import { AdditionalAnnotationProps, Candidate, EntityAnnotation } from "@/server/routers/document";
import styled from "@emotion/styled";
import { Link, Text } from "@nextui-org/react";
import { PropsWithChildren, useEffect, useMemo } from "react";
import { FiExternalLink } from '@react-icons/all-files/fi/FiExternalLink';
import { keyframes } from "@emotion/react";
import useTrackTime from "@/hooks/use-track-time";
import { useReviewDispatch } from "../ReviewProvider/selectors";
import ShortcutButton from "@/components/ShortcutButton/ShortcutButton";

export type ReviewListItemProps = {
  text: string;
  annotation: EntityAnnotation;
  startAnnRelativeOffset: number;
  endAnnRelativeOffset: number;
  active: boolean;
  highlightSelectionItem: number | null;
  onClick: (candidate: Candidate) => void;
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

const StyledTag = styled.span({
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
}>

const Tag = ({ type, children }: TagProps) => {
  return (
    <StyledTag>
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
}

const OptionItem = ({ index, selected, highlight, candidate, onClick }: OptionItemProps) => {
  return (
    <OptionItemContainer selected={selected} highlight={highlight} onClick={onClick}>
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


const ReviewListItem = ({ text: textProp, annotation, startAnnRelativeOffset, endAnnRelativeOffset, active, highlightSelectionItem, onClick }: ReviewListItemProps) => {
  const { features: { review_time = 0 } } = annotation;

  // const { elapsedTime } = useTrackTime({ seconds: review_time, isRunning: active });
  const dispatch = useReviewDispatch();

  // useEffect(() => {
  //   dispatch({
  //     type: 'updateTime',
  //     payload: {
  //       time: elapsedTime
  //     }
  //   })
  // }, [elapsedTime]);

  const { additional_candidates, url } = annotation.features;

  const text = useMemo(() => {
    const types = annotation.features.types || [];
    const firstType = types[0];
    const additionalTypes = types.slice(1, types.length);
    const typeLabel = `${firstType}${additionalTypes.length > 0 ? `+${additionalTypes.length}` : ''}`
    const firstPart = textProp.slice(0, startAnnRelativeOffset);
    const ann = <Tag type={typeLabel} key={annotation.id}>{textProp.slice(startAnnRelativeOffset, endAnnRelativeOffset)}</Tag>
    const lastPart = textProp.slice(endAnnRelativeOffset, textProp.length);
    return [firstPart, ann, lastPart];
  }, [
    textProp,
    startAnnRelativeOffset,
    endAnnRelativeOffset
  ])

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
            onClick={() => onClick(candidate)}
            candidate={candidate} />
        ))}
      </OptionsList>
    </ItemContainer>
  )
};

export default ReviewListItem;