import styled from '@emotion/styled';
import { darken } from 'polished';
import { PropsWithChildren, MouseEvent, FocusEvent, useRef } from 'react';
import { FaLink } from '@react-icons/all-files/fa/FaLink';
import { Tooltip, TooltipProps } from '@nextui-org/react';
import { EntityCard } from '../EntityCard';
import { ChildNodeWithColor } from '@/modules/document/SidebarAddAnnotation/Tree';
import { EntityAnnotation } from '@/server/routers/document';

type NERTagProps = PropsWithChildren<{
  annotation: EntityAnnotation;
  getTaxonomyNode: (key: string) => ChildNodeWithColor;
  tooltipPlacement?: TooltipProps['placement'],
  disableLink?: boolean,
  disablePreview?: boolean,
  onClick?: (event: MouseEvent, tag: EntityAnnotation) => void;
  onFocus?: (event: FocusEvent, tag: EntityAnnotation) => void;
}>;

const Tag = styled.span<{ id: string; node: ChildNodeWithColor }>(({ node }) => ({
  position: 'relative',
  padding: '2px 5px',
  borderRadius: '6px',
  background: node.color,
  color: darken(0.70, node.color),
  cursor: 'pointer',
}));

const TagLabel = styled.span<{ node: ChildNodeWithColor }>(({ node }) => ({
  fontSize: '11px',
  fontWeight: 600,
  textTransform: 'uppercase',
  marginLeft: '6px',
  padding: '0 3px',
  borderRadius: '4px',
  pointerEvents: 'none',
  background: darken(0.35, node.color),
  color: node.color
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
  getTaxonomyNode,
  children,
  tooltipPlacement = 'top',
  disableLink = false,
  disablePreview = false,
  onClick = getDefaultProp,
  onFocus = getDefaultProp,
  ...props
}: NERTagProps) {
  const {
    type,
    features: {
      linking: {
        top_candidate
      }
    }
  } = annotation;

  const handleClick = (event: MouseEvent) => onClick(event, annotation);
  const handleOnFocus = (event: FocusEvent) => onFocus(event, annotation);
  // this prevents click and focus to trigger at the same time
  const handleOnMouseDown = (event: MouseEvent) => event.preventDefault();

  const component = !disableLink && top_candidate ? 'a' : 'span';

  const componentTagProps = {
    ...(!disableLink && top_candidate && {
      href: top_candidate.url,
      target: '_blank',
    }),
    ...props,
  };

  const node = getTaxonomyNode(type);

  const TagComponent = (
    <Tag
      id={`entity-tag-${annotation.id}`}
      as={component}
      tabIndex={0}
      onMouseDown={handleOnMouseDown}
      onClick={handleClick}
      onFocus={handleOnFocus}
      node={node}
      {...componentTagProps}
    >
      {children}
      <TagLabel node={node}>{node.key}</TagLabel>
      {top_candidate && <Icon />}
    </Tag>
  )

  if (!disablePreview && top_candidate) {
    return (
      <Tooltip css={{ display: 'inline-block' }}
        placement={tooltipPlacement} content={<EntityCard annotation={annotation} node={node} />}>
        {TagComponent}
      </Tooltip>
    )
  }

  return TagComponent;
}

export default NERTag;
