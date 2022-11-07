import { memo } from '@/utils/shared';
import {
  Annotation,
  ContentNode,
  EntityNode,
  SectionNode,
  TextNode,
} from './types';

/**
 * Order annotations by their start offset
 * 1. order by start
 * 2. for nested annotation put as first item the parent annotation
 */
export const orderAnnotations = <T>(annotations: Annotation<T>[]) => {
  return [...annotations].sort((a, b) => {
    if (a.start === b.start) {
      return b.end - a.end;
    }
    return a.start - b.start;
  });
};

/**
 * Get a span of text: text, start and end
 */
export const getSpan = (text: string, start: number, end: number) => {
  return {
    text: text.slice(start, end),
    start,
    end,
  };
};

/**
 * Create a text node
 */
export const createTextNode = <T>(
  text: string,
  annotation: Annotation<T>,
  textCursor: number,
  key: number
): TextNode => {
  return {
    type: 'text',
    key,
    ...getSpan(text, textCursor, annotation.start),
  };
};

/**
 * Create an entity node
 */
export const createEntityNode = <T>(
  text: string,
  annotation: Annotation<T>,
  key: number
): EntityNode<T> => {
  return {
    type: 'entity',
    key,
    ...getSpan(text, annotation.start, annotation.end),
    annotation,
  };
};

/**
 * Check if the last node and the next annotation are disjointed
 */
export const isDisjointedAnnotation = <T>(
  node: EntityNode<T>,
  ann: Annotation<T>
) => {
  return ann.start >= node.end;
};

/**
 * Check if the next annotation is nested in the last annotation
 */
export const isNestedAnnotation = <T>(
  prev: Annotation<T>,
  ann: Annotation<T>
) => {
  return (
    (ann.start >= prev.start && ann.end < prev.end) ||
    (ann.start > prev.start && ann.end <= prev.end)
  );
};

export const hasSameOffset = <T>(prev: Annotation<T>, ann: Annotation<T>) => {
  return ann.start == prev.start && ann.end === prev.end;
};

/**
 * Check if the next annotation is overlapping with the last annotation
 */
export const isOverlappingAnnotation = <T>(
  prev: Annotation<T>,
  ann: Annotation<T>
) => {
  return ann.start >= prev.start && ann.start <= prev.end && ann.end > prev.end;
};

/**
 * Create content nodes (entity and next nodes)
 * It currently supports disjointed, nested and multi type annotations
 */
export const createNodes = <T>(
  text: string,
  annotations: Annotation<T>[],
  textCursor = 0,
  textEndCursor = -1
) => {
  let nodes = [] as ContentNode<T>[];
  let index = 0;

  for (const ann of annotations) {
    // last node can only be undefined or be of type EnityNode
    const lastNode = nodes.at(-1) as EntityNode<T>;

    if (!lastNode || isDisjointedAnnotation(lastNode, ann)) {
      nodes.push(createTextNode(text, ann, textCursor, index));
      index += 1;
      nodes.push(createEntityNode(text, ann, index));
      index += 1;
      textCursor = ann.end;
    } else {
      const { annotation: prevAnn } = lastNode;

      if (isNestedAnnotation(prevAnn, ann)) {
        console.warn(
          `Encountered a nested annotation (currently not supported and discarded)`,
          prevAnn,
          ann
        );
      } else if (hasSameOffset(prevAnn, ann)) {
        console.warn(
          `Encountered multiple annotations with the same offset. One of them is discarded`,
          prevAnn,
          ann
        );
      } else {
        // overlapping annotations
        console.warn(
          `Encountered an overlapping annotation. Overlapping annotations are not supported and they are discarded`,
          prevAnn,
          ann
        );
      }
    }
  }
  // add last piece of text
  const end = textEndCursor === -1 ? text.length : textEndCursor;
  nodes.push({
    type: 'text',
    key: index,
    ...getSpan(text, textCursor, end),
  });

  return nodes;
};

export const createSectionNodes = <T, U>(
  text: string,
  sectionAnnotations: Annotation<U>[],
  entityAnnotations: Annotation<T>[]
): SectionNode<T, U>[] => {
  return sectionAnnotations.map((section, index) => {
    const sectionText = text.slice(section.start, section.end);

    // look where to slice the array of entities
    const startIndex = entityAnnotations.findIndex(
      (node) =>
        (section.start >= node.start && section.start <= node.end) ||
        (node.start >= section.start && node.start <= section.end)
    );
    let endIndex = entityAnnotations.findIndex(
      (node) => node.start > section.end
    );
    // it's possible that all annotations are included in the section offset
    endIndex = endIndex === -1 ? entityAnnotations.length : endIndex;

    let sectionEntities = entityAnnotations.slice(startIndex, endIndex);

    const contentNodes = createNodes(
      text,
      sectionEntities,
      section.start,
      section.end
    );

    return {
      type: 'section',
      key: index,
      text: sectionText,
      start: section.start,
      end: section.end,
      annotation: section,
      contentNodes,
    };
  });
};

/**
 * Get section with content nodes for each section
 */
export const getSectionNodesFactory = <T, U>(
  text: string,
  sectionAnnotations: Annotation<U>[],
  contentNodes: ContentNode<T>[]
) => {
  return memo(
    () => [text, sectionAnnotations, contentNodes],
    (text, sections, nodes) => {
      return sections.map((ann, index) => {
        // look where to slice the array of entities
        // const startIndex = nodes.findIndex((node) => node.start >= ann.start && node.start <= ann.end);
        const startIndex = nodes.findIndex(
          (node) =>
            (ann.start >= node.start && ann.start <= node.end) ||
            (node.start >= ann.start && node.start <= ann.end)
        );
        let endIndex = nodes.findIndex((node) => node.start > ann.end);
        // it's possible that all annotations are included in the section offset
        endIndex = endIndex === -1 ? nodes.length : endIndex;

        const sectionText = text.slice(ann.start, ann.end);
        let sectionNodes = nodes.slice(startIndex, endIndex);

        // only one node in the section
        if (sectionNodes.length === 1) {
          const n = sectionNodes[0];

          if (n.type === 'text') {
            sectionNodes = [
              {
                ...n,
                start: ann.start,
                end: ann.start + n.text.length,
                text: n.text.slice(ann.start - n.start, n.text.length),
              },
            ];
          }
        } else {
          let firstNodeSection = sectionNodes[0];
          let lastNodeSection = sectionNodes[sectionNodes.length - 1];

          if (index > 0 && firstNodeSection.type === 'text') {
            firstNodeSection = {
              ...firstNodeSection,
              start: ann.start,
              end: ann.start + firstNodeSection.text.length,
              text: firstNodeSection.text.slice(
                ann.start - firstNodeSection.start,
                firstNodeSection.text.length
              ),
            };
          }

          // if the last node of a section is a text node, slice to the end of the section
          if (lastNodeSection.type === 'text') {
            lastNodeSection = {
              ...lastNodeSection,
              end: ann.end,
              text: lastNodeSection.text.slice(
                0,
                ann.end - lastNodeSection.start
              ),
            };
          }

          sectionNodes = [
            firstNodeSection,
            ...nodes.slice(startIndex + 1, endIndex - 1),
            lastNodeSection,
          ];
        }

        return {
          key: index,
          text: sectionText,
          start: ann.start,
          end: ann.end,
          annotation: ann,
          contentNodes: sectionNodes,
        };
      }) as SectionNode<T, U>[];
    },
    {
      key: 'getSectionNodes',
    }
  );
};
