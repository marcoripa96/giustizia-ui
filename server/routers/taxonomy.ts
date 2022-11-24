import fetchJson from "@/lib/fetchJson";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "../context";
import { getAuthHeader } from "../get-auth-header";

export type Candidate = {
  mention: string;
  mention_type: string;
  text: string;
  offset_doc_start: number;
  offset_doc_end: number;
  offset_ex_start: number;
  offset_ex_end: number;
  doc_id: number;
  id: number;
  predict_proba?: number;
  type_pred?: string;
}

const baseURL = `${process.env.API_BASE_URI}/specialization`;


const getZeroShotExamples = async (type_id: string, verbalizer: string[], ancestor_type_id: string): Promise<Candidate[]> => {
  try {
    const candidates = fetchJson<any, Candidate[]>(
      `${baseURL}/zero`,
      {
        method: 'POST',
        headers: {
          Authorization: getAuthHeader(),
        },
        body: {
          type_id,
          verbalizer,
          ancestor_type_id
        }
      }
    );
    return candidates;
  } catch (err) {

    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `AAA`,
    });

  }
};

const getFewShotExamples = async (type_id: string): Promise<Candidate[]> => {
  const candidates = fetchJson<any, Candidate[]>(
    `${baseURL}/few`,
    {
      method: 'POST',
      headers: {
        Authorization: getAuthHeader(),
      },
      body: {
        type_id
      }
    }
  );
  return candidates;
};

export const taxonomy = createRouter()
  .query('getZeroShotCandidates', {
    input: z.object({
      id: z.string(),
      terms: z.string().array(),
      parent: z.string()
    }),
    resolve: async ({ input }) => {
      const { id, terms, parent } = input;

      const candidates = await getZeroShotExamples(id, terms, parent);
      return candidates;
    },
  })
  .query('getFewShotCandidates', {
    input: z.object({
      id: z.string()
    }),
    resolve: async ({ input }) => {
      const { id } = input;

      const candidates = await getFewShotExamples(id);
      return candidates;
    },
  })
