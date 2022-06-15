import { flattenTree } from "../SidebarAddAnnotation/Tree";
import { State, Taxonomy, UIState } from "./types";
import { scrollEntityIntoView } from "./utils";

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
  }
];

/**
 * Initial state
 */
export const initialUIState: UIState = {
  // data: undefined,
  /**
   * The idea is to let the user provide the taxonomy as a tree structure, then it is converted to an internal representation (a "flattened tree").
   */
  taxonomy: flattenTree(baseTaxonomy),
  ui: {
    selectedEntityId: null,
    action: {
      value: 'select'
    },
    typeFilter: 'all',
    activeSection: undefined,
    leftActionBarOpen: true,
  },
  callbacks: {
    scrollEntityIntoView: scrollEntityIntoView
  }
}
