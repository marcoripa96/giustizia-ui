/**
 * Identifies an annotation
 */
export type Annotation<T = {}> = {
  // id of an annotation
  id: number;
  // start offset
  start: number;
  // end offset
  end: number;
  // the type of the annotation
  type: string;
  // additional features for this annotation
  features: T;
};

export type ContentNode<T> = EntityNode<T> | TextNode;

export type TextNode = {
  type: 'text',
  key: number;
  text: string;
  start: number;
  end: number;
}

export type NestedEntity = {
  typesMap: Record<string, number>;
  types: string[];
  // first annotation
  // annotationId: number;
  // type: string;
  // moreTypes: Set<> {
  //   annotationId: number;
  //   type: string;
  // }[]
  // [annotationId: number]: string[]
  // type: string;
  // // id of the annotation so that I can go back to it
  // annotationId: number;
}

export type EntityNode<T> = {
  // type of the node so that typescript can discriminate between nodes
  type: 'entity';
  // id of the node
  key: number;
  // text for this node
  text: string;
  // start offset of the node
  start: number;
  // end offset of the node
  end: number;
  // annotations contained in this node as a map
  annotations: Record<number, Annotation<T>>;
  // annotation ids
  nesting: NestedEntity[];
  // types for the nodes (multi type annotations)
  // types: EntityNodeType
}

export type SectionNode<T, U> = {
  key: number;
  text: string;
  start: number;
  end: number;
  annotation: Annotation<U>;
  contentNodes: ContentNode<T>[];
}

export type DocumentNER = {

}