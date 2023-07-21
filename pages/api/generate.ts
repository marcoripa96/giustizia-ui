import { Message } from "@/hooks/use-chat";
import { DocumentWithChunk } from "@/server/routers/search";
import { NextApiRequest, NextApiResponse } from "next";

export type GenerateRequest = {
  messages: Message[];
  system?: string;
  temperature?: number;
  max_new_tokens?: number;
  top_p?: number;
  token_repetition_penalty_max?: number;
}

const defaultSystemPrompt = "Replay to the user QUERY only using the information in the CONTEXT. If you don't know the answer just say that you don't know."


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const params = req.body as GenerateRequest;

  if (!params.messages) {
    res.status(401).json({ message: 'messages is required' });
  }
  // add system prompt
  params.messages.unshift({ role: 'system', content: params.system ? params.system : defaultSystemPrompt })
  // remove display message only used in the app
  const messages = params.messages.map(({ usrMessage, ...rest }) => rest);

  const response = await fetch(`${process.env.API_LLM}/generate`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      ...params,
      messages
    }),
  });

  const readableStream = response.body as unknown as NodeJS.ReadableStream;
  readableStream.pipe(res)
};

export default handler;