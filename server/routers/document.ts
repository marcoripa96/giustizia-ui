import { z } from "zod";
import { createProtectedRouter } from "../context";
import { TRPCError } from "@trpc/server";
import { Annotation } from "@/hooks/use-ner";
import fetchJson from "@/lib/fetchJson";
import { getAuthHeader } from "../get-auth-header";

export type Document = {
  id: number;
  name: string;
  preview: string;
  text: string;
  annotation_sets: {
    entities: AnnotationSet<EntityAnnotation>;
    Sections?: AnnotationSet<SectionAnnotation>;
    // sentences: AnnotationSet;
  }
};

type AnnotationSet<P = []> = {
  name: string;
  next_annid: number;
  annotations: P[];
}

export type Candidate = {
  id: number;
  indexer: number;
  score: number;
  raw_score: number;
  norm_score: number;
  title: string;
  url: string;
}

export type AdditionalAnnotationProps = {
  mention: string;
  cluster: number;
  ner: {
    source: string;
    spacy_model: string;
    type: string;
    score: number;
  }
  linking: {
    source: string;
    is_nil: boolean;
    nil_score: number;
    top_candidate: Candidate;
    candidates: Candidate[];
  }
};

export type EntityAnnotation = Annotation<AdditionalAnnotationProps>
export type SectionAnnotation = Annotation;

const baseURL = `${process.env.API_BASE_URI}/mongo`;

const getDocumentById = async (id: number): Promise<Document> => {
  try {
    const document = await fetchJson<any, Document>(`${baseURL}/document/${id}`, {
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
  name: string;
  preview: string;
}[]

const getDocuments = async (): Promise<GetAllDocuments> => {
  const documents = await fetchJson<any, GetAllDocuments>(`${baseURL}/document`, {
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
  .mutation('save', {
    input: z
      .object({
        entitiesAnnotations: z.any().optional(),
      }),
    resolve: async ({ input }) => {
      const { entitiesAnnotations } = input;
      return fetchJson<any, void>(`${baseURL}/save`, {
        method: 'POST',
        headers: {
          Authorization: getAuthHeader()
        },
        body: {
          entitiesAnnotations
        }
      });
    },
  })
