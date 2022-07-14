import { useParam } from "@/hooks";
import { useQuery } from "@/utils/trpc";
import { PropsWithChildren, useReducer } from "react";
import { DocumentStateContext, DocumentDispatchContext } from "./DocumentContext";
import { Document } from "@/server/routers/document";
import { documentReducer } from "./reducer";
import { State } from "./types";
import { baseTaxonomy, initialUIState } from "./state";
import { SkeletonLayout } from "../SkeletonLayout";
import { orderAnnotations } from "@/lib/ner/core";
import { createTaxonomy } from "./utils";

/**
 * Fetches a document and provides it to the context consumer globally for the page.
 */
const DocumentProvider = ({ children }: PropsWithChildren<{}>) => {
  const [id] = useParam<string>('id');
  const { data, isFetching } = useQuery(['document.getDocument', { id: parseInt(id) }], { staleTime: Infinity });

  if (isFetching || !data) {
    return <SkeletonLayout />;
  }

  return <DocumentStateProvider data={data}>{children}</DocumentStateProvider>;
}

type DocumentStateProvider = {
  data: Document;
}


const DocumentStateProvider = ({ data, children }: PropsWithChildren<DocumentStateProvider>) => {
  const [state, dispatch] = useReducer(documentReducer, null, () => initializeState(data));

  return (
    <DocumentStateContext.Provider value={state}>
      <DocumentDispatchContext.Provider value={dispatch}>
        {children}
      </DocumentDispatchContext.Provider>
    </DocumentStateContext.Provider>
  )
};

const test = {
  "type": "PER",
  "start": 373,
  "end": 422,
  "id": 999,
  "features": {
    "ner": {
      "type": "ORG",
      "score": 1,
      "source": "spacy",
      "spacy_model": "it_core_news_lg"
    },
    "linking": {
      "source": "blink_biencoder",
      "top_candidate": {
        "raw_score": 272.11297607421875,
        "id": 216273,
        "wikipedia_id": 269445,
        "wikidata_qid": 16577084,
        "redirects_to": -1,
        "title": "Matrimonio (ordinamento italiano)",
        "url": "https://it.wikipedia.org/wiki?curid=269445",
        "type_": null,
        "indexer": 130,
        "score": 85.35236358642578,
        "norm_score": 0.3906046531593368
      },
      "candidates": [
        {
          "raw_score": 272.11297607421875,
          "id": 216273,
          "wikipedia_id": 269445,
          "wikidata_qid": 16577084,
          "redirects_to": -1,
          "title": "Matrimonio (ordinamento italiano)",
          "url": "https://it.wikipedia.org/wiki?curid=269445",
          "type_": null,
          "indexer": 130,
          "score": 85.35236358642578,
          "norm_score": 0.3906046531593368
        },
        {
          "raw_score": 272.6280822753906,
          "id": 254801,
          "wikipedia_id": 1564369,
          "wikidata_qid": 3922398,
          "redirects_to": -1,
          "title": "Processo civile telematico",
          "url": "https://it.wikipedia.org/wiki?curid=1564369",
          "type_": null,
          "indexer": 130,
          "score": 85.0948486328125,
          "norm_score": 0.3894261674688075
        },
        {
          "raw_score": 272.83673095703125,
          "id": 216416,
          "wikipedia_id": 261922,
          "wikidata_qid": 1060617,
          "redirects_to": -1,
          "title": "Unione civile (ordinamento italiano)",
          "url": "https://it.wikipedia.org/wiki?curid=261922",
          "type_": null,
          "indexer": 130,
          "score": 84.99053192138672,
          "norm_score": 0.38894877479714546
        },
        {
          "raw_score": 272.9030456542969,
          "id": 799076,
          "wikipedia_id": 3108353,
          "wikidata_qid": 3998639,
          "redirects_to": -1,
          "title": "Tribunale in composizione monocratica (ordinamento civile italiano)",
          "url": "https://it.wikipedia.org/wiki?curid=3108353",
          "type_": null,
          "indexer": 130,
          "score": 84.95735168457031,
          "norm_score": 0.38879692950137584
        },
        {
          "raw_score": 273.0327453613281,
          "id": 1127581,
          "wikipedia_id": 3297807,
          "wikidata_qid": 680913,
          "redirects_to": -1,
          "title": "Unione civile in Svizzera",
          "url": "https://it.wikipedia.org/wiki?curid=3297807",
          "type_": null,
          "indexer": 130,
          "score": 84.89253997802734,
          "norm_score": 0.38850032665300543
        },
        {
          "raw_score": 274.15185546875,
          "id": 1053327,
          "wikipedia_id": 55495,
          "wikidata_qid": 1052890,
          "redirects_to": -1,
          "title": "Diritto processuale civile",
          "url": "https://it.wikipedia.org/wiki?curid=55495",
          "type_": null,
          "indexer": 130,
          "score": 84.33293151855469,
          "norm_score": 0.3859393469796539
        },
        {
          "raw_score": 276.5748291015625,
          "id": 706489,
          "wikipedia_id": 3050385,
          "wikidata_qid": 3998641,
          "redirects_to": -1,
          "title": "Tribunale in composizione monocratica (ordinamento penale italiano)",
          "url": "https://it.wikipedia.org/wiki?curid=3050385",
          "type_": null,
          "indexer": 130,
          "score": 83.12156677246094,
          "norm_score": 0.380395684371901
        },
        {
          "raw_score": 276.81793212890625,
          "id": 150807,
          "wikipedia_id": 8691228,
          "wikidata_qid": -1,
          "redirects_to": -1,
          "title": "Processo civile (ordinamento italiano)",
          "url": "https://it.wikipedia.org/wiki?curid=8691228",
          "type_": null,
          "indexer": 130,
          "score": 82.99984741210938,
          "norm_score": 0.3798386506058149
        },
        {
          "raw_score": 277.05755615234375,
          "id": 765543,
          "wikipedia_id": 91456,
          "wikidata_qid": 222249,
          "redirects_to": -1,
          "title": "Diritto civile",
          "url": "https://it.wikipedia.org/wiki?curid=91456",
          "type_": null,
          "indexer": 130,
          "score": 82.88017272949219,
          "norm_score": 0.37929097405731127
        },
        {
          "raw_score": 277.1114807128906,
          "id": 914803,
          "wikipedia_id": 841522,
          "wikidata_qid": 3629356,
          "redirects_to": -1,
          "title": "Atto processuale civile",
          "url": "https://it.wikipedia.org/wiki?curid=841522",
          "type_": null,
          "indexer": 130,
          "score": 82.85319519042969,
          "norm_score": 0.37916751464920795
        }
      ],
      "nil_score": 0.036477857179161834,
      "is_nil": true
    },
    "mention": "Ruolo Generale degli Affari Civili\ndell’anno 2012"
  }
} as any


/**
 * Lazy initializer for the reducer
 */
const initializeState = (data: Document): State => {
  const entityAnnotationSets = Object.values(data.annotation_sets).filter((annSet) => annSet.name.startsWith('entities_'));

  const firstEntityAnnSet = entityAnnotationSets[0];
  let typeFilter = new Set<string>();
  let activeAnnotationSet = '';

  if (firstEntityAnnSet) {
    firstEntityAnnSet.annotations.forEach((ann) => {
      typeFilter.add(ann.type);
    })
    activeAnnotationSet = firstEntityAnnSet.name;
  }

  const taxonomy = createTaxonomy(baseTaxonomy, entityAnnotationSets);

  Object.values(data.annotation_sets).forEach((annSet) => {
    annSet.annotations = orderAnnotations(annSet.annotations);
  })

  return {
    data,
    ...initialUIState,
    taxonomy,
    ui: {
      ...initialUIState.ui,
      views: [
        {
          typeFilter: Array.from(typeFilter),
          activeAnnotationSet,
          activeSection: undefined
        }
      ]
    }
  }
}

export default DocumentProvider;
