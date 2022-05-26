import { z } from "zod";
import { createProtectedRouter } from "../context";
import { TRPCError } from "@trpc/server";
import { Annotation } from "@/hooks/use-ner";
import fetchJson from "@/lib/fetchJson";
import { getAuthHeader } from "../get-auth-header";

export type Document = {
  id: number;
  title: string;
  text: string;
  annotation: NERAnnotation[]
};

export type Candidate = {
  wikipedia_id: number;
  title: string;
  url: string;
  score: number;
  norm_score: number;
}

export type AdditionalAnnotationProps = {
  top_title?: string,
  top_wikipedia_id?: number,
  top_url?: string;
  candidates?: Candidate[];
  context_left?: string;
  context_right?: string;
};

export type NERAnnotation = Annotation<AdditionalAnnotationProps>;


const getDocumentById = async (id: number): Promise<Document> => {
  try {
    const document = await fetchJson<any, Document>(`${process.env.API_BASE_URI}/mongo/document/${id}`, {
      headers: {
        Authorization: getAuthHeader()
      }
    });
    return document;
  } catch (err) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `Document with id '${id}' not found.`
    })
  }
}

export type GetAllDocuments = {
  id: string;
  title: string;
  preview: string;
}[]

const getDocuments = async (): Promise<GetAllDocuments> => {
  const documents = await fetchJson<any, GetAllDocuments>(`${process.env.API_BASE_URI}/mongo/document`, {
    headers: {
      Authorization: getAuthHeader()
    }
  });
  return documents;
}

export const documents = createProtectedRouter()
  .query('getDocument', {
    input: z
      .object({
        id: z.number(),
      }),
    resolve: ({ input }) => {
      const { id } = input;
      return getDocumentById(id);
    },
  })
  .query('getAllDocuments', {
    resolve: () => {
      return getDocuments();
    },
  })