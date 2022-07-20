import { Flex, useText } from "@/components";
import { EntityAnnotation } from "@/server/routers/document";
import styled from "@emotion/styled";
import { Text } from "@nextui-org/react";
import { scrollEntityIntoView } from "../DocumentProvider/utils";
import EntityContext from "./EntityContext";
import TypesHierarchy from "./TypesHierarchy";

type TextAnnotationDetails = {
  text: string;
  annotation: EntityAnnotation;
}

const TextAnnotationDetailsContainer = styled.button({
  textAlign: 'left',
  border: 'none',
  outline: 'none',
  padding: '5px',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background 250ms ease-out',
  background: 'rgba(0,0,0,0.04)',
  '&:hover': {
    background: 'rgba(0,0,0,0.06)'
  }
})


const TextAnnotationDetails = ({ text, annotation }: TextAnnotationDetails) => {
  const t = useText('document');

  const types = [annotation.type, ...annotation.features.types || []]

  return (
    <>
      <Text size={15} b>{t('rightSidebar.entityContext')}</Text>
      <TextAnnotationDetailsContainer onClick={() => scrollEntityIntoView(annotation.id)}>
        <EntityContext text={text} annotation={annotation} />
      </TextAnnotationDetailsContainer>
      <Text size={15} b>{t('rightSidebar.typeHierarchy')}</Text>
      {types.map((type, index) => (
        <Flex key={type} direction="row" alignItems="center" gap="5px">
          <Text size={11} b>{index + 1}.</Text>
          <TypesHierarchy type={type} />
        </Flex>
      ))}

    </>

  )
}

export default TextAnnotationDetails;