import { Annotation, useNER } from '@/hooks/use-ner';
import styled from '@emotion/styled';
import { TooltipProps } from '@nextui-org/react';
import { NERTag } from '../NERTag';
import { MouseEvent, FocusEvent } from 'react';

type NERViewerProps<P> = {
  content: string;
  annotations: Annotation<P>[];
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
  content,
  annotations,
  tooltipPlacement = 'top',
  disableLink = false,
  disablePreview = false,
  onTagClick = getDefaultProp,
  onTagFocus = getDefaultProp
}: NERViewerProps<P>) {
  const nodes = useNER({ content, annotations });

  return (
    <Container>
      {nodes.map((node) =>
        node.type === 'text' ? (
          node.text
        ) : (
          <NERTag
            onClick={onTagClick}
            onFocus={onTagFocus}
            disableLink={disableLink}
            tooltipPlacement={tooltipPlacement}
            disablePreview={disablePreview}
            key={node.props.id}
            annotation={node.props}>
            {node.text}
          </NERTag>
        )
      )}
    </Container>
  );
}

export default NERViewer;
