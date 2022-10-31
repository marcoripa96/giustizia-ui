import useNER from "@/lib/ner/core/use-ner";
import { FlattenedTaxonomy } from "@/modules/document/DocumentProvider/types";
import { getAllNodeData } from "@/components/Tree";
import { EntityAnnotation, SectionAnnotation } from "@/server/routers/document";
import styled from "@emotion/styled";
import { useCallback, useMemo, MouseEvent, ReactNode } from "react";
import EntityNode from "./EntityNode";
import { NERContext } from "./nerContext";
import Section from "./Section";
import TextNode, { SelectionNode } from "./TextNode";

type NERProps = {
  text: string;
  entityAnnotations: EntityAnnotation[];
  sectionAnnotations?: SectionAnnotation[];
  taxonomy: FlattenedTaxonomy;
  highlightAnnotation?: number | null;
  isAddMode?: boolean;
  addSelectionColor?: string;
  showAnnotationDelete?: boolean;
  renderContentHover?: (annotation: EntityAnnotation) => ReactNode;
  onTextSelection?: (event: MouseEvent, node: SelectionNode) => void;
  onTagClick?: (event: MouseEvent, annotation: EntityAnnotation) => void;
  onTagEnter?: (event: MouseEvent, annotation: EntityAnnotation) => void;
  onTagLeave?: (event: MouseEvent, annotation: EntityAnnotation) => void;
  onTagDelete?: (event: MouseEvent, annotation: EntityAnnotation) => void;
}

const NodesContainer = styled.div({
  whiteSpace: 'pre-wrap',
  overflowWrap: 'break-word',
  wordBreak: 'break-word',
  lineHeight: 1.7,
})

const NER = ({ text, entityAnnotations, sectionAnnotations, taxonomy, ...props }: NERProps) => {
  const nodes = useNER({
    text,
    entities: entityAnnotations,
    sections: sectionAnnotations
  });

  const getTaxonomyNode = useCallback((key: string) => {
    const node = getAllNodeData(taxonomy, key);
    return node;
  }, [taxonomy]);

  const contextValue = useMemo(() => ({
    getTaxonomyNode,
    ...props
  }), [props, getTaxonomyNode])

  return (
    <NERContext.Provider value={contextValue}>
      <NodesContainer>
        {nodes.map((node) => {
          if (node.type === 'section') {
            return (
              <Section {...node}>
                {node.contentNodes.map(({ key, ...nodeProps }) => {
                  if (nodeProps.type === 'text') {
                    return <TextNode key={key} {...nodeProps} />
                  }
                  return <EntityNode key={key} {...nodeProps} />
                })}
              </Section>
            )
          }
          if (node.type === 'text') {
            return <TextNode {...node} />
          }
          const { key, ...props } = node;
          return <EntityNode key={key} {...props} />
        })}
      </NodesContainer>

    </NERContext.Provider>
  )
};

export default NER;