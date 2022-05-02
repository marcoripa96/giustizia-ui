import fetchJson from "@/lib/fetchJson";
import { z } from "zod";
import { createProtectedRouter } from "../context";
import { NERAnnotation } from "./document";

type HuggingFaceAnnotation = {
  entity_group: string;
  score: number;
  word: string;
  start: number;
  end: number
}

const processHuggingFaceResponse = (response: HuggingFaceAnnotation[]): NERAnnotation[] => {
  return response.map((ann, index) => ({
    id: index,
    top_url: '',
    ner_type: ann.entity_group,
    start_pos_original: ann.start,
    end_pos_original: ann.end,
    mention: ann.word
  }));
}

const getNER = async (value: string) => {
  const response = await fetchJson<any, HuggingFaceAnnotation[]>('https://api-inference.huggingface.co/models/dslim/bert-base-NER', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.HUGGING_FACE_TOKEN}`
    },
    body: {
      inputs: value
    }
  });
  return processHuggingFaceResponse(response);
}


export const infer = createProtectedRouter()
  .query('getPipelineResults', {
    input: z
      .object({
        value: z.string(),
      }),
    resolve: ({ input }) => {
      const { value } = input;
      return getNER(value);
    },
  })