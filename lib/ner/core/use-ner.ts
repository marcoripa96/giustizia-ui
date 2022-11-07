import { memo } from "@/utils/shared";
import { useCallback, useMemo } from "react";
import { createNodes, createSectionNodes, getSectionNodesFactory, orderAnnotations } from ".";
import { Annotation } from "./types";

type USENERProps<T, U> = {
  text: string;
  entities: Annotation<T>[];
  sections?: Annotation<U>[];
}

const useNER = <T = {}, U = {}>(props: USENERProps<T, U>) => {
  const {
    text,
    entities,
    sections = []
  } = props;
  const document = useMemo(() => {
    if (sections && sections.length > 0) {
      return createSectionNodes(text, sections, entities);
    }
    return createNodes(text, entities);
    // const getSections = getSectionNodesFactory(text, sections, contentNodes);
    // return {
    //   contentNodes,
    //   getSections
    // }
  }, [text, sections, entities]);

  return document;
};

export default useNER;