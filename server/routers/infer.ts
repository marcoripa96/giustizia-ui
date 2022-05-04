import fetchJson from '@/lib/fetchJson';
import { z } from 'zod';
import { createProtectedRouter } from '../context';
import { getAuthHeader } from '../get-auth-header';
import { NERAnnotation } from './document';

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
    start_pos: ann.start,
    end_pos: ann.end,
    mention: ann.word
  }));
}

const getHuggingFaceNER = async (value: string) => {
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

type InferOptions = {
  save: boolean;
}

const defaultOptions = {
  save: false
}

/**
 * Post process request by adding ids to each annotation (required for the UI)
 */
const processInferResponse = (response: NERAnnotation[]): NERAnnotation[] => {
  return response.map((ann, index) => ({
    ...ann,
    id: index,
  }));
};

const inferText = async (value: string, options: InferOptions) => {
  const response = await fetchJson<any, NERAnnotation[]>(
    `${process.env.API_BASE_URI}/pipeline`,
    {
      method: 'POST',
      headers: {
        Authorization: getAuthHeader()
      },
      body: {
        text: value,
        save: options.save
      },
    }
  );

  return processInferResponse(response);
};

export const infer = createProtectedRouter().query('getPipelineResults', {
  input: z.object({
    value: z.string(),
    save: z.boolean().optional()
  }),
  resolve: ({ input }) => {
    const { value, ...options } = input;
    const resolvedOptions = {
      ...defaultOptions,
      ...options
    }

    return inferText(value, resolvedOptions);
  },
});
