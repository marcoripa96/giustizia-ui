import { useState } from "react";

function useStreamQuery<T>(endpoint: string) {
  const [content, setContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const stream = async (requestBody: T) => {
    setContent('');
    setIsStreaming(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log(response)

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

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setContent((prev) => prev + chunkValue);
    }
    setIsStreaming(false);
  }

  return {
    stream,
    content,
    isStreaming
  }
}

export {
  useStreamQuery
}