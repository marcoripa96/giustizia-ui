import { Tag, NERTag } from "@/components";
import { NERAnnotation } from "@/server/routers/document";
import styled from "@emotion/styled";
import { Text } from "@nextui-org/react";
import { FiArrowRight } from "@react-icons/all-files/fi/FiArrowRight";
import { useMemo, useCallback } from "react";
import { useDocumentTaxonomy, useDocumentCallbacks } from "../DocumentProvider/selectors";
import { getNodesPath, isParentNode, getAllNodeData } from "../SidebarAddAnnotation/Tree";

const ContainerTypesHierarchy = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
  flexWrap: 'wrap'
})


const TypesHierarchy = ({ type }: { type: string }) => {
  const taxonomy = useDocumentTaxonomy();
  const nodes = useMemo(() => getNodesPath(taxonomy, type), [type]);
  return (
    <ContainerTypesHierarchy>
      {nodes.map((node, index) => {
        if (isParentNode(node)) {
          return <Tag key={index} node={node} />
        }
        return (
          <ContainerTypesHierarchy key={index}>
            <FiArrowRight color="rgba(0,0,0,0.1)'" />
            <Tag node={{ ...node, color: 'rgba(0,0,0,0.05)' }} />
          </ContainerTypesHierarchy>
        )
      })}
    </ContainerTypesHierarchy>
  )
}

type TextAnnotationDetails = {
  text: string;
  annotation: NERAnnotation;
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
  const taxonomy = useDocumentTaxonomy();
  const { scrollEntityIntoView } = useDocumentCallbacks();

  const context = useMemo(() => {
    const { start_pos, end_pos } = annotation;
    const startOffset = start_pos - 50 < 0 ? 0 : start_pos - 50;
    const endOffset = end_pos + 50 > text.length ? text.length - end_pos : end_pos + 50;
    return {
      contextLeft: text.slice(startOffset, start_pos),
      contextRight: text.slice(end_pos, endOffset)
    }
  }, [text, annotation])

  const getTaxonomyNode = useCallback((key: string) => {
    const node = getAllNodeData(taxonomy, key);
    return node;
  }, [taxonomy]);

  return (
    <>
      <Text size={15} b>Enity context</Text>
      <TextAnnotationDetailsContainer onClick={() => scrollEntityIntoView(annotation.id)}>
        <Text size={14} css={{ fontStyle: 'italic', color: 'rgba(0,0,0,0.7)' }}>
          <span>{'"'}...{context.contextLeft}</span>
          <NERTag
            annotation={annotation}
            disableLink
            disablePreview
            getTaxonomyNode={getTaxonomyNode}
          >
            {annotation.mention}
          </NERTag>
          <span>{context.contextRight}...{'"'}</span>
        </Text>
      </TextAnnotationDetailsContainer>
      <Text size={15} b>Type hierarchy</Text>
      <TypesHierarchy type={annotation.ner_type} />
    </>

  )
}

export default TextAnnotationDetails;