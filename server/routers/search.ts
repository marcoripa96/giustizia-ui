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

const processResponseMostSImilartDocuments = async (docs: GetSimilarDocumentResponse) => {
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
  .query('mostSimilarDocuments', {
    input: z
      .object({
        query: z.string(),
      }),
    resolve: async ({ input }) => {


      const documents = await fetch(`${process.env.API_INDEXER}/collection/test/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: input.query
        })
      }).then((r) => r.json()) as GetSimilarDocumentResponse

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
        }))
      }),
    resolve: async ({ input }) => {

      const res = await fetch(`${process.env.API_INDEXER}/elastic/index/test/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
      }).then((r) => r.json())




      return res;
    },
  })
