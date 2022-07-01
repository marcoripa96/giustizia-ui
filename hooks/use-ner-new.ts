import { useMemo } from "react";

type UseNER<E, S> = {
  text: string;
  entityAnnotations?: Annotation<E>[],
  sectionAnnotations?: Annotation<S>[]
};

type Annotation<P> = {
  id: number;
  start: number;
  end: number;
  type: string;
  features: P;
};

type AnnotationNodeRequiredProps = {
  index: number;
  text: string;
  type: string;
  start: number;
  end: number;
  startSection: number;
  endSection: number;
};

export type SectionNode<P> = {
  index: number;
  type: string;
  nodes?: AnnotationNode<P>[];
};

type AnnotationNode<P> =
  | (AnnotationNodeRequiredProps & { type: "text" })
  | (AnnotationNodeRequiredProps & { type: "entity"; props: Annotation<P> });

const _filterEntitiesForSection = <E, S>(
  section: Annotation<S>,
  entityAnnotations: Annotation<E>[]
) => {
  let cutIndex;

  const entityIndex = entityAnnotations.findIndex(
    (entityAnn) => entityAnn.start > section.end
  );
  cutIndex = entityIndex === -1 ? entityAnnotations.length : entityIndex;

  const filteredAnnotations = entityAnnotations.slice(0, cutIndex);
  const remainingAnnotations = entityAnnotations.slice(
    cutIndex,
    entityAnnotations.length
  );
  return [filteredAnnotations, remainingAnnotations] as const;
};

const _getTextSection = <E, S>(
  text: string,
  section: Annotation<S>,
  entities: Annotation<E>[]
) => {
  if (entities.length === 0) {
    return text.slice(section.start, section.end);
  }
  const lastEntity = entities[entities.length - 1];
  const endSectionOffset =
    lastEntity.end > section.end ? lastEntity.end : section.end;
  return text.slice(section.start, endSectionOffset);
};

const _getTextSpan = (text: string, start: number, end: number, offset: number) => {
  const span = text.slice(start, end);
  return {
    text: span,
    start,
    end,
    startSection: start + offset,
    endSection: end + offset
  }
}

const _buildSectionNodes = <E, S>(
  text: string,
  section: Annotation<S>,
  sectionEntities: Annotation<E>[],
) => {
  const nodes: AnnotationNode<E>[] = [];
  const offset = section.start;
  let lastPosition = 0;
  let index = 0;

  sectionEntities.forEach((annotation) => {
    const { start, end } = annotation;
    // node of type text
    const spanTextNode = _getTextSpan(text, lastPosition, start - offset, offset);
    // node of type entity
    const spanEntityNode = _getTextSpan(text, start - offset, end - offset, offset);
    nodes.push({
      index,
      type: "text",
      ...spanTextNode
    });
    nodes.push({
      index: index + 1,
      type: "entity",
      ...spanEntityNode,
      props: { ...annotation }
    });
    index += 2;
    lastPosition = end - offset;
  });
  // finally add the last piece of text
  const spanTextNode = _getTextSpan(text, lastPosition, text.length, offset);
  nodes.push({
    index,
    type: "text",
    ...spanTextNode
  });

  return nodes;
};

function _buildNodes<E, S>(
  text: string,
  entityAnnotations?: Annotation<E>[],
  sectionAnnotations?: Annotation<S>[]
): SectionNode<E>[] {

  if (!entityAnnotations && !sectionAnnotations) {
    return [{
      index: 0,
      type: '',
      nodes: _buildSectionNodes(
        text,
        { id: 0, start: 0, end: text.length, type: '', features: {} },
        [])
    }];
  }

  if (entityAnnotations && !sectionAnnotations) {
    return [{
      index: 0,
      type: '',
      nodes: _buildSectionNodes(
        text,
        { id: 0, start: 0, end: text.length, type: '', features: {} },
        [...entityAnnotations])
    }]
  }

  if (sectionAnnotations && !entityAnnotations) {
    throw Error('Annotation of just sections is not yet implemented')
  }

  const entitiesCopy = [...entityAnnotations as Annotation<E>[]];
  const sectionsCopy = [...sectionAnnotations as Annotation<S>[]];

  let restOfEntities = entitiesCopy;

  return sectionsCopy.map((section, index) => {
    const [sectionEntities, remainingEntities] = _filterEntitiesForSection(
      section,
      restOfEntities
    );

    const sectionText = _getTextSection(text, section, sectionEntities);
    const sectionNodes = _buildSectionNodes(sectionText, section, sectionEntities);
    restOfEntities = remainingEntities;

    return {
      index,
      type: section.type,
      nodes: sectionNodes
    }
  });
}

export function useNewNER<E = {}, S = {}>(props: UseNER<E, S>) {
  const { text, entityAnnotations, sectionAnnotations } = props;

  const nodes = useMemo(() => _buildNodes(text, entityAnnotations, sectionAnnotations), [
    text,
    entityAnnotations,
    sectionAnnotations
  ]);

  return nodes;
}
