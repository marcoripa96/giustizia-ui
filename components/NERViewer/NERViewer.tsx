import { Annotation, useNER } from '@/hooks/use-ner';
import styled from '@emotion/styled';
import { TooltipProps } from '@nextui-org/react';
import { NERTag } from '../NERTag';
import { MouseEvent, FocusEvent, useCallback } from 'react';
import { FlattenedTaxonomy } from '@/modules/document/DocumentProvider/types';
import { NERAnnotation } from '@/server/routers/document';
import { getAllNodeData } from '@/modules/document/SidebarAddAnnotation/Tree';
import { getNodeSelectionOffset, getOriginalOffset, getTextSelection } from './utils';

type NERViewerProps = {
  taxonomy: FlattenedTaxonomy;
  content: string;
  annotations: NERAnnotation[];
  addMode?: boolean;
  addSelectionColor?: string;
  disableLink?: boolean;
  disablePreview?: boolean;
  tooltipPlacement?: TooltipProps['placement'],
  onTagClick?: (event: MouseEvent, tag: Annotation) => void;
  onTagFocus?: (event: FocusEvent, tag: Annotation) => void;
  onTextSelection?: (event: MouseEvent, node: SelectionNode) => void;
};

export type SelectionNode = {
  text: string;
  startOffset: number;
  endOffset: number;
}

const Container = styled.div({
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  lineHeight: 1.7,

});

const TextNode = styled.span<{ selectionColor: string }>(({ selectionColor }) => ({
  ...(selectionColor && {
    '::selection': {
      background: selectionColor
    }
  })
}));

const getDefaultProp = () => ({});

function NERViewer({
  taxonomy,
  content,
  annotations,
  tooltipPlacement = 'top',
  addSelectionColor = '',
  addMode = false,
  disableLink = false,
  disablePreview = false,
  onTagClick = getDefaultProp,
  onTagFocus = getDefaultProp,
  onTextSelection = getDefaultProp
}: NERViewerProps) {
  const nodes = useNER({ content, annotations });

  /**
   * Get the node from the taxonomy so that I have all info for a certain type
   */
  const getTaxonomyNode = useCallback((key: string) => {
    const node = getAllNodeData(taxonomy, key);
    return node;
  }, [taxonomy]);


  /**
   * Handle text selection
   */
  const handleMouseUp = (event: MouseEvent, nodeKey: number) => {
    if (!addMode || !onTextSelection) return;
    // get user text selection
    const selection = getTextSelection();
    if (!selection) {
      return;
    }
    // get offset of what it is selected inside the node where the selection happens
    const nodeSelectionOffset = getNodeSelectionOffset(selection);
    if (!nodeSelectionOffset) {
      return;
    }
    // get the offset to the original text
    const offset = getOriginalOffset({ nodes, nodeKey, ...nodeSelectionOffset })
    const text = selection.toString();
    const selectionNode = { text, ...offset }
    onTextSelection(event, selectionNode);
  }

  return (
    <Container>
      {nodes.map((node) =>
        node.type === 'text' ? (
          <TextNode
            key={node.key}
            selectionColor={addSelectionColor}
            onMouseUp={(e) => handleMouseUp(e, node.key)}>
            {node.text}
          </TextNode>
        ) : (
          <NERTag
            key={node.key}
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
