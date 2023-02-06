import {
  Candidate, Document, EntityAnnotation,
} from '@/server/routers/document';

export type Action =
  | { type: 'setState'; payload: { data: State } }
  | { type: 'updateTime'; payload: { time: number; cursor: number } }
  | { type: 'setActiveItem'; payload: { cursor: number } }
  | { type: 'addCandidateOptionItem'; payload: { cursor?: number; index?: number; candidate?: Candidate; } }
  | { type: 'nextAnnotation'; payload: { cursor?: number; index?: number; candidate?: Candidate; } }
  | { type: 'prevAnnotation' }
  | { type: 'skipAnnotation' }
  | { type: 'nilAnnotation' }
  | { type: 'confirmAnnotation' }

export type ActionType = Action['type'];
export type Dispatch = (action: Action) => void;


export type UIListAnnotationItem = {
  // annotation: EntityAnnotation;
  time: number;
}


export type State = {
  id: string;
  docId: string;
  doneIds: string[],
  name: string;
  total: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  currentDocument: Document | undefined;
  isLoading: boolean;
  ui: {
    totalReviewed: number;
    currentItemCursor: number;
    lastItemCursor: number;
  }
};
