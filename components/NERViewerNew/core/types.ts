export type Annotation<P = {}> = {
  // id of an annotation
  id: number;
  // start offset
  start: number;
  // end offset
  end: number;
  // the type of the annotation
  type: string;
  // additional features for this annotation
  features: P;
};

export type PropsWithSections<E, S> = {
  text: string,
  sections: Annotation<S>[],
  entities: Annotation<E>[]
}

export type InternalSection<E, S> = {
  text: string;
  annotations: Annotation<E>[];
  section: Annotation<S>;
}

export type SectionNode<S> = {
  id: number;
  type: string;
  start: number;
  end: number;
  props: Annotation<S>;
  // nodes?: EntityNode<P>[];
};

export type EntityNodeRequiredProps = {
  id: number;
  text: string;
  start: number;
  end: number;
  startSection: number;
  endSection: number;
};

export type SubEntityNode<E> = {
  text: string;
  start: number;
  end: number;
  props: Annotation<E>
}

export type EntityNode<E> =
  | (EntityNodeRequiredProps & { type: "text" })
  | (EntityNodeRequiredProps & {
    type: "entity";
    props: Annotation<E>;
    types: string[],
    children?: SubEntityNode<E>;
  });