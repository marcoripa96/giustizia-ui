export type FetchRequestInit<BODY = any> = Omit<RequestInit, 'body'> & {
  body?: BODY;
};

export default async function fetchJson<BODY = any, JSON = unknown>(
  input: RequestInfo,
  init?: FetchRequestInit<BODY>
): Promise<JSON> {
  const composeInit = {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    ...(init &&
      init.body && {
        body: JSON.stringify(init.body),
      }),
  } as RequestInit;

  const response = await fetch(input, composeInit);

  // if the server replies, there's always some data in json
  // if there's a network error, it will throw at the previous line
  const data = await response.json();

  // response.ok is true when res.status is 2xx
  // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
  if (response.ok) {
    return data;
  }

  throw new FetchError({
    message: response.statusText,
    response,
    data,
  });
}

export class FetchError extends Error {
  response: Response;
  data: {
    message: string;
  };
  constructor({
    message,
    response,
    data,
  }: {
    message: string;
    response: Response;
    data: {
      message: string;
    };
  }) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.name = 'FetchError';
    this.response = response;
    this.data = data ?? { message: message };
  }
}
