import { flattenTree } from "../SidebarAddAnnotation/Tree";
import { AnnotationTypeMap, State, Taxonomy } from "./types";

/**
 * Initial types
 */
export const annotationTypes: AnnotationTypeMap = {
  PER: {
    label: 'Person',
    color: 'rgb(254, 202, 116)'
  },
  MISC: {
    label: 'Miscellaneous',
    color: 'rgb(97, 232, 225)',
  },
  DATE: {
    label: 'Date',
    color: 'rgb(170, 156, 252)',
  },
  LOC: {
    label: 'Location',
    color: 'rgb(191, 225, 217)',
  },
  ORG: {
    label: 'Organization',
    color: 'rgb(234, 193, 204)',
  },
};

const entityTypes: Taxonomy = [
  {
    key: 'PER',
    label: 'Person',
    color: 'rgb(254, 202, 116)',
    children: [
      {
        key: 'JDG',
        label: 'Judge',
        children: [
          {
            key: 'JDGCIVIL',
            label: 'Civil Judge'
          },
          {
            key: 'JDGCRIM',
            label: 'Criminal Judge'
          },
        ]
      }
    ]
  },
  {
    key: 'MISC',
    label: 'Miscellaneous',
    color: 'rgb(97, 232, 225)'
  },
  {
    key: 'DATE',
    label: 'Date',
    color: 'rgb(170, 156, 252)'
  },
  {
    key: 'LOC',
    label: 'Location',
    color: 'rgb(191, 225, 217)'
  },
  {
    key: 'ORG',
    label: 'Organization',
    color: 'rgb(234, 193, 204)'
  }
];

/**
 * Initial state
 */
export const documentState: State = {
  data: undefined,
  types: entityTypes,
  flattenedTypes: flattenTree(entityTypes),
  ui: {
    action: {
      value: 'select'
    }
  }
}
