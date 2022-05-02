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
  id: number | string;
  ner_type: string;
  start_pos_original: number;
  end_pos_original: number;
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

function _buildNodes<P>(content: string, annotations: Annotation<P>[]) {
  const nodes: NERNode<P>[] = [];
  let lastPosition = 0;

  annotations.forEach((annotation) => {
    const { id, start_pos_original, end_pos_original, ner_type } = annotation;
    // node of type text
    const textNode = content.slice(lastPosition, start_pos_original);
    // node of type entity
    const entityNode = content.slice(start_pos_original, end_pos_original);
    nodes.push({ text: textNode, type: "text" });
    nodes.push({
      text: entityNode,
      type: "entity",
      props: { ...annotation }
    });
    lastPosition = end_pos_original;
  });

  return nodes;
}

export function useNER<P = {}>({ content, annotations }: UseNERProps<P>) {
  const nodes = useMemo(() => _buildNodes(content, annotations), [
    content,
    annotations
  ]);

  return nodes;
}
