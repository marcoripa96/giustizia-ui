import { Annotation, useNER } from '@/hooks/use-ner';
import styled from '@emotion/styled';
import { TooltipProps } from '@nextui-org/react';
import { NERTag } from '../NERTag';
import { MouseEvent, FocusEvent, useCallback } from 'react';
import { FlattenedTaxonomy } from '@/modules/document/DocumentProvider/types';
import { NERAnnotation } from '@/server/routers/document';
import { getAllNodeData } from '@/modules/document/SidebarAddAnnotation/Tree';

type NERViewerProps = {
  taxonomy: FlattenedTaxonomy;
  content: string;
  annotations: NERAnnotation[];
  disableLink?: boolean;
  disablePreview?: boolean;
  tooltipPlacement?: TooltipProps['placement'],
  onTagClick?: (event: MouseEvent, tag: Annotation) => void;
  onTagFocus?: (event: FocusEvent, tag: Annotation) => void;
};

const Container = styled.div({
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  lineHeight: 1.7,
});

const getDefaultProp = () => ({});

function NERViewer<P>({
  taxonomy,
  content,
  annotations,
  tooltipPlacement = 'top',
  disableLink = false,
  disablePreview = false,
  onTagClick = getDefaultProp,
  onTagFocus = getDefaultProp
}: NERViewerProps) {
  const nodes = useNER({ content, annotations });

  const getTaxonomyNode = useCallback((key: string) => {
    const node = getAllNodeData(taxonomy, key);
    return node;
  }, [taxonomy]);

  return (
    <Container>
      {nodes.map((node) =>
        node.type === 'text' ? (
          node.text
        ) : (
          <NERTag
            key={node.props.id}
            annotation={node.props}
            disableLink={disableLink}
            tooltipPlacement={tooltipPlacement}
            disablePreview={disablePreview}
            onClick={onTagClick}
            onFocus={onTagFocus}
            getTaxonomyNode={getTaxonomyNode}
          >
            {node.text}
          </NERTag>
        )
      )}
    </Container>
  );
}

export default NERViewer;
