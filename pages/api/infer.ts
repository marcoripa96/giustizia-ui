

import { Annotation, annotationTypes } from '@/components/NERDocumentViewer';
import fetchJson from '@/lib/fetchJson';
import { withAuthApi } from '@/lib/withAuthApi';
import { NextApiRequest, NextApiResponse } from 'next'

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

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { data } = req.body;
    try {
      const response = await fetchJson<any, HuggingFaceAnnotation[]>('https://api-inference.huggingface.co/models/dslim/bert-base-NER', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HUGGING_FACE_TOKEN}`
        },
        body: {
          inputs: data
        }
      })
      res.json(processHuggingFaceResponse(response));
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(500);
  }
}

export default withAuthApi(handler);