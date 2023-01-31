import {
  Candidate, Document, EntityAnnotation,
} from '@/server/routers/document';

export type Action =
  | { type: 'setState'; payload: { data: State } }
  | { type: 'updateTime'; payload: { time: number; cursor: number } }
  | { type: 'setActiveItem'; payload: { cursor: number } }
  | { type: 'addCandidateOptionItem'; payload: { candidate: Candidate } }
  | { type: 'nextAnnotation'; payload: { candidate: Candidate } }
  | { type: 'prevAnnotation' }

export type ActionType = Action['type'];
export type Dispatch = (action: Action) => void;


export type UIListAnnotationItem = {
  // annotation: EntityAnnotation;
  time: number;
}


export type State = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  currentDocument: Document;
  ui: {
    totalReviewed: number;
    currentItemCursor: number;
    lastItemCursor: number;
    // listAnnotations: UIListAnnotationItem[];
  }
};
