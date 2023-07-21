import { z } from "zod";
import { createRouter } from "../context";
import { Document } from "./document";

export type MostSimilarDocument = {
  id: number;
  title: string;
  preview: string;
  chunks: GetSimilarDocument['chunks']
}

type GetSimilarDocument = {
  doc: Document,
  chunks: {
    id: string;
    distance: number;
    metadata: { doc_id: string, chunk_size: number },
    text: string;
  }[]
}

export type GetSimilarDocumentResponse = GetSimilarDocument[]


export type FacetedQueryHit = {
  _id: string;
  mongo_id: string;
  text: string;
  name: string;
  metadata: HitMetadata[]
  annotations: HitAnnotation[]
}

export type HitMetadata = {
  type: string;
  value: string;
}

export type HitAnnotation = {
  start: number;
  end: number;
  mention: string;
  type: string;
}

export type Facet = {
  key: string;
  n_children: number;
  doc_count: number;
  children: { key: string; display_name: string; doc_count: number; }[]
}


export type FacetedQueryOutput = {
  hits: FacetedQueryHit[];
  facets: {
    metadata: Facet[],
    annotations: Facet[]
  };
  pagination: {
    current_page: number;
    total_hits: number;
    total_pages: number;
  }
}

export type DocumentChunk = {
  id: string;
  distance: number;
  metadata: {
    doc_id: string;
    chunk_size: number;
  };
  text: string;
}

export type DocumentWithChunk = {
  id: number;
  title: string;
  preview: string;
  chunks: DocumentChunk[]
}

const processResponseMostSImilartDocuments = (docs: GetSimilarDocumentResponse): DocumentWithChunk[] => {
  return docs.map((d) => {
    return {
      id: d.doc.id,
      title: d.doc.name,
      preview: `${d.doc.preview.split(' ').slice(0, 20).join(' ')}...`,
      chunks: d.chunks
    }
  })
}


export const search = createRouter()
  .mutation('mostSimilarDocuments', {
    input: z
      .object({
        query: z.string(),
      }),
    resolve: async ({ input }) => {


      const documents = await fetch(`${process.env.API_INDEXER}/chroma/collection/test/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: input.query
        })
      }).then((r) => r.json()) as GetSimilarDocumentResponse

      console.log(documents)

      return processResponseMostSImilartDocuments(documents)
    },
  })
  .query('facetedSearch', {
    input: z
      .object({
        text: z.string(),
        metadata: z.array(z.object({
          value: z.string(),
          type: z.string()
        })),
        annotations: z.array(z.object({
          value: z.string(),
          type: z.string()
        })),
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(),
      }),
    resolve: async ({ input }) => {

      const res = await fetch(`${process.env.API_INDEXER}/elastic/index/test/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...input,
          n_facets: 10000,
          page: input.cursor || 1
        })
      }).then((r) => r.json())




      return res as FacetedQueryOutput;
    },
  })
