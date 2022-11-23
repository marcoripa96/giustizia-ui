import { Taxonomy, UIState } from "./types";

export const baseTaxonomy: Taxonomy = [
  {
    key: 'persona',
    label: 'Persona',
    color: '#FCE7F3',
    children: [
      {
        key: 'persona_fisica',
        label: 'Persona Fisica',
        recognizable: false,
      },

      {
        key: 'giudice',
        label: 'Giudice',
        recognizable: false,
      },

      {
        key: 'avvocato',
        label: 'Avvocato',
        recognizable: false,
      },

      {
        key: 'testimone',
        label: 'Testimone',
        recognizable: false,
      },

      {
        key: 'rappresentante_capace',
        label: 'Rappresentante Capace',
        recognizable: false,
      },

      {
        key: 'rappresentante_incapace',
        label: 'Rappresentante Incapace',
        recognizable: false,
      },

      {
        key: 'soggetto_amministrato',
        label: 'Soggetto Amministrato',
        recognizable: false,
      },

      {
        key: 'minorenne',
        label: 'Minorenne',
        recognizable: false,
      },

      {
        key: 'consulente_tecnico',
        label: 'Consulente Tecnico',
        recognizable: false,
      },
      {
        key: 'ausiliario_del_giudice',
        label: 'Ausiliario Del Giudice',
        recognizable: false,
      },
      {
        key: 'vittima',
        label: 'Vittima',
        recognizable: false,
      },

      {
        key: 'coniuge',
        label: 'Coniuge',
        recognizable: false,
      },

      {
        key: 'collega',
        label: 'Collega',
        recognizable: false,
      },

      {
        key: 'convivente',
        label: 'Convivente',
        recognizable: false,
      },

      {
        key: 'fidanzato',
        label: 'Fidanzato',
        recognizable: false,
      },

      {
        key: 'conoscente',
        label: 'Conoscente',
        recognizable: false,
      },

      {
        key: 'altro_parente',
        label: 'Altro Parente',
        recognizable: false,
      },

      {
        key: 'sconosciuto',
        label: 'Sconosciuto',
        recognizable: false,
      },

      {
        key: 'pubblico_ministero',
        label: 'Pubblico Ministero',
        recognizable: false,
      },
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
      },
      {
        key: 'decreto_legislativo',
        label: 'Decreto Legislativo',
        recognizable: true,
      },
      {
        key: 'atto',
        label: 'Atto',
        recognizable: true,
      }
    ]
  },
  {
    key: 'bene_censibile',
    label: 'Bene Censibile',
    color: '#5caf5b',
    children: [
      {
        key: 'mezzo_di_trasporto',
        label: 'Mezzo di Trasporto',
        recognizable: false,
      },
      {
        key: 'immobile',
        label: 'Immobile',
        recognizable: false,
      },
      {
        key: 'dato_catastale',
        label: 'Dato Catastale',
        recognizable: false,
      }
    ]
  },
  {
    key: 'id',
    label: 'Identificativo',
    color: '#a63c22',
    children: [
      {
        key: 'nome',
        label: 'Nome',
        recognizable: false,
      },

      {
        key: 'cognome',
        label: 'Cognome',
        recognizable: false,
      },

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
        key: "numero_carta_d'identitÀ",
        label: "Numero Carta D'Identità",
        recognizable: false,
      },

      {
        key: 'passaporto',
        label: 'Passaporto',
        recognizable: false,
      },

      {
        key: 'patente',
        label: 'Patente',
        recognizable: false,
      },

      {
        key: 'tessera_militare',
        label: 'Tessera Militare',
        recognizable: false,
      },

      {
        key: 'tessera_ordini',
        label: 'Tessera Ordini',
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

      {
        key: 'email',
        label: 'Email',
        recognizable: false,
      },

      {
        key: 'account_online',
        label: 'Account Online',
        recognizable: false,
      },

      {
        key: 'codice_seriale',
        label: 'Codice Seriale',
        recognizable: false,
      }
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
    key: 'persona_giuridica',
    label: 'Persona Giuridica',
    color: '#d4ac51'
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
    label: 'Money',
    color: '#a05c72'
  },
  {
    key: 'reato',
    label: 'Reato',
    color: '#cf4afa'
  },
  {
    key: 'movente',
    label: 'Movente',
    color: '#706bfa'
  },
  {
    key: 'arma',
    label: 'Arma',
    color: '#cc439c'
  },
  {
    key: 'fascicolo',
    label: 'Fascicolo',
    color: '#02b5d7'
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
