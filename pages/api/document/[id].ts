import { DOCUMENTS } from '@/documents';
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { promises as fs } from 'fs'
import { DocumentResponse } from '.';
import { Mention } from '@/components/DocumentViewer/types';

export type Annotation = Mention[];

export type DocumentByIdResponse = {
  id: string;
  title: string;
  content: string;
  annotation: Annotation
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DocumentByIdResponse>
) {
  if (req.method === 'GET') {
    const { id } = req.query;

    if (Array.isArray(id)) {
      return res.status(500);
    }

    const document = DOCUMENTS[id];

    if (!document) {
      return res.status(404);
    }

    const documentPath = path.join(process.cwd(), '_files', document.content);
    const content = await fs.readFile(documentPath, 'utf-8');
    const documentAnnotationPath = path.join(process.cwd(), '_files', document.annotation);
    const annotation = JSON.parse(await fs.readFile(documentAnnotationPath, 'utf8'));

    res.status(200).json({ ...document, content, annotation })
  } else {
    res.status(500)
  }


}
