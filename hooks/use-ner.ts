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
  key: number;
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

// export type AnnotationType = {
//   label: string;
//   color: string;
//   children?: Record<string, Omit<AnnotationType, 'color'>>
// };

// export type AnnotationTypeMap = Record<string, AnnotationType>;

function _buildNodes<P>(content: string, annotations: Annotation<P>[]): NERNode<P>[] {
  const nodes: NERNode<P>[] = [];
  let lastPosition = 0;
  let index = 0;

  annotations.forEach((annotation) => {
    const { start_pos, end_pos } = annotation;
    // node of type text
    const textNode = content.slice(lastPosition, start_pos);
    // node of type entity
    const entityNode = content.slice(start_pos, end_pos);
    nodes.push({ key: index, text: textNode, type: "text" });
    index += 1;
    nodes.push({
      key: index,
      text: entityNode,
      type: "entity",
      props: { ...annotation }
    });
    index += 1;
    lastPosition = end_pos;
  });
  // finally add the last piece of text
  const textNode = content.slice(lastPosition, content.length);
  nodes.push({ key: index, text: textNode, type: 'text' });

  return nodes;
}

export function useNER<P = {}>({ content, annotations }: UseNERProps<P>) {
  const nodes = useMemo(() => _buildNodes(content, annotations), [
    content,
    annotations
  ]);

  return nodes;
}
