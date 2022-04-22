import { Annotation, annotationTypes } from "@/components/NERDocumentViewer";
import fetchJson from "@/lib/fetchJson";
import { withAuth } from "@/utils/withAuth";
import { z } from "zod";
import { createRouter } from "../context";

type HuggingFaceAnnotation = {
  entity_group: keyof typeof annotationTypes;
  score: number;
  word: string;
  start: number;
  end: number
}

const processHuggingFaceResponse = (response: HuggingFaceAnnotation[]): Annotation[] => {
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


export const infer = createRouter()
  .query('getPipelineResults', {
    input: z
      .object({
        value: z.string(),
      }),
    resolve: withAuth(({ input }) => {
      const { value } = input;
      return getNER(value);
    }),
  })