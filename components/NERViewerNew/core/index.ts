import { Annotation, EntityNode, InternalSection, PropsWithSections, SectionNode, SubEntityNode } from "./types";
import { _last } from "./utils";

/**
 * Get the annotations for a section
 */
export const _filterEntitiesForSection = <E, S>(
  // a section
  section: Annotation<S>,
  // all entity annotations
  entityAnnotations: Annotation<E>[]
) => {
  // look where to slice the array of entities
  let startIndex = entityAnnotations.findIndex((e) => e.start >= section.start && e.start <= section.end);
  // there are no annotations for the section
  if (startIndex === -1) {
    return [];
  }

  let endIndex = entityAnnotations.findIndex((e) => e.start > section.end);
  // it's possible that all annotations are included in the section offset
  endIndex = endIndex === -1 ? entityAnnotations.length : endIndex;
  return entityAnnotations.slice(startIndex, endIndex);
};

/**
 * Get the text for a section
 */
export const _getSectionText = <E, S>(
  // document text
  text: string,
  // a section
  section: Annotation<S>,
  // already filtered annotations for the section
  sectionEntities: Annotation<E>[]
) => {
  // section has no entities
  if (sectionEntities.length === 0) {
    return text.slice(section.start, section.end);
  }
  const lastEntity = sectionEntities[sectionEntities.length - 1];
  const endSectionOffset = lastEntity.end > section.end
    ? lastEntity.end
    : section.end;
  return text.slice(section.start, endSectionOffset);
};

/**
 * Iterate over internal sections (processed sections)
 */
export const _forEachSection = <E, S>(props: PropsWithSections<E, S>, callback: (s: InternalSection<E, S>, index: number) => void) => {
  const { text, sections, entities } = props;
  sections.forEach((section, index) => {
    const sectionAnnotations = _filterEntitiesForSection(section, entities);
    const sectionText = _getSectionText(text, section, sectionAnnotations);

    const s = {
      text: sectionText,
      annotations: sectionAnnotations,
      section
    }
    callback(s, index);
  })
};

export const _getSectionNode = <S>(section: Annotation<S>, sectionIndex: number): SectionNode<S> => {
  const { start, end, type } = section;
  return {
    id: sectionIndex,
    start,
    end,
    type,
    props: section
  }
}

export const _getNodes = <E>({
  text,
  entity,
  textCursor,
  offset,
  index
}: {
  text: string,
  entity: Annotation<E>,
  textCursor: number,
  offset: number,
  index: number
}) => {
  const { start, end } = entity;
  let nextIndex = index;
  let nextTextCursor = textCursor
  // span for the text node
  const spanTextNode = _getTextSpan({
    text,
    start: textCursor,
    end: start - offset,
    offset
  });
  // span for the entity node
  const spanEntityNode = _getTextSpan({
    text,
    start: start - offset,
    end: end - offset,
    offset
  });

  const textNode: EntityNode<E> = {
    id: nextIndex,
    type: "text",
    ...spanTextNode
  };
  nextIndex += 1;
  const entityNode: EntityNode<E> = {
    id: nextIndex,
    type: "entity",
    types: [entity.type],
    ...spanEntityNode,
    props: { ...entity },
  }
  nextIndex += 1;

  nextTextCursor = end - offset;

  return {
    textNode,
    entityNode,
    nextIndex,
    nextTextCursor
  }
}

export const _getTextSpan = ({
  text,
  start,
  end,
  offset,
}: {
  text: string,
  start: number,
  end: number,
  offset: number,
}) => {
  const span = text.slice(start, end);
  return {
    text: span,
    start,
    end,
    startSection: start + offset,
    endSection: end + offset
  }
}

export const _getSubEntityNode = <E>(parentNode: EntityNode<E>, subEntity: Annotation<E>): SubEntityNode<E> => {
  const { start: startParent, end: endParent, text: textParent } = parentNode;
  const { start: startSubEntity, end: endSubEntity } = subEntity;

  const start = startSubEntity - startParent;
  const end = endParent - start;
  const text = textParent.slice(start, end);

  return {
    text,
    start,
    end,
    props: subEntity
  }
}


export const _buildNodesWithSections = <E, S>(props: PropsWithSections<E, S>) => {
  let sectionNodes: SectionNode<S>[] = [];
  let entityNodes: EntityNode<E>[][] = [];

  let entityIndex = 0;

  _forEachSection(props, (s, sectionIndex) => {
    const { text, section, annotations } = s;
    let textCursor = 0;
    const offset = section.start;
    // section node
    sectionNodes.push(_getSectionNode(section, sectionIndex));
    entityNodes.push([]);
    // build entity nodes for the section
    annotations.forEach((ann) => {
      const { start, end } = ann;

      const lastEntityNode = _last(entityNodes[sectionIndex]);
      // if entityNodes is empty
      if (!lastEntityNode) {
        const { textNode, entityNode, nextIndex, nextTextCursor } = _getNodes({
          text,
          entity: ann,
          index: entityIndex,
          offset,
          textCursor
        });
        entityNodes[sectionIndex].push(textNode, entityNode);
        textCursor = nextTextCursor;
        entityIndex = nextIndex;
      } else {
        // disjointed annotation
        if (start > lastEntityNode.end) {
          const { textNode, entityNode, nextIndex, nextTextCursor } = _getNodes({
            text,
            entity: ann,
            index: entityIndex,
            offset,
            textCursor
          });
          entityNodes[sectionIndex].push(textNode, entityNode);
          textCursor = nextTextCursor;
          entityIndex = nextIndex;
        }
        // multi type
        else if (start === lastEntityNode.start && end === lastEntityNode.end) {
          // insert new node as children
          (lastEntityNode as EntityNode<E> & { type: 'entity' }).types.push(ann.type);
        }
        // nested
        else if (start >= lastEntityNode.start && end < lastEntityNode.end || start > lastEntityNode.start && end <= lastEntityNode.end) {
          console.log(s.section.type, ann);
          (lastEntityNode as EntityNode<E> & { type: 'entity' }).children = _getSubEntityNode(lastEntityNode, ann);
        }
        // overlapping
        else {
          // not yet implemented
        }
      }
    });

    const spanTextNode = _getTextSpan({
      text,
      start: textCursor,
      end: s.text.length,
      offset
    });
    entityNodes[sectionIndex].push({
      id: entityIndex,
      type: "text",
      ...spanTextNode
    });
  })

  console.log(entityNodes);

  return {
    sectionNodes,
    entityNodes
  }
}
