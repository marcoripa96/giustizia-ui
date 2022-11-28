import { Taxonomy, UIState } from "./types";

export const baseTaxonomy: Taxonomy = [
  {
    key: 'persona',
    label: 'Persona',
    color: '#FCE7F3',
    children: [
      {
        key: 'giudice',
        label: 'Giudice',
        recognizable: false,
      },
      {
        key: 'avvocato',
        label: 'Avvocato',
        recognizable: false,
      }
    ]
  },
  {
    key: 'data',
    label: 'Data',
    color: '#ffdebf'
  },
  {
    key: 'luogo',
    label: 'Luogo',
    color: '#FAE8FF',
    children: [
      {
        key: 'indirizzo',
        label: 'Indirizzo',
        recognizable: true,
      }
    ]
  },
  {
    key: 'norma',
    label: 'Norma',
    color: '#8d9c1a',
    children: [
      {
        key: 'articolo_di_legge',
        label: 'Articolo di Legge',
        recognizable: true,
      }
    ]
  },
  {
    key: 'id',
    label: 'Identificativo',
    color: '#a63c22',
    children: [
      {
        key: 'targa',
        label: 'Targa',
        recognizable: false,
      },
      {
        key: 'codice_fiscale',
        label: 'Codice Fiscale',
        recognizable: false,
      },
      {
        key: 'partita_iva',
        label: 'Partita Iva',
        recognizable: false,
      },
      {
        key: 'n._telefono',
        label: 'N. Telefono',
        recognizable: false,
      },
    ]
  },
  {
    key: 'organizzazione',
    label: 'Organizzazione',
    color: '#baf2e6',
    children: [
      {
        key: 'tribunale',
        label: 'Tribunale'
      }
    ]
  },
  {
    key: 'parte',
    label: 'Parte',
    color: '#e03ba2'
  },
  {
    key: 'controparte',
    label: 'Controparte',
    color: '#ee2b6c'
  },
  {
    key: 'money',
    label: 'Denaro',
    color: '#a05c72'
  },
  {
    key: 'UNKNOWN',
    label: 'Altro',
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
