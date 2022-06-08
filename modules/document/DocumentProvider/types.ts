import { Candidate, Document } from "@/server/routers/document";
import { Patch } from "@/utils/patches";
import { FlatTreeNode, TreeItem } from "../SidebarAddAnnotation/Tree";
import { FlatTreeObj } from "../SidebarAddAnnotation/Tree";

type ActionRequiredFields = {
  type: string;
  generatePatches?: boolean;
}

export type Action =
  | ActionRequiredFields & { type: 'setData', payload: { data: Document } }
  | ActionRequiredFields & { type: 'setCurrentEntityId', payload: { annotationId: number | null } }
  | ActionRequiredFields & { type: 'changeAction', payload: { action: State['ui']['action'], data?: string } }
  | ActionRequiredFields & { type: 'addAnnotation', payload: { text: string; startOffset: number; endOffset: number; type: string } }
  | ActionRequiredFields & { type: 'editAnnotation', payload: { annotationId: number; type: string; topCandidate: Candidate } }
  | ActionRequiredFields & { type: 'deleteAnnotation', payload: { annotationId: number } }
  | ActionRequiredFields & { type: 'deleteTaxonomyType', payload: { key: string } }
  | ActionRequiredFields & { type: 'addTaxonomyType', payload: { type: FlatTreeNode } }
  | ActionRequiredFields & { type: 'setUI', payload: Partial<State['ui']> };

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

export type State = {
  /**
   * Document data
   */
  data: Document | undefined;
  /**
   * Taxonomy in tree structure
   */
  taxonomy: FlattenedTaxonomy,
  draft: {
    patches: Patch[],
    inversePatches: Patch[]
  }
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



