import { NERTag } from "@/components"
import { EntityAnnotation } from "@/server/routers/document";
import { Text } from "@nextui-org/react"
import { useMemo, useCallback } from "react";
import { selectDocumentTaxonomy, useSelector } from "../DocumentProvider/selectors";
import { getAllNodeData } from "../SidebarAddAnnotation/Tree";

type EntityContextProps = {
  text: string;
  annotation: EntityAnnotation;
}

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

  const getTaxonomyNode = useCallback((key: string) => {
    const node = getAllNodeData(taxonomy, key);
    return node;
  }, [taxonomy]);

  return (
    <Text size={14} css={{ fontStyle: 'italic', color: 'rgba(0,0,0,0.7)' }}>
      <span>{context.contextLeft === '' ? `${context.contextLeft}` : `"...${context.contextLeft}`}</span>
      <NERTag
        annotation={annotation}
        disableLink
        disablePreview
        getTaxonomyNode={getTaxonomyNode}
      >
        {annotation.features.mention}
      </NERTag>
      <span>{context.contextRight === '' ? `${context.contextRight}` : `${context.contextRight}..."`}</span>
    </Text>
  )
}

export default EntityContext;