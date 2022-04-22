import { Annotation, annotationTypes } from "@/components/NERDocumentViewer";
import styled from "@emotion/styled";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Image from 'next/image';
import { Link } from "@/components";
import { forwardRef, memo } from "react";
import { useQuery } from "@/utils/trpc";


const AnnotationCardBox = styled.div<{ y: number }>(({ y }) => ({
  position: 'absolute',
  width: '300px',
  top: 0,
  right: '102%',
  borderRadius: '6px',
  background: '#FFF',
  border: '1px solid rgb(233, 236, 239)',
  overflow: 'hidden',
  transform: `translateY(${y}px)`,
  transition: 'transform 200ms ease-out'
}));

const AnnotationCardContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '18px',
  '&:not(:last-of-type)': {
    borderBottom: '1px solid rgb(233, 236, 239)',
  }
})

const TitleCardAnnotation = styled(Link)({
  fontSize: '16px',
  fontWeight: 500,
  margin: 0
})

const CardContent = styled.p({
  fontSize: '14px',
  margin: 0
})

const ImgContainer = styled.div({
  position: 'relative',
  width: '100%',
  height: '180px'
})

const Row = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between'
})

const Column = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px'
})

const Tag = styled.span<{ type?: keyof typeof annotationTypes; }>`
  padding: 2px 5px;
  font-size: 12px;
  border-radius: 6px;
  font-weight: 600;
  background: ${({ type }) => type ? annotationTypes[type].color : '#E2E2E2'};
`

const TitleCandidate = styled(Link)({
  width: '60%',
  fontSize: '12px',
  fontWeight: 600,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
})

const TagScore = styled(Tag)({
  fontSize: '10px'
})

export type AnnotationCardProps = {
  annotation: Annotation;
  y: number;
}


const SkeletonCard = () => {
  return (
    <>
      <Skeleton width="100%" height={180} borderRadius="0px" style={{ lineHeight: 'unset' }} />
      <AnnotationCardContent>
        <Skeleton width="100%" height="10px" count={5} />
      </AnnotationCardContent>
    </>
  )
}

const TitleCandidates = styled.span({
  fontSize: '16px',
  fontWeight: '500'
})

type CandidatesProps = {
  candidates: Annotation['candidates']
}

const Candidates = ({ candidates }: CandidatesProps) => {
  return (
    <>
      {candidates && (
        <AnnotationCardContent>
          <Column>
            <TitleCandidates>Candidates {`(${candidates.length})`}</TitleCandidates>
            {candidates.map((candidate) => (
              <Row key={candidate.id}>
                <TitleCandidate href={candidate.url} target="_blank">{candidate.title}</TitleCandidate>
                <TagScore>Score: {candidate.score.toFixed(2)}</TagScore>
              </Row>
            ))}
          </Column>
        </AnnotationCardContent>
      )}
    </>
  )
}

const EmptyCard = () => {
  return (
    <AnnotationCardContent>
      <Column>
        <TitleCandidates>No candidates</TitleCandidates>
        <CardContent>
          This annotation has no matching candidates available.
        </CardContent>
      </Column>
    </AnnotationCardContent>
  )
}

const AnnotationCardDetails = ({ annotation }: { annotation: Annotation }) => {
  const { top_wikipedia_id: id, ner_type } = annotation;
  // get annotation data
  const { data, isLoading } = useQuery(['annotation.getAnnotationDetails', { id: id ? id : '' }]);

  return (
    <>
      {data ? (
        <>
          {data.thumbnail && (
            <ImgContainer>
              <Image alt="" layout="fill" src={data.thumbnail.source} objectFit="cover" />
            </ImgContainer>
          )}
          <AnnotationCardContent>
            <Row>
              <TitleCardAnnotation href={annotation.top_url}>{annotation.top_title}</TitleCardAnnotation>
              <Tag type={ner_type}>{annotationTypes[ner_type].label}</Tag>
            </Row>
            <CardContent>
              {data.extract}
            </CardContent>
          </AnnotationCardContent>
          <Candidates candidates={annotation.candidates} />
        </>
      )
        : <SkeletonCard />}
    </>
  )
}


/**
 * Annotation card showing information about an annotation.
 * ForwardRef so that we can detect click outside to close the annotation card.
 */
const AnnotationCard = forwardRef<HTMLDivElement, AnnotationCardProps>(({ y, annotation }, ref) => {
  return (
    <AnnotationCardBox ref={ref} y={y}>
      {annotation.candidates ? (
        <AnnotationCardDetails annotation={annotation} />
      ) : (
        <EmptyCard />
      )}
    </AnnotationCardBox>
  )
});

AnnotationCard.displayName = 'AnnotationCard';

export default memo(AnnotationCard);