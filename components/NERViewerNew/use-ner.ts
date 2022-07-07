import { useMemo } from "react";
import { _buildNodesWithSections } from "./core";
import { Annotation, EntityNode, SectionNode } from "./core/types";

export type UseNERProps<E, S> = {
  text: string,
  sections: Annotation<S>[],
  entities: Annotation<E>[]
}

export type UseNERReturn<E, S> = {
  sectionNodes: SectionNode<S>[];
  entityNodes: EntityNode<E>[][];
}

const useNER = <E = {}, S = {}>(props: UseNERProps<E, S>): UseNERReturn<E, S> => {
  const doc = useMemo(() => {
    return _buildNodesWithSections(props);
  }, [props]);

  return doc;
};

export default useNER;