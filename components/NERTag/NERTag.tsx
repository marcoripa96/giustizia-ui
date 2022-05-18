import { Annotation, annotationTypes } from '@/hooks/use-ner';
import { NERAnnotation } from '@/server/routers/document';
import styled from '@emotion/styled';
import { darken } from 'polished';
import { PropsWithChildren, MouseEvent, FocusEvent } from 'react';
import { FaLink } from '@react-icons/all-files/fa/FaLink';
import { Tooltip, TooltipProps } from '@nextui-org/react';
import { EntityCard } from '../EntityCard';

type NERTagProps = PropsWithChildren<{
  annotation: NERAnnotation;
  tooltipPlacement?: TooltipProps['placement'],
  disableLink?: boolean,
  disablePreview?: boolean,
  onClick?: (event: MouseEvent, tag: Annotation) => void;
  onFocus?: (event: FocusEvent, tag: Annotation) => void;
}>;

const Tag = styled.span<{ type: string }>(({ type }) => ({
  padding: '2px 5px',
  borderRadius: '6px',
  background: annotationTypes[type].color,
  transition: 'background 250ms ease-out',
  cursor: 'pointer',
  '&:hover': {
    background: darken(0.15, annotationTypes[type].color),
  },
}));

const TagLabel = styled.span(({ children }) => ({
  fontSize: '12px',
  fontWeight: 700,
  textTransform: 'uppercase',
  marginLeft: '6px',
  padding: '0 3px',
  // background: darken(0.1, annotationTypes[children as string].color),
  borderRadius: '4px',
  pointerEvents: 'none',
}));

const Icon = styled(FaLink)({
  width: '12px',
  height: '12px',
});

const getDefaultProp = () => ({});

/**
 * Component that shows a NER tag.
 */
function NERTag({
  annotation,
  children,
  tooltipPlacement = 'top',
  disableLink = false,
  disablePreview = false,
  onClick = getDefaultProp,
  onFocus = getDefaultProp,
  ...props
}: NERTagProps) {
  const { ner_type, top_url, top_wikipedia_id } = annotation;

  const handleClick = (event: MouseEvent) => onClick(event, annotation);
  const handleOnFocus = (event: FocusEvent) => onFocus(event, annotation);
  // this prevents click and focus to trigger at the same time
  const handleOnMouseDown = (event: MouseEvent) => event.preventDefault();

  const component = top_url ? 'a' : 'span';

  const componentTagProps = {
    ...(!disableLink && top_url && {
      href: top_url,
      target: '_blank',
    }),
    ...props,
  };

  const TagComponent = (
    <Tag
      as={component}
      tabIndex={0}
      onMouseDown={handleOnMouseDown}
      onClick={handleClick}
      onFocus={handleOnFocus}
      type={ner_type}
      {...componentTagProps}
    >
      {children}
      <TagLabel>{ner_type}</TagLabel>
      {top_url && <Icon />}
    </Tag>
  )

  if (!disablePreview && top_wikipedia_id !== -1) {
    return (
      <Tooltip css={{ display: 'inline-block' }}
        placement={tooltipPlacement} content={top_wikipedia_id ? <EntityCard annotation={annotation} /> : 'Empty'}>
        {TagComponent}
      </Tooltip>
    )
  }

  return TagComponent;
}

export default NERTag;
