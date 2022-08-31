import { z } from "zod";
import { createRouter } from "../context";
import { TRPCError } from "@trpc/server";
import fetchJson from "@/lib/fetchJson";
import { getAuthHeader } from "../get-auth-header";
import { Annotation } from "@/lib/ner/core/types";

export type Document = {
  _id: string,
  id: number;
  name: string;
  preview: string;
  text: string;
  annotation_sets: {
    [key: string]: AnnotationSet<EntityAnnotation>;
    // entities: AnnotationSet<EntityAnnotation>;
    // Sections?: AnnotationSet<SectionAnnotation>;
    // sentences: AnnotationSet;
  }
};

export type AnnotationSet<P = []> = {
  _id?: string;
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
  },
  types?: string[];
};

export type EntityAnnotation = Annotation<AdditionalAnnotationProps>
export type SectionAnnotation = Annotation;

const baseURL = `${process.env.API_BASE_URI}/mongo`;
// const baseURL = `${process.env.API_BASE_URI}`;

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

export type GetDocumentsDoc = {
  _id: string;
  id: number;
  name: string;
  preview: string;
}

export type GetPaginatedDocuments = {
  docs: GetDocumentsDoc[],
  totalDocs: number,
  limit: number,
  totalPages: number,
  page: number,
  pagingCounter: number,
  hasPrevPage: boolean,
  hasNextPage: boolean,
  prevPage: number | null,
  nextPage: number | null
}

const getDocuments = async (cursor: number, limit: number, q?: string): Promise<GetPaginatedDocuments> => {
  const res = await fetchJson<any, GetPaginatedDocuments>(`${baseURL}/document?q=${q}&page=${cursor}&limit=${limit}`, {
    headers: {
      Authorization: getAuthHeader()
    }
  });
  return res;
}

export const documents = createRouter()
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
  .query('inifniteDocuments', {
    input: z.object({
      q: z.string().nullish(),
      limit: z.number().min(1).max(100).nullish(),
      cursor: z.number().nullish(),
    }),
    resolve: ({ input }) => {
      const { q: qInput, cursor: cursorInput, limit: limitInput } = input;
      const q = qInput || '';
      const cursor = cursorInput || 1;
      const limit = limitInput || 20;

      return getDocuments(cursor, limit, q);
    },
  })
  .mutation('deleteAnnotationSet', {
    input: z
      .object({
        docId: z.number(),
        annotationSetId: z.string(),
      }),
    resolve: async ({ input }) => {
      const { docId, annotationSetId } = input;
      return fetchJson<any, AnnotationSet<EntityAnnotation>[]>(`${baseURL}/document/${docId}/annotation-set/${annotationSetId}`, {
        method: 'DELETE',
        headers: {
          Authorization: getAuthHeader()
        }
      });
    },
  })
  .mutation('save', {
    input: z
      .object({
        docId: z.number(),
        annotationSets: z.any().optional(),
      }),
    resolve: async ({ input }) => {
      const { docId, annotationSets } = input;
      return fetchJson<any, AnnotationSet<EntityAnnotation>[]>(`${baseURL}/save`, {
        method: 'POST',
        headers: {
          Authorization: getAuthHeader()
        },
        body: {
          docId,
          annotationSets
        }
      });
    },
  })
