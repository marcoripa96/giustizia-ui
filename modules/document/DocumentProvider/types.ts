import { Candidate, Document } from "@/server/routers/document";
import { FlatTreeNode, TreeItem } from "../SidebarAddAnnotation/Tree";
import { FlatTreeObj } from "../SidebarAddAnnotation/Tree";

export type Action =
  | { type: 'setData', payload: { data: Document } }
  | { type: 'setCurrentEntityId', payload: { annotationId: number | null } }
  | { type: 'changeAction', payload: { action: State['ui']['action'], data?: string } }
  | { type: 'addAnnotation', payload: { text: string; startOffset: number; endOffset: number; type: string } }
  | { type: 'editAnnotation', payload: { annotationId: number; type: string; topCandidate: Candidate } }
  | { type: 'deleteAnnotation', payload: { id: number } }
  | { type: 'deleteTaxonomyType', payload: { key: string } }
  | { type: 'addTaxonomyType', payload: { type: FlatTreeNode } }
  | { type: 'setUI', payload: Partial<State['ui']> };
export type Dispatch = (action: Action) => void

export type AnnotationType = {
  label: string;
  color: string;
  children?: Record<string, Omit<AnnotationType, 'color'>>
};
export type AnnotationTypeMap = Record<string, AnnotationType>;

export type UIAction = 'select' | 'add' | 'delete' | 'filter' | 'settings';

export type Taxonomy = TreeItem[];
export type FlattenedTaxonomy = FlatTreeObj

export type State = {
  /**
   * Document data
   */
  data: Document | undefined;
  /**
   * Taxonomy in tree structure
   */
  taxonomy: FlattenedTaxonomy,

  ui: {
    selectedEntityId: number | null;
    action: {
      value: UIAction;
      data?: string;
    };
    leftActionBarOpen: boolean;
  },
  callbacks: {
    scrollEntityIntoView: (id: number) => void;
  }
}



