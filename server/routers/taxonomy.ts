import fakeCandidates from "@/modules/taxonomy/fakeCandidates";
import { z } from "zod";
import { createRouter } from "../context";

export type Candidate = {
  mention: string;
  mention_type: string;
  context: string;
  offset_doc_start: number;
  offset_doc_end: number;
  offset_ex_start: number;
  offset_ex_end: number;
  doc_id: string;
  predict_proba?: number;
  type_pred?: string;
}

export const taxonomy = createRouter()
  .query('getZeroShotCandidates', {
    input: z.object({
      id: z.string(),
      terms: z.string().array()
    }),
    resolve: ({ input }) => {
      const { id, terms } = input;

      // API call

      return fakeCandidates as Candidate[];
    },
  })
