import { Annotation } from "@/hooks/use-ner";
import { NERAnnotation } from "@/server/routers/document";
import styled from "@emotion/styled";
import { darken } from "polished";
import { PropsWithChildren, MouseEvent, FocusEvent } from "react";

type NERTagProps = PropsWithChildren<{
  annotation: NERAnnotation;
  onClick?: (event: MouseEvent, tag: Annotation) => void;
  onFocus?: (event: FocusEvent, tag: Annotation) => void;
}>;

type AnnotationType = Record<string, { label: string; color: string }>;

const annotationTypes: AnnotationType = {
  PER: {
    label: "Person",
    color: "rgb(254, 202, 116)"
  },
  MISC: {
    label: "Miscellaneous",
    color: "rgb(97, 232, 225)"
  },
  DATE: {
    label: "Date",
    color: "rgb(170, 156, 252)"
  },
  LOC: {
    label: "Location",
    color: "rgb(191, 225, 217)"
  },
  ORG: {
    label: "Organization",
    color: "rgb(234, 193, 204)"
  }
};

const Tag = styled.span<{ type: string }>(({ type }) => ({
  padding: "2px 5px",
  borderRadius: "6px",
  background: annotationTypes[type].color,
  transition: "background 250ms ease-out",
  cursor: "pointer",
  "&:hover": {
    background: darken(0.15, annotationTypes[type].color)
  }
}));

const TagLabel = styled.span(({ children }) => ({
  fontSize: "12px",
  fontWeight: 700,
  textTransform: "uppercase",
  marginLeft: "6px",
  padding: "0 3px",
  background: darken(0.1, annotationTypes[children as string].color),
  borderRadius: "4px",
  pointerEvents: "none"
}));

const getDefaultProp = () => ({});

/**
 * Component that shows a NER tag.
 */
function NERTag({
  annotation,
  children,
  onClick = getDefaultProp,
  onFocus = getDefaultProp,
  ...props
}: NERTagProps) {
  const { ner_type } = annotation;

  const handleClick = (event: MouseEvent) => onClick(event, annotation);
  const handleOnFocus = (event: FocusEvent) => onFocus(event, annotation);
  // this prevents click and focus to trigger at the same time
  const handleOnMouseDown = (event: MouseEvent) => event.preventDefault();

  return (
    <Tag
      tabIndex={0}
      onMouseDown={handleOnMouseDown}
      onClick={handleClick}
      onFocus={handleOnFocus}
      type={ner_type}
      {...props}
    >
      {children}
      <TagLabel>{ner_type}</TagLabel>
    </Tag>
  );
}

export default NERTag;
