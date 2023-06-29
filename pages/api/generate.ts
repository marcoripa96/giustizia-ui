import { NextApiRequest, NextApiResponse } from "next";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { inputs } = req.body as { inputs: string }

  const response = await fetch(`${process.env.API_LLM}/generate`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ inputs }),
  });

  const readableStream = response.body as unknown as NodeJS.ReadableStream;
  readableStream.pipe(res)
};

export default handler;