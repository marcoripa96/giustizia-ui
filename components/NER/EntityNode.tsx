import { getSpan } from "@/lib/ner/core";
import { Annotation, EntityNode } from "@/lib/ner/core/types";
import { ChildNodeWithColor } from "@/components/Tree";
import { AdditionalAnnotationProps, EntityAnnotation } from "@/server/routers/document";
import styled from "@emotion/styled";
import { Tooltip } from "@nextui-org/react";
import { darken } from "polished";
import { ReactNode, useCallback, useMemo, MouseEvent, useEffect, useState } from "react";
import { useNERContext } from "./nerContext";

type EntityNodeProps = EntityNode<AdditionalAnnotationProps>

const Tag = styled.span<{ color: string; highlight: boolean }>(({ color, highlight }) => ({
  position: 'relative',
  padding: '0px 5px',
  borderRadius: '6px',
  background: color,
  color: darken(0.70, color),
  cursor: 'pointer',
  border: `1px solid ${darken(0.05, color)}`,
  ...(highlight && {
    background: darken(0.1, color)
  }),
  transition: 'background 250ms ease-out, transform 250ms ease-out'
}));

const TagLabel = styled.span<{ color: string }>(({ color }) => ({
  fontSize: '11px',
  fontWeight: 600,
  textTransform: 'uppercase',
  marginLeft: '6px',
  padding: '0 3px',
  borderRadius: '4px',
  pointerEvents: 'none',
  background: darken(0.35, color),
  color: color,
  verticalAlign: 'middle'
}));

const getLeftText = (
  text: string,
  prev: Annotation<AdditionalAnnotationProps>,
  curr: Annotation<AdditionalAnnotationProps>,
  start: number
) => {
  const textStart = curr.start - start;
  const textEnd = prev.start - curr.start;
  const { text: span } = getSpan(text, textStart, textEnd);
  return span;
}

const getRightText = (
  text: string,
  prev: Annotation<AdditionalAnnotationProps>,
  curr: Annotation<AdditionalAnnotationProps>,
  start: number
) => {
  const textStart = prev.end - start;
  const textEnd = textStart + (curr.end - prev.end);
  const { text: span } = getSpan(text, textStart, textEnd);
  return span;
}

const getTypesText = (ann: Annotation<AdditionalAnnotationProps>) => {
  const types = [ann.type, ...ann.features.types || []]
  const nMoreTypes = types.length - 1;
  if (nMoreTypes === 0) {
    return types[0];
  }
  return `${types[0]} +${nMoreTypes}`
}

const getPreviousNestedAnnotation = (annotations: Record<number, Annotation<AdditionalAnnotationProps>>, nesting: number[], index: number) => {
  const entityId = nesting[index - 1];
  return annotations[entityId]
}


function EntityNode(props: EntityNodeProps) {
  const {
    text,
    start,
    annotation
  } = props;
  const [highlight, setHighlight] = useState(false);
  const { onTagClick, onTagEnter, onTagLeave, getTaxonomyNode, renderContentHover, highlightAnnotation } = useNERContext();

  useEffect(() => {
    if (highlightAnnotation === annotation.id) {
      setHighlight(true);
      setTimeout(() => {
        setHighlight(false);
      }, 500)
    }
  }, [highlightAnnotation])

  const handleTagClick = (ann: Annotation<AdditionalAnnotationProps>) => (event: MouseEvent) => {
    event.stopPropagation();

    if (onTagClick) {
      onTagClick(event, ann);
    }
  }

  const handleOnTagEnter = (ann: Annotation<AdditionalAnnotationProps>) => (event: MouseEvent) => {
    event.stopPropagation();

    if (onTagEnter) {
      onTagEnter(event, ann);
    }
  }

  const handleOnTagLeave = (ann: Annotation<AdditionalAnnotationProps>) => (event: MouseEvent) => {
    // event.stopPropagation();

    if (onTagLeave) {
      onTagLeave(event, ann);
    }
  }

  const { color } = useMemo(() => getTaxonomyNode(annotation.type), [annotation]);

  /**
   * Get a tag element
   */
  const getTag = ({
    color,
    children,
    annotation
  }: {
    color: string;
    children: ReactNode;
    annotation: Annotation<AdditionalAnnotationProps>;
  }) => {
    const tagElement = (
      <Tag
        id={`entity-tag-${annotation.id}`}
        highlight={highlight}
        color={color}
        onClick={handleTagClick(annotation)}
        onMouseEnter={handleOnTagEnter(annotation)}
        onMouseLeave={handleOnTagLeave(annotation)}>
        {children}
        <TagLabel color={color}>
          {getTypesText(annotation)}
        </TagLabel>
      </Tag>
    )

    if (renderContentHover) {
      return (
        <Tooltip css={{ display: 'inline-block' }}
          placement="top" content={renderContentHover(annotation)}>
          {tagElement}
        </Tooltip>
      )
    }

    return tagElement;
  }

  /**
   * Build an entity tag by constructing its nested entities
   */
  // const recurseTag = useCallback((): ReactNode => {
  //   let children: ReactNode = null;

  //   nesting.forEach((entityId, index) => {
  //     const curr = annotations[entityId];
  //     const { color } = getTaxonomyNode(curr.type);

  //     if (index === 0) {
  //       const textStart = curr.start - start;
  //       const textEnd = textStart + (curr.end - curr.start);
  //       const { text: span } = getSpan(text, textStart, textEnd);
  //       children = getTag({
  //         index,
  //         color,
  //         children: span,
  //         annotation: curr
  //       })
  //     } else {
  //       const prev = getPreviousNestedAnnotation(annotations, nesting, index);
  //       const leftSpan = getLeftText(text, prev, curr, start);
  //       const rightSpan = getRightText(text, prev, curr, start);
  //       children = getTag({
  //         index,
  //         color,
  //         annotation: curr,
  //         children: (
  //           <>
  //             {leftSpan}{children}{rightSpan}
  //           </>
  //         )
  //       })
  //     }
  //   });

  //   return children;
  // }, [props])


  // memoized the tag recursion so that it runs only when the tag prop changes
  // const tagContent = useMemo(() => recurseTag(), [recurseTag]);

  return (
    <>
      {getTag({ color, annotation, children: text })}
    </>
  )
};

export default EntityNode;