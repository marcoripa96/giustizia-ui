import { Candidate } from "@/server/routers/document";
import { useQuery } from "@/utils/trpc";
import styled from "@emotion/styled";
import { Collapse, Checkbox, Col, Text, Link } from "@nextui-org/react";
import { FiArrowUpRight } from "@react-icons/all-files/fi/FiArrowUpRight";
import { useState, useEffect, useMemo } from "react";
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { getCandidateId } from "../DocumentProvider/utils";

type AnnotationLinkCollapseContentProps = {
  candidate: Candidate;
  fetchData: boolean;
}

const AnnotationLinkCollapseContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
})

const ImgContainer = styled.div({
  position: 'relative',
  width: '100%',
  height: '120px',
  borderRadius: '4px',
  border: '1px solid rgba(0,0,0,0.1)',
  overflow: 'hidden'
})

const Row = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px'
})

const AnnotationLinkCollapseContentSkeleton = () => {
  return (
    <>
      <Skeleton width="100%" height="120px" />
      <Skeleton width="100%" height="5px" count={3} />
      <Skeleton width="60%" height="5px" />
      <Skeleton width="70%" height="5px" />
    </>

  )
}

const AnnotationLinkCollapseContent = ({ candidate, fetchData }: AnnotationLinkCollapseContentProps) => {
  const { id, indexer } = candidate;
  const { data, isLoading } = useQuery(['annotation.getAnnotationDetails', { id, indexer }], {
    staleTime: Infinity,
    enabled: fetchData
  });

  return (
    <AnnotationLinkCollapseContainer>
      {data ? (
        <>
          {data.thumbnail && (
            <ImgContainer>
              <Image alt="" layout="fill" src={data.thumbnail.source} objectFit="cover" />
            </ImgContainer>
          )}
          <Text>
            {data.extract}
          </Text>
        </>
      ) : <AnnotationLinkCollapseContentSkeleton />}

    </AnnotationLinkCollapseContainer>
  )
}


type AnnotationLinkDetailsProps = {
  candidates: Candidate[] | undefined;
  selectedId?: string;
}

const AnnotationLinkDetails = ({ selectedId, candidates }: AnnotationLinkDetailsProps) => {
  const [open, setOpen] = useState<string | undefined>(undefined);

  const handleCollapseClick = (id: string) => {
    setOpen((s) => s === id ? undefined : id);
  }

  useEffect(() => {
    setOpen(selectedId);
  }, [selectedId]);

  // // sort candidates so that the matching candidate is on top
  // // then order by score
  // const orderedCandidates = useMemo(() => {
  //   if (!candidates) {
  //     return undefined;
  //   }
  //   return candidates.sort((a, b) => {
  //     if (getCandidateId(a) === selectedId) {
  //       return -1;
  //     }
  //     if (getCandidateId(b) === selectedId) {
  //       return 1;
  //     }
  //     return b.score - a.score;
  //   })
  // }, [candidates, selectedId]);

  return (
    <>
      <Text size={15} b>Links</Text>
      {candidates && candidates.length > 0 ? (
        <Collapse.Group css={{ padding: 0 }}>
          {candidates.map((candidate) => (
            <Collapse
              key={getCandidateId(candidate)}
              onClick={() => handleCollapseClick(getCandidateId(candidate))}
              expanded={open === getCandidateId(candidate)}
              css={{
                padding: 0,
                '& > div:first-of-type': {
                  padding: '10px 0'
                }
              }}
              title={(
                <Row>
                  {selectedId === getCandidateId(candidate) && <Checkbox isSelected aria-label="True candidate" />}
                  <Col>
                    <Link onClick={(event) => event.stopPropagation()} href={candidate.url} target="_blank"
                      css={{
                        lineHeight: 1.2,
                        fontSize: '14px',
                        display: 'inline-flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      {candidate.title}
                      <FiArrowUpRight />
                    </Link>
                    <Text size={12}>Score: {candidate.score.toFixed(2)}</Text>
                  </Col>
                </Row>
              )}>
              <AnnotationLinkCollapseContent candidate={candidate} fetchData={open === getCandidateId(candidate)} />
            </Collapse>
          ))}
        </Collapse.Group>
      ) : <Text css={{ color: 'rgba(0,0,0,0.6)', lineHeight: 1.2 }}>This annotation has not been linked to anything yet.</Text>}
    </>
  )
}

export default AnnotationLinkDetails;