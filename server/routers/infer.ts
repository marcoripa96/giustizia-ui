import fetchJson from '@/lib/fetchJson';
import { z } from 'zod';
import { createProtectedRouter } from '../context';
import { getAuthHeader } from '../get-auth-header';
import { Document } from './document';

type InferOptions = {
  save: boolean;
}

const defaultOptions = {
  save: false
}

const inferText = async (value: string, options: InferOptions) => {
  const response = await fetchJson<any, Document>(
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
  console.log(response);
  // return processInferResponse(response);
  return response;
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
