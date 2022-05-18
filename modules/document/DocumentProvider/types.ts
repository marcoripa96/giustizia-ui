import { DocumentState } from "@/lib/useQueryDocument";

export type Action =
  | { type: 'setData', payload: { data: DocumentState } }
  | { type: 'changeAction', payload: { action: State['ui']['action'], data?: string } }
  | { type: 'addAnnotation' }
  | { type: 'deleteAnnotation' }
  | { type: 'addType', payload: { label: string, color?: string, path: string } };
export type Dispatch = (action: Action) => void

export type AnnotationType = {
  label: string;
  color: string;
  children?: Record<string, Omit<AnnotationType, 'color'>>
};
export type AnnotationTypeMap = Record<string, AnnotationType>;

export type UIAction = 'select' | 'add' | 'delete' | 'filter';

export type State = {
  data: DocumentState | undefined;
  types: AnnotationTypeMap,
  ui: {
    action: {
      value: UIAction;
      data?: string;
    };
  }
}



