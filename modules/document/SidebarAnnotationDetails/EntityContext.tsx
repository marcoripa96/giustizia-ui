import { NERTag } from "@/components"
import { NERAnnotation } from "@/server/routers/document";
import { Text } from "@nextui-org/react"
import { useMemo, useCallback } from "react";
import { selectDocumentTaxonomy, useSelector } from "../DocumentProvider/selectors";
import { getAllNodeData } from "../SidebarAddAnnotation/Tree";

type EntityContextProps = {
  text: string;
  annotation: NERAnnotation;
}

const EntityContext = ({ text, annotation }: EntityContextProps) => {
  const taxonomy = useSelector(selectDocumentTaxonomy);

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
    <Text size={14} css={{ fontStyle: 'italic', color: 'rgba(0,0,0,0.7)' }}>
      <span>{context.contextLeft === '' ? `${context.contextLeft}` : `"...${context.contextLeft}`}</span>
      <NERTag
        annotation={annotation}
        disableLink
        disablePreview
        getTaxonomyNode={getTaxonomyNode}
      >
        {annotation.mention}
      </NERTag>
      <span>{context.contextRight === '' ? `${context.contextRight}` : `${context.contextRight}..."`}</span>
    </Text>
  )
}

export default EntityContext;