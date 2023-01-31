import fetchJson from "@/lib/fetchJson";
import { z } from "zod";
import { createRouter } from "../context";
import { Candidate, Document } from "./document";

const baseURL = `${process.env.API_BASE_URI}`;

export type GetDocumentProps = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  currentDocument: Document;
}

export const review = createRouter()
  .query('getDocument', {
    input: z
      .object({
        sourceId: z.string(),
        docId: z.number()
      }),
    resolve: ({ input }) => {
      const { sourceId, docId } = input;
      return fetchJson<void, GetDocumentProps>(`${baseURL}/review/source/${sourceId}/doc/${docId}`);
    },
  })