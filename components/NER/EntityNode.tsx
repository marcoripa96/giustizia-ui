import { getSpan } from "@/lib/ner/core";
import { Annotation, EntityNode, NestedEntity } from "@/lib/ner/core/types";
import { ChildNodeWithColor } from "@/modules/document/SidebarAddAnnotation/Tree";
import { AdditionalAnnotationProps, EntityAnnotation } from "@/server/routers/document";
import styled from "@emotion/styled";
import { darken } from "polished";
import { ReactNode, useCallback, useMemo, MouseEvent } from "react";
import { useNERContext } from "./nerContext";

type EntityNodeProps = EntityNode<AdditionalAnnotationProps>

const Tag = styled.span<{ color: string, level: number }>(({ color, level }) => ({
  position: 'relative',
  padding: `${level * 3}px 5px`,
  borderRadius: '6px',
  background: color,
  color: darken(0.70, color),
  cursor: 'pointer',
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

const getTypesText = (entity: NestedEntity) => {
  const nMoreTypes = entity.types.length - 1;
  if (nMoreTypes === 0) {
    return entity.types[0];
  }
  return `${entity.types[0]} +${nMoreTypes}`
}

const getNestedAnnotation = (annotations: Record<number, Annotation<AdditionalAnnotationProps>>, entity: NestedEntity) => {
  const { typesMap, types } = entity;
  const annotationId = typesMap[types[0]];
  return annotations[annotationId];
}


const getNestedEntity = (nesting: NestedEntity[], index: number) => {
  return nesting[index];
}

const getPreviousNestedAnnotation = (annotations: Record<number, Annotation<AdditionalAnnotationProps>>, nesting: NestedEntity[], index: number) => {
  const prevNestedEntity = getNestedEntity(nesting, index - 1);
  const prevAnnotationId = prevNestedEntity.typesMap[prevNestedEntity.types[0]];
  return annotations[prevAnnotationId];
}


function EntityNode(props: EntityNodeProps) {
  const {
    text,
    start,
    annotations,
    nesting
  } = props;

  const { onTagClick, onTagEnter, onTagLeave, getTaxonomyNode } = useNERContext();

  const handleTagClick = (entity: NestedEntity) => (event: MouseEvent) => {
    event.stopPropagation();

    if (onTagClick) {
      const ann = getNestedAnnotation(annotations, entity);
      onTagClick(event, ann);
    }
  }

  const handleOnTagEnter = (entity: NestedEntity) => (event: MouseEvent) => {
    event.stopPropagation();

    if (onTagEnter) {
      const ann = getNestedAnnotation(annotations, entity);
      onTagEnter(event, ann);
    }
  }

  const handleOnTagLeave = (entity: NestedEntity) => (event: MouseEvent) => {
    event.stopPropagation();

    if (onTagLeave) {
      const ann = getNestedAnnotation(annotations, entity);
      onTagLeave(event, ann);
    }
  }

  /**
   * Get a tag element
   */
  const getTag = ({
    index,
    color,
    children,
    entity
  }: {
    index: number
    color: string;
    children: ReactNode;
    entity: NestedEntity;
  }) => {
    return (
      <Tag
        color={color}
        level={index}
        onClick={handleTagClick(entity)}
        onMouseEnter={handleOnTagEnter(entity)}
        onMouseLeave={handleOnTagLeave(entity)}>
        {children}
        <TagLabel color={color}>
          {getTypesText(entity)}
        </TagLabel>
      </Tag>
    )
  }

  /**
   * Build an entity tag by constructing its nested entities
   */
  const recurseTag = useCallback((): ReactNode => {
    let children: ReactNode = null;

    nesting.forEach((entity, index) => {
      const curr = getNestedAnnotation(annotations, entity);
      const { color } = getTaxonomyNode(curr.type);

      if (index === 0) {
        const textStart = curr.start - start;
        const textEnd = textStart + (curr.end - curr.start);
        const { text: span } = getSpan(text, textStart, textEnd);
        children = getTag({
          index,
          color,
          entity,
          children: span
        })
      } else {
        const prev = getPreviousNestedAnnotation(annotations, nesting, index);
        const leftSpan = getLeftText(text, prev, curr, start);
        const rightSpan = getRightText(text, prev, curr, start);
        children = getTag({
          index,
          color,
          entity,
          children: (
            <>
              {leftSpan}{children}{rightSpan}
            </>
          )
        })
      }
    });

    return children;
  }, [props])


  // memoized the tag recursion so that it runs only when the tag prop changes
  const tagContent = useMemo(() => recurseTag(), [recurseTag]);

  return (
    <>
      {tagContent}
    </>
  )
};

export default EntityNode;