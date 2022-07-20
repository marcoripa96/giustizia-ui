import useNER from "@/lib/ner/core/use-ner";
import { FlattenedTaxonomy } from "@/modules/document/DocumentProvider/types";
import { getAllNodeData } from "@/modules/document/SidebarAddAnnotation/Tree";
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
  isAddMode?: boolean;
  addSelectionColor?: string;
  renderContentHover?: (annotation: EntityAnnotation) => ReactNode;
  onTextSelection?: (event: MouseEvent, node: SelectionNode) => void;
  onTagClick?: (event: MouseEvent, annotation: EntityAnnotation) => void;
  onTagEnter?: (event: MouseEvent, annotation: EntityAnnotation) => void;
  onTagLeave?: (event: MouseEvent, annotation: EntityAnnotation) => void;
}

const NodesContainer = styled.div({
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  lineHeight: 1.7,
})

const NER = ({ text, entityAnnotations, sectionAnnotations, taxonomy, ...props }: NERProps) => {
  const { contentNodes, getSections } = useNER({
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
      {sectionAnnotations
        ? getSections().map(({ contentNodes, key, ...sectionProps }) => (
          <Section key={key} {...sectionProps}>
            {contentNodes.map(({ key, ...nodeProps }) => {
              if (nodeProps.type === 'text') {
                return <TextNode key={key} {...nodeProps} />
              }
              return <EntityNode key={key} {...nodeProps} />
            })}
          </Section>
        ))
        : (
          <NodesContainer>
            {contentNodes.map(({ key, ...nodeProps }) => {
              if (nodeProps.type === 'text') {
                return <TextNode key={key} {...nodeProps} />
              }
              return <EntityNode key={key} {...nodeProps} />
            })}
          </NodesContainer>
        )}
    </NERContext.Provider>
  )
};

export default NER;