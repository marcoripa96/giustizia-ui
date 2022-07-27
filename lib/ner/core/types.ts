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
  features: AnnotationFeatures<T>;
};

export type AnnotationFeatures<T> = T & {
  types?: string[];
}

export type ContentNode<T> = EntityNode<T> | TextNode;

export type TextNode = {
  type: 'text';
  key: number;
  text: string;
  start: number;
  end: number;
}

export type EntityNode<T> = {
  // type of the node so that typescript can discriminate between nodes
  type: 'entity';
  key: number;
  start: number;
  end: number;
  annotation: Annotation<T>;
  children: ContentNode<T>[];
}

export type SectionNode<T, U> = {
  key: number;
  start: number;
  end: number;
  annotation: Annotation<U>;
  contentNodes: ContentNode<T>[];
}