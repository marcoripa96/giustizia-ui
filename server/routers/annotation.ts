import { z } from "zod";
import { createProtectedRouter } from "../context";

export type GetAnnotationDetails = {
  pageid: string;
  title: string;
  extract: string;
  thumbnail: {
    source: string;
  }
}

const getAnnotationById = async (id: string | number): Promise<GetAnnotationDetails> => {
  const endpoint = `action=query&pageids=${id}&prop=extracts|pageimages&exchars=200&explaintext=true&pithumbsize=480&format=json`;
  const response = await fetch(`https://it.wikipedia.org/w/api.php?${endpoint}`);

  const data = await response.json();

  const processedData = {
    ...data.query?.pages[(id as any)]
  }
  return processedData;
}

export const annotations = createProtectedRouter()
  .query('getAnnotationDetails', {
    input: z
      .object({
        id: z.union([z.string(), z.number()]),
      }),
    resolve: ({ input }) => {
      const { id } = input;
      return getAnnotationById(id);
    },
  })