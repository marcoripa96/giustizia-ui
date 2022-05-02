import fetchJson from '@/lib/fetchJson';
import { z } from 'zod';
import { createProtectedRouter } from '../context';
import { NERAnnotation } from './document';

/**
 * Post process request by adding ids to each annotation (required for the UI)
 */
const processInferResponse = (response: NERAnnotation[]): NERAnnotation[] => {
  return response.map((ann, index) => ({
    ...ann,
    id: index,
  }));
};

const getNER = async (value: string) => {
  const response = await fetchJson<any, NERAnnotation[]>(
    `${process.env.API_BASE_URI}/pipeline`,
    {
      method: 'POST',
      body: {
        text: value,
      },
    }
  );

  return processInferResponse(response);
};

export const infer = createProtectedRouter().query('getPipelineResults', {
  input: z.object({
    value: z.string(),
  }),
  resolve: ({ input }) => {
    const { value } = input;
    return getNER(value);
  },
});
