// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { DOCUMENTS } from '@/documents';
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { promises as fs } from 'fs'

export type DocumentResponse = {
  id: string;
  title: string;
  preview: string;
}[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DocumentResponse>
) {
  if (req.method === 'GET') {

    const documents = await Promise.all(Object.keys(DOCUMENTS).map(async (key) => {
      const document = DOCUMENTS[key];
      const documentPath = path.join(process.cwd(), document.content);
      const content = await fs.readFile(documentPath, 'utf-8');
      const preview = content.slice(0, 600);
      return {
        id: document.id,
        title: document.title,
        preview
      }
    }));



    res.status(200).json(documents)
  } else {
    res.status(500)
  }


}
