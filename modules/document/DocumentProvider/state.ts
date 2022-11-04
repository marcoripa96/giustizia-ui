import { Taxonomy, UIState } from "./types";

export const baseTaxonomy: Taxonomy = [
  {
    key: 'PER',
    label: 'Person',
    color: '#FCE7F3',
    children: [
      {
        key: 'JDG',
        label: 'Judge',
        recognizable: false,
        children: [
          {
            key: 'JDGCIVIL',
            label: 'Civil Judge',
            recognizable: false
          },
          {
            key: 'JDGCRIM',
            label: 'Criminal Judge',
            recognizable: false,
          }
        ]
      }
    ]
  },
  {
    key: 'MISC',
    label: 'Miscellaneous',
    color: '#EDE9FE'
  },
  {
    key: 'DATE',
    label: 'Date',
    color: '#ffdebf'
  },
  {
    key: 'LOC',
    label: 'Location',
    color: '#FAE8FF'
  },
  {
    key: 'ORG',
    label: 'Organization',
    color: '#baf2e6'
  },
  {
    key: 'UNK',
    label: 'Unknown',
    color: "#e2e2e2"
  }
];

/**
 * Initial state
 */
export const initialUIState: Omit<UIState, 'taxonomy'> = {
  // data: undefined,
  /**
   * The idea is to let the user provide the taxonomy as a tree structure, then it is converted to an internal representation (a "flattened tree").
   */
  // taxonomy: flattenTree(baseTaxonomy),
  ui: {
    action: {
      value: 'select'
    },
    leftActionBarOpen: true,
    newAnnotationModalOpen: false,
    selectedEntity: null,
    highlightAnnotation: {
      entityId: null
    },
    views: [
      {
        typeFilter: [],
        activeAnnotationSet: '',
        activeSection: undefined
      }
    ]
  }
}
