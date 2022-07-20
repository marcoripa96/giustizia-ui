import { Annotation } from "@/lib/ner/core/types";
import { AdditionalAnnotationProps, EntityAnnotation } from "@/server/routers/document";
import styled from "@emotion/styled";
import { Text } from "@nextui-org/react"
import { darken } from "polished";
import { useMemo, useCallback } from "react";
import { selectDocumentTaxonomy, useSelector } from "../DocumentProvider/selectors";
import { getAllNodeData } from "../SidebarAddAnnotation/Tree";

type EntityContextProps = {
  text: string;
  annotation: EntityAnnotation;
}

const Tag = styled.span<{ color: string, level: number }>(({ color, level }) => ({
  position: 'relative',
  padding: `${level * 3}px 5px`,
  borderRadius: '6px',
  background: color,
  color: darken(0.70, color),
  cursor: 'pointer',
}));

const TagLabel = styled.span<{ color: string }>(({ color }) => ({
  fontSize: '11px',
  fontWeight: 600,
  textTransform: 'uppercase',
  marginLeft: '6px',
  padding: '0 3px',
  borderRadius: '4px',
  pointerEvents: 'none',
  background: darken(0.35, color),
  color: color,
  verticalAlign: 'middle'
}));


const EntityContext = ({ text, annotation }: EntityContextProps) => {
  const taxonomy = useSelector(selectDocumentTaxonomy);

  const context = useMemo(() => {
    const { start, end } = annotation;
    const startOffset = start - 50 < 0 ? 0 : start - 50;
    const endOffset = end + 50 > text.length ? text.length - end : end + 50;
    return {
      contextLeft: text.slice(startOffset, start),
      contextRight: text.slice(end, endOffset)
    }
  }, [text, annotation])


  const getTypesText = (ann: Annotation<AdditionalAnnotationProps>) => {
    const types = [ann.type, ...ann.features.types || []]
    const nMoreTypes = types.length - 1;
    if (nMoreTypes === 0) {
      return types[0];
    }
    return `${types[0]} +${nMoreTypes}`
  }


  const taxonomyNode = useMemo(() => {
    const types = [annotation.type, ...annotation.features.types || []];
    return getAllNodeData(taxonomy, types[0]);
  }, [annotation]);

  return (
    <Text size={14} css={{ fontStyle: 'italic', color: 'rgba(0,0,0,0.7)' }}>
      <span>{context.contextLeft === '' ? `${context.contextLeft}` : `"...${context.contextLeft}`}</span>
      <Tag color={taxonomyNode.color} level={0} >
        {annotation.features.mention}
        <TagLabel color={taxonomyNode.color}>
          {getTypesText(annotation)}
        </TagLabel>
      </Tag>
      <span>{context.contextRight === '' ? `${context.contextRight}` : `${context.contextRight}..."`}</span>
    </Text>
  )
}

export default EntityContext;