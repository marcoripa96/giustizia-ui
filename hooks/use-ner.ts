import { useMemo } from "react";

type UseNERProps<P> = {
  content: string;
  annotations: Annotation<P>[];
};

/**
 * An annotation has some required fields, but more can be added by the user (P).
 * Make it exportable so that the user can extend it.
 *
 * @example
 * type MyAnnotation = Annotation<{
 *  newField: number;
 * }>
 */
export type Annotation<P = {}> = {
  id: number;
  ner_type: string;
  start_pos: number;
  end_pos: number;
  mention: string;
} & P;

/**
 * Return type of the hook. props will be required when type === 'entity'
 */
type _Node<P> = {
  text: string;
  type: "text" | "entity";
  props?: Annotation<P>;
};

/**
 * This type makes what is described above possible. This is the actual return type.
 */
export type NERNode<P> = _Node<P>["type"] extends infer T
  ? T extends "entity"
  ? Required<_Node<P>> & { type: T }
  : _Node<P> & { type: T }
  : never;

export type AnnotationType = {
  label: string;
  color: string;
  children?: Record<string, Omit<AnnotationType, 'color'>>
};

export type AnnotationTypeMap = Record<string, AnnotationType>;

export const annotationTypes: AnnotationTypeMap = {
  PER: {
    label: 'Person',
    color: 'rgb(254, 202, 116)',
    children: {
      JUDGE: {
        label: 'Judge'
      }
    }
  },
  MISC: {
    label: 'Miscellaneous',
    color: 'rgb(97, 232, 225)',
  },
  DATE: {
    label: 'Date',
    color: 'rgb(170, 156, 252)',
  },
  LOC: {
    label: 'Location',
    color: 'rgb(191, 225, 217)',
  },
  ORG: {
    label: 'Organization',
    color: 'rgb(234, 193, 204)',
  },
};

function _buildNodes<P>(content: string, annotations: Annotation<P>[]): NERNode<P>[] {
  const nodes: NERNode<P>[] = [];
  let lastPosition = 0;

  annotations.forEach((annotation) => {
    const { id, start_pos, end_pos, ner_type } = annotation;
    // node of type text
    const textNode = content.slice(lastPosition, start_pos);
    // node of type entity
    const entityNode = content.slice(start_pos, end_pos);
    nodes.push({ text: textNode, type: "text" });
    nodes.push({
      text: entityNode,
      type: "entity",
      props: { ...annotation }
    });
    lastPosition = end_pos;
  });
  // finally add the last piece of text
  const textNode = content.slice(lastPosition, content.length);
  nodes.push({ text: textNode, type: 'text' });

  return nodes;
}

export function useNER<P = {}>({ content, annotations }: UseNERProps<P>) {
  const nodes = useMemo(() => _buildNodes(content, annotations), [
    content,
    annotations
  ]);

  return nodes;
}
