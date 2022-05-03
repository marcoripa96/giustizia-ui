import { darken } from "polished";
import { ElementType, FC, HTMLAttributes, useState, MouseEvent } from "react";
import styled from '@emotion/styled';
import { annotationTypes } from "../NERDocumentViewer";
import { NERAnnotation } from "@/server/routers/document";

type AnnotationTagProps = HTMLAttributes<HTMLSpanElement> & {
  annotation: NERAnnotation;
}

type TagProps = {
  type: string;
}

const Tag = styled.span<TagProps>`
  padding: 2px 5px;
  border-radius: 6px;
  background: ${({ type }) => annotationTypes[type].color};
  transition: background 250ms ease-out;
  cursor: pointer;

  &:hover {
    background: ${({ type }) => darken(0.15, annotationTypes[type].color)}
  }
`

const AnnotationType = styled.span<TagProps>`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  margin-left: 6px;
  padding: 0 3px;
  background: ${({ type }) => darken(0.1, annotationTypes[type].color)};
  border-radius: 4px;
  pointer-events: none;
`

const AnnotationTag: FC<AnnotationTagProps> = ({ annotation, children, ...props }) => {
  const [isLinkAction, setIsLinkAction] = useState(false);
  const { ner_type, top_url } = annotation;

  const onMouseEnter = (event: MouseEvent) => {
    setIsLinkAction(event.ctrlKey || event.metaKey);
  }
  const onMouseLeave = (event: MouseEvent) => {
    setIsLinkAction(false);
  }

  const element: ElementType = isLinkAction ? 'a' : 'span';

  const tagProps = {
    as: element,
    type: ner_type,
    // so that div is selectable
    tabIndex: 0,
    onMouseEnter,
    onMouseLeave,
    ...(isLinkAction && { href: top_url, target: '_blank' }),
    ...props
  }

  return (
    <Tag {...tagProps}>
      {children}
      <AnnotationType type={ner_type}>{ner_type}</AnnotationType>
    </Tag>
  )
}

export default AnnotationTag;