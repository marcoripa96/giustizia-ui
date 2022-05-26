import { NERAnnotation } from "@/server/routers/document";
import styled from "@emotion/styled";
import { Button, Col, Divider, Text } from "@nextui-org/react";
import { useDocumentData } from "../DocumentProvider/selectors";
import TextAnnotationDetails from "./AnnotationTextDetails";
import AnnotationLinkDetails from "./AnnotationLinkDetails";

type AnnotationDetailsProps = {
  annotation: NERAnnotation;
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
})

const DetailsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '10px 14px',
  overflowY: 'scroll',
  '::-webkit-scrollbar': {
    height: '4px',
    width: '2px'
  },
  '::-webkit-scrollbar-thumb': {
    background: 'rgba(0,0,0,0.1)'
  }
})

const ButtonContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '10px'
})

const AnnotationDetails = ({ annotation }: AnnotationDetailsProps) => {
  const data = useDocumentData();
  const { top_wikipedia_id: id } = annotation;

  if (!data) {
    return null;
  }

  return (
    <Container>
      <DetailsContainer>
        <Col>
          <Text b size={18}>Annotation details</Text>
          <Text css={{ fontSize: '16px', lineHeight: '1', color: 'rgba(0,0,0,0.5)' }}>
            Inspect the details for a selected annotation.
          </Text>
        </Col>
        <Divider />
        <TextAnnotationDetails text={data.text} annotation={annotation} />
        <AnnotationLinkDetails selectedId={id} candidates={annotation.candidates} />
      </DetailsContainer>
      <ButtonContainer>
        <Button>Edit</Button>
      </ButtonContainer>
    </Container>
  )
}

export default AnnotationDetails;

