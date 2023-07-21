import { DocumentWithChunk } from "@/server/routers/search";
import { useRef, useState } from "react";

export type Message = {
  role: 'system' | 'assistant' | 'user',
  content: string;
  usrMessage?: string;
}

export type UseChatOptions = {
  endpoint: string;
  initialMessages: Message[];
}

export type GenerateOptions = {
  temperature?: number;
  max_new_tokens?: number;
  top_p?: number;
  token_repetition_penalty_max?: number;
  system?: string;
  context?: DocumentWithChunk[]
}

type MessagesState = {
  messages: Message[],
  contexts: (DocumentWithChunk[] | undefined)[];
  statuses: (boolean | undefined)[];
}

function useChat({ endpoint, initialMessages }: UseChatOptions) {
  const [state, setState] = useState<MessagesState>({
    messages: initialMessages || [],
    contexts: [...new Array(initialMessages.length)],
    statuses: [...new Array(initialMessages.length)]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  console.log(state);

  const messagesRef = useRef(state.messages);

  const stream = async ({ context, ...options }: Omit<GenerateOptions & { messages: Message[] }, 'system'>) => {
    setIsLoading(true);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    let initial = true;

    setIsLoading(false);
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      if (initial) {
        messagesRef.current.push({ role: 'assistant', content: chunkValue })
        setState((s) => ({
          messages: [...s.messages, { role: 'assistant', content: chunkValue }],
          contexts: [...s.contexts, context],
          statuses: [...s.statuses, false]
        }))
        initial = false;
      } else {
        setState((s) => {
          const lastMessage = s.messages.at(-1);
          const lastMessageRef = messagesRef.current.at(-1);

          if (!lastMessage || !lastMessageRef) {
            return s;
          }
          lastMessageRef.content = lastMessageRef.content + chunkValue

          return {
            ...s,
            messages: [...s.messages.slice(0, -1), { ...lastMessage, content: lastMessage.content + chunkValue }],
          }
        })
      }
    }

    setState((s) => {
      const lastMessage = s.messages.at(-1);

      if (!lastMessage) {
        return s;
      }

      return {
        ...s,
        messages: [...s.messages.slice(0, -1), { ...lastMessage }],
        statuses: [...s.statuses.slice(0, -1), true]
      }
    })
  }

  const appendMessage = async ({ message, ...generateOptions }: GenerateOptions & { message: string }) => {

    const generateContent = () => {
      if (generateOptions.context) {
        const contextChunks = generateOptions.context.flatMap((doc) => doc.chunks.map((chunk) => chunk.text)).join('\n\n')
        return `CONTEXT:\n${contextChunks}\nQUERY:\n${message}`;
      }
      return message;
    }

    const newMessage: Message = {
      role: 'user',
      content: generateContent(),
      usrMessage: message
    };

    messagesRef.current.push(newMessage);

    setState((s) => ({ ...s, messages: [...messagesRef.current], contexts: [...s.contexts, undefined], statuses: [...s.statuses, undefined] }));

    setIsStreaming(true);
    await stream({ ...generateOptions, messages: messagesRef.current });
    setIsStreaming(false);
  }

  const restartChat = () => {
    setState((s) => ({ ...s, messages: initialMessages }));
  }


  return {
    appendMessage,
    restartChat,
    state,
    isStreaming,
    isLoading
  }
}

export {
  useChat
}