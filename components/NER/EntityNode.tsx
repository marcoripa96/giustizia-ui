import { getSpan } from "@/lib/ner/core";
import { Annotation, EntityNode } from "@/lib/ner/core/types";
import { ChildNodeWithColor } from "@/components/Tree";
import { AdditionalAnnotationProps, EntityAnnotation } from "@/server/routers/document";
import styled from "@emotion/styled";
import { Tooltip } from "@nextui-org/react";
import { darken } from "polished";
import { ReactNode, useCallback, useMemo, MouseEvent, useEffect, useState } from "react";
import { useNERContext } from "./nerContext";
import { FiX } from '@react-icons/all-files/fi/FiX';
import { keyframes } from "@emotion/react";

type EntityNodeProps = EntityNode<AdditionalAnnotationProps>

const pulse = keyframes`
0% {
  transform: scale(1);
}
25% {
  transform: scale(1.1);
}
50% {
  transform: scale(1);
}
75% {
  transform: scale(1.1);
}
100% {
  transform: scale(1);
}

`

const Tag = styled.span<{ color: string; highlight: boolean }>(({ color, highlight }) => ({
  display: 'inline-flex',
  gap: '5px',
  alignItems: 'center',
  position: 'relative',
  padding: '0px 5px',
  borderRadius: '6px',
  background: color,
  color: darken(0.70, color),
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  lineHeight: 1.3,
  border: `1px solid ${darken(0.05, color)}`,
  ...(highlight && {
    background: darken(0.1, color),
    animation: `${pulse} 1000ms ease-out`,
    zIndex: 9999
  }),
  '& > button': {
    background: darken(0.1, color),
    '&:hover': {
      background: darken(0.2, color),
    }
  },
  transition: 'background 500ms ease-out'
}));

const TagLabel = styled.span<{ color: string }>(({ color }) => ({
  fontSize: '11px',
  fontWeight: 600,
  textTransform: 'uppercase',
  padding: '0 3px',
  borderRadius: '4px',
  pointerEvents: 'none',
  background: darken(0.35, color),
  color: color,
  verticalAlign: 'middle'
}));

const DeleteButton = styled.button({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  fontSize: '12px',
  margin: 0,
  padding: '2px',
  borderRadius: '50%',
  cursor: 'pointer'
})

const getTypesText = (ann: Annotation<AdditionalAnnotationProps>) => {
  const types = [ann.type, ...ann.features.types || []]
  const nMoreTypes = types.length - 1;
  if (nMoreTypes === 0) {
    return types[0];
  }
  return `${types[0]} +${nMoreTypes}`
}


function EntityNode(props: EntityNodeProps) {
  const {
    text,
    start,
    annotation
  } = props;
  const [highlight, setHighlight] = useState(false);
  const { onTagClick, onTagEnter, onTagLeave, onTagDelete, getTaxonomyNode, renderContentHover, highlightAnnotation, showAnnotationDelete } = useNERContext();

  useEffect(() => {
    if (highlightAnnotation === annotation.id) {
      setHighlight(true);
      setTimeout(() => {
        setHighlight(false);
      }, 1000)
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

  const handleOnTagDelete = (ann: Annotation<AdditionalAnnotationProps>) => (event: MouseEvent) => {
    event.stopPropagation();

    if (onTagDelete) {
      onTagDelete(event, ann);
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
        {showAnnotationDelete && <DeleteButton onClick={handleOnTagDelete(annotation)}><FiX /></DeleteButton>}
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