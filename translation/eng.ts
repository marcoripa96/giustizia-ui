import { Translation } from "./type";

const t: Translation = {
  infer: {
    subTitle: 'Here you can try out the pipeline.',
    computeBtn: 'Compute',
    nWords: '{n} words',
    toolbar: {
      browseDocs: 'Browse documents',
      logout: 'Logout'
    },
    selectAnnotationSet: 'Set'
  },
  documents: {
    toolbar: {
      logout: 'Logout',
      searchInput: 'Search for a document'
    },
    modals: {
      searchInput: 'Search documents...',
      noResults: 'No results for your query'
    },
    addCard: {
      title: 'Add document',
      subTitle: 'Upload a new document to annotate'
    },
    title: 'Documents ({n})'
  },
  document: {
    toolbar: {
      logout: 'Logout',
      save: 'Salva'
    },
    subToolbar: {
      annotationSet: {
        label: 'Set',
        new: 'New annotation set'
      },
      types: {
        label: 'Tipi'
      }
    },
    leftSidebar: {
      actionsTooltips: {
        select: 'Select',
        add: 'Add annotation',
        delete: 'Delete annotation',
        filter: 'Filter annotation',
        settings: 'Settings',
        clusters: 'Entities clusters',
      },
      clustersContent: {
        title: 'Entities Clusters',
        description: 'Below are shown the entities clusters with their mentions',
        mentions: '{n} mentions'
      },
      addContent: {
        title: 'Add annotation',
        description: 'Add a new annotation by selecting a span of text',
        addType: 'Add new type',
        loadTaxonomy: 'Load taxonomy',
        tooltipNotRecognized: 'This type is not automatically\nrecognized by the algorithm.'
      }
    },
    rightSidebar: {
      title: 'Annotation details',
      description: 'Inspect the details for a selected annotation.',
      entityContext: 'Enity context',
      typeHierarchy: 'Type hierarchy',
      links: 'Links',
      editBtn: 'Edit',
      emptyLinks: 'This annotation has not been linked to anything yet.'
    },
    modals: {
      addType: {
        title: 'Add entity type',
        description: 'Create a new type to be used to annotate entities in your documents.',
        typeNameInput: 'Name of new type',
        tagInput: 'Tag',
        subClassOf: 'Subclass of',
        parentTypeInput: 'Type',
        btnConfirm: 'Add',
        btnCancel: 'Cancel'
      },
      addAnnotationSet: {
        title: 'Create a new Annotation Set',
        description: 'Create a new annotation set. Select an empty preset or an existing set of annotations as starting point:',
        nameInput: 'Annotation Set name',
        presetInput: 'Preset'
      },
      editAnnotation: {
        title: 'Edit entity annotation',
        context: 'Context',
        type: 'Type',
        typeDescription: 'Edit the type of the entity by selecting it among the available ones.',
        links: 'Links',
        linksDescription: 'Edit links by selecting the true candidate for the entity.',
        searchLink: 'Search link...',
        addCandidate: {
          btn: 'Add candidate',
          title: 'Add a new candidate',
          description: 'Add a new candidate by either inserting a link to a resource or by manually filling in the form below.',
          add: 'Aggiungi',
          candidateTitle: 'Candidate title',
          candidateDescription: 'Candidate description',
          resourceLink: 'Resource link...'
        },
        btnConfirm: 'Confirm',
        btnCancel: 'Cancel'
      }
    }
  }
};

export default t;