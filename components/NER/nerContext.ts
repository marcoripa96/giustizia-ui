import { ChildNodeWithColor } from "@/modules/document/SidebarAddAnnotation/Tree";
import { EntityAnnotation } from "@/server/routers/document";
import { createContext, MouseEvent, ReactNode, useContext } from "react";
import { SelectionNode } from "./TextNode";

type NERContextProps = {
  getTaxonomyNode: (key: string) => ChildNodeWithColor;
  isAddMode?: boolean;
  addSelectionColor?: string;
  renderContentHover?: (annotation: EntityAnnotation) => ReactNode;
  onTextSelection?: (event: MouseEvent, node: SelectionNode) => void;
  onTagClick?: (event: MouseEvent, annotation: EntityAnnotation) => void;
  onTagEnter?: (event: MouseEvent, annotation: EntityAnnotation) => void;
  onTagLeave?: (event: MouseEvent, annotation: EntityAnnotation) => void;
}

export const NERContext = createContext<NERContextProps | undefined>(undefined);

export const useNERContext = () => {
  const ctx = useContext(NERContext);

  if (ctx === undefined) {
    throw new Error('useNERContext must be used within a NERContextProvider')
  }

  return ctx;
}