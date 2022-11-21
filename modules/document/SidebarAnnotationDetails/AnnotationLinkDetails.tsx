import { Annotation } from "@/lib/ner/core/types";
import { AdditionalAnnotationProps, Candidate } from "@/server/routers/document";
import styled from "@emotion/styled";
import { Collapse, Link, Text } from "@nextui-org/react";
import { useMemo } from "react";

type AnnotationLinkDetailsProps = {
  annotationFeatures: Annotation<AdditionalAnnotationProps>['features'] | undefined;
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
})

const Section = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

const List = styled(Container)({
  gap: '5px'
})

const ListItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: '5px',
  // alignItems: 'center'
})

const ListItemContent = styled.div({
  display: 'flex',
  flexDirection: 'column'
})

type ListAdditionalCandidatesProps = {
  candidates: Candidate[]
}

const ListAdditionalCandidates = ({ candidates }: ListAdditionalCandidatesProps) => {
  return (
    <Collapse
      title={<Text size={15}>{`Altri candidati`}</Text>}
      css={{
        padding: 0,
        '& > div:first-of-type': {
          padding: '10px 0'
        }
      }}>
      <List>
        {candidates.map((candidate, index) => (
          <ListItemContainer key={candidate.url}>
            <Text>{index + 1}.</Text>
            <ListItemContent>
              <Text>{candidate.title}</Text>
              <Text size={12} css={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <Link href={candidate.url}>
                  {candidate.url}
                </Link>
              </Text>
            </ListItemContent>

          </ListItemContainer>
        ))}

      </List>
    </Collapse>
  )
}

const AnnotationLinkDetails = ({ annotationFeatures }: AnnotationLinkDetailsProps) => {

  const candidates = useMemo(() => {
    if (!annotationFeatures
      || !annotationFeatures.additional_candidates
      || annotationFeatures.additional_candidates.length === 0) {
      return null;
    }
    return annotationFeatures.additional_candidates.filter((candidate) => candidate.url !== annotationFeatures.url);
  }, [annotationFeatures])

  if (!annotationFeatures) {
    return null;
  }

  const isNil = () => {
    let isNil = false;

    if (annotationFeatures.is_nil === undefined) {

      if (annotationFeatures.linking && annotationFeatures.linking.is_nil !== undefined) {
        isNil = annotationFeatures.linking.is_nil;
      }
    } else {
      isNil = annotationFeatures.is_nil;
    }
    return isNil;
  }

  return (
    <Container>
      <Text size={15} b>Informazioni Links</Text>
      <Section>
        {isNil() ? (
          <Text blockquote size={14} css={{ padding: '10px', margin: '0', background: '#fdf7d5' }}>
            {`L'annotazione è stata riconsociuta come una nuova entità non presente nella base di conoscenza.`}
          </Text>
        ) : (
          <>
            <Text>{annotationFeatures.title}</Text>
            <Text size={12}>
              <Link>
                {annotationFeatures.url}
              </Link>
            </Text>
          </>
        )}
      </Section >
      <Section>
        {candidates && <ListAdditionalCandidates candidates={candidates} />}
      </Section>
    </Container >
  )
};

export default AnnotationLinkDetails;