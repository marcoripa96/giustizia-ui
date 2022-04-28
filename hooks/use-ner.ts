import { useMemo } from "react";

type UseNERProps<P> = {
  content: string;
  annotations: Annotation<P>[];
};

export type Annotation<P> = {
  id: number;
  ner_type: string;
  start_pos_original: number;
  end_pos_original: number;
  mention: string;
} & P;

type Node<P> = {
  text: string;
  type: "text" | "entity";
  props?: Annotation<P>;
};

export type NodeUnion<P> =
  | Node<P>["type"] extends infer T
  ? T extends any
  ? T extends 'entity'
  ? Required<Node<P>> & { type: T }
  : Node<P> & { type: T }
  : never
  : never

export type EntitySpecificProps = {
  id: string;
}

function _buildNodes<P>(content: string, annotations: Annotation<P>[]) {
  const nodes: NodeUnion<P>[] = [];
  let lastPosition = 0;

  annotations.forEach((annotation) => {
    const { id, start_pos_original, end_pos_original } = annotation;
    // node of type text
    const textNode = content.slice(lastPosition, start_pos_original);
    // node of type entity
    const entityNode = content.slice(start_pos_original, end_pos_original);
    nodes.push({ text: textNode, type: "text" });
    nodes.push({
      text: entityNode,
      type: "entity",
      props: { key: id, ...annotation }
    });

    lastPosition = end_pos_original;
  });

  return nodes;
}

function useNER<P = {}>({ content, annotations }: UseNERProps<P>) {
  const nodes = useMemo(() => _buildNodes(content, annotations), [
    content,
    annotations
  ]);

  return nodes;
}

export default useNER;
