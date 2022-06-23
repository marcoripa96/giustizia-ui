import { Candidate, Document } from "@/server/routers/document";
import { FlatTreeNode, TreeItem } from "../SidebarAddAnnotation/Tree";
import { FlatTreeObj } from "../SidebarAddAnnotation/Tree";

export type Action =
  | { type: 'setData', payload: { data: Document } }
  | { type: 'setCurrentEntityId', payload: { annotationId: string | null } }
  | { type: 'changeAction', payload: { action: UIAction } }
  | { type: 'changeActionData', payload: { data: string } }
  | { type: 'addAnnotation', payload: { viewIndex: number, text: string; startOffset: number; endOffset: number; type: string } }
  | { type: 'editAnnotation', payload: { annotationId: number; type: string; topCandidate: Candidate } }
  | { type: 'deleteAnnotation', payload: { viewIndex: number, id: number } }
  | { type: 'deleteTaxonomyType', payload: { key: string } }
  | { type: 'addTaxonomyType', payload: { type: FlatTreeNode } }
  | { type: 'changeAnnotationSet', payload: { viewIndex: number, annotationSet: string } }
  | { type: 'setView', payload: { viewIndex: number, view: Partial<View> } }
  | { type: 'addView', payload: {} }
  | { type: 'removeView', payload: {} }
  | { type: 'setUI', payload: Partial<State['ui']> };

export type ActionType = Action['type'];

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

export type View = {
  typeFilter: string[];
  activeAnnotationSet: string;
  activeSection: string | undefined;
}

export type UIState = {
  /**
   * Taxonomy in tree structure
   */
  taxonomy: FlattenedTaxonomy,

  ui: {
    action: {
      value: UIAction;
      data?: string;
    };
    leftActionBarOpen: boolean;
    selectedEntityId: string | null;
    views: View[];
    // typeFilter: string[];
    // activeAnnotationSet: string;
    // activeSection: string | undefined;
  }
}

export type State = UIState & {
  /**
   * Document data
   */
  data: Document;
}



