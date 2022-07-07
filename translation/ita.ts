import { Translation } from "./type";

const t: Translation = {
  infer: {
    subTitle: 'Qui puoi provare la pipeline corrente.',
    computeBtn: 'Processa',
    nWords: '{n} parole',
    toolbar: {
      browseDocs: 'Esplora documenti',
      logout: 'Esci'
    }
  },
  documents: {
    toolbar: {
      logout: 'Esci',
      searchInput: 'Cerca un documento'
    },
    modals: {
      searchInput: 'Cerca documenti...',
      noResults: 'Non sono presenti risultati per la tua ricerca'
    },
    addCard: {
      title: 'Aggiungi documento',
      subTitle: 'Carica un nuovo documento da annotare'
    },
    title: 'Documenti ({n})'
  },
  document: {
    toolbar: {
      logout: 'Esci',
      save: 'Salva'
    },
    subToolbar: {
      annotationSet: {
        label: 'Set',
        new: 'Nuovo set di annotazioni'
      },
      types: {
        label: 'Tipi'
      }
    },
    leftSidebar: {
      actionsTooltips: {
        select: 'Seleziona',
        add: 'Aggiungi annotazione',
        delete: 'Elimina annotazione',
        filter: 'Filtra annotazioni',
        settings: 'Impostazioni'
      },
      addContent: {
        title: 'Aggiungi annotazione',
        description: 'Aggiungi una nuova annotazione selezionando uno span di testo',
        addType: 'Aggiungi tipo',
        loadTaxonomy: 'Carica tassonomia',
        tooltipNotRecognized: 'Questo tipo non è riconosciuto automaticamente dall\' algoritmo'
      }
    },
    rightSidebar: {
      title: 'Dettagli annotazione',
      description: 'Ispeziona i dettagli per l\'annotazione selezionata.',
      entityContext: 'Contesto entità',
      typeHierarchy: 'Gerarchia del tipo',
      links: 'Link',
      editBtn: 'Modifica',
      emptyLinks: 'Questa annotazione non presenta alcun link.'
    },
    modals: {
      addType: {
        title: 'Aggiungi tipo entità',
        description: 'Crea un nuovo tipo con cui annotare entità nei tuoi documenti.',
        typeNameInput: 'Nome del nuovo tipo',
        tagInput: 'Tag',
        subClassOf: 'Sottoclasse di',
        parentTypeInput: 'Tipo',
        btnConfirm: 'Aggiungi',
        btnCancel: 'Annulla'
      },
      addAnnotationSet: {
        title: 'Crea un nuovo set di annotazioni',
        description: 'Crea un nuovo set di annotazioni. Seleziona un preset vuoto, oppure parti da un set esistente',
        nameInput: 'Nome set di annotazione',
        presetInput: 'Preset'
      },
      editAnnotation: {
        title: 'Modifica annotazione',
        context: 'Contesto',
        type: 'Tipo',
        typeDescription: 'Modifica il tipo dell\'entità selezionando tra quelli disponibili.',
        links: 'Link',
        linksDescription: 'Modifica i link selezionando il vero candidato fra le entità disponibili',
        searchLink: 'Cerca link...',
        addCandidate: {
          btn: 'Aggiungi candidato',
          title: 'Aggiungi nuovo candidato',
          description: 'Aggiungi un nuovo candidato inserendo direttamente il link della risorsa, oppure compilando il form.',
          add: 'Aggiungi',
          candidateTitle: 'Titolo candidato',
          candidateDescription: 'Descrizione candidato',
          resourceLink: 'Link alla risorsa...'
        },
        btnConfirm: 'Conferma',
        btnCancel: 'Annulla'
      }
    }
  }
};

export default t;