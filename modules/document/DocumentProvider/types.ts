import { DocumentState } from "@/lib/useQueryDocument";
import { FlatTreeNode, TreeItem } from "../SidebarAddAnnotation/Tree";
import { FlatTreeObj } from "../SidebarAddAnnotation/Tree";

export type Action =
  | { type: 'setData', payload: { data: DocumentState } }
  | { type: 'changeAction', payload: { action: State['ui']['action'], data?: string } }
  | { type: 'addAnnotation', payload: { text: string; startOffset: number; endOffset: number; type: string } }
  | { type: 'deleteAnnotation', payload: { id: number } }
  | { type: 'deleteTaxonomyType', payload: { key: string } }
  | { type: 'addTaxonomyType', payload: { type: FlatTreeNode } };
export type Dispatch = (action: Action) => void

export type AnnotationType = {
  label: string;
  color: string;
  children?: Record<string, Omit<AnnotationType, 'color'>>
};
export type AnnotationTypeMap = Record<string, AnnotationType>;

export type UIAction = 'select' | 'add' | 'delete' | 'filter';

export type Taxonomy = TreeItem[];
export type FlattenedTaxonomy = FlatTreeObj

export type State = {
  /**
   * Document data
   */
  data: DocumentState | undefined;
  /**
   * Taxonomy in tree structure
   */
  taxonomy: FlattenedTaxonomy,

  ui: {
    action: {
      value: UIAction;
      data?: string;
    };
  }
}



