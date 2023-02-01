import fetchJson from "@/lib/fetchJson";
import { z } from "zod";
import { createRouter } from "../context";
import { Candidate, Document } from "./document";

const baseURL = `${process.env.API_BASE_URI}`;

export type GetDocumentProps = {
  docId: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  currentDocument: Document;
}

export type GetSourceProps = {
  id: string;
  name: string;
  total: number;
  done: number;
}


export type PostSaveDocumentProps = {
  sourceId: string;
  docId: string;
}

export const review = createRouter()
  .query('getSource', {
    input: z
      .object({
        sourceId: z.string(),
      }),
    resolve: ({ input }) => {
      const { sourceId } = input;
      return fetchJson<void, GetSourceProps>(`${baseURL}/review/source/${sourceId}`);
    },
  })
  .query('getDocument', {
    input: z
      .object({
        sourceId: z.string(),
        docId: z.string()
      }),
    resolve: ({ input }) => {
      const { sourceId, docId } = input;
      return fetchJson<void, GetDocumentProps>(`${baseURL}/review/source/${sourceId}/doc/${docId}`);
    },
  })
  .mutation('saveDocument', {
    input: z
      .object({
        sourceId: z.string(),
        docId: z.string(),
        document: z.any()
      }),
    resolve: ({ input }) => {
      const { sourceId, docId, document } = input;
      return fetchJson<any, PostSaveDocumentProps>(`${baseURL}/review/source/${sourceId}/doc/${docId}`, {
        method: 'POST',
        body: {
          document
        }
      });
    },
  })