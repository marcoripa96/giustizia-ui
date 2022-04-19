## Run locally with docker

```
docker-compose up
```

## Run locally without docker

First of all you need `NodeJS` and `pnpm` installed on your machine.

1. Install NodeJS following this [link](https://nodejs.org/it/download/).

2. Install pnpm packet manager following this [link](https://pnpm.io/it/installation).

Finally to run the project:

1. Install all dependencies:

```
pnpm install
```

2. Run the project:

```
pnpm run dev
```


## Add documents
You can follow these steps to add new documents with their annotations.

1. Add a document file (`.txt`) and its annotations (`.json`) in the `_files` directory at the root of the application.
For example:

```
.
└── _files
    ├── bologna.txt
    └── bologna.json
```
2. Include the added files in the javascript object in the `documents.ts` file at the root of the application. Be sure each one of the added documents has a unique id.
For example:

```ts
export const DOCUMENTS: Record<string, Document> = {
  '1': {
    id: '1',
    title: 'Sentenza strage di Bologna',
    content: 'bologna.txt',
    annotation: 'bologna.json'
  }
}
```

