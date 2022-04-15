import { NextApiRequest, NextApiResponse } from "next";

export type AnnotationResponse = {
  pageid: string;
  title: string;
  extract: string;
  thumbnail: {
    source: string;
  }
}

export default async function annotation(req: NextApiRequest, res: NextApiResponse<AnnotationResponse>) {
  const { query } = req;

  const endpoint = `action=query&pageids=${query.id}&prop=extracts|pageimages&exchars=200&explaintext=true&pithumbsize=480&format=json`;
  const response = await fetch(`https://it.wikipedia.org/w/api.php?${endpoint}`);

  const data = await response.json();

  const processedData = {
    ...data.query?.pages[(query.id as any)]
  }
  res.json(processedData);
}