type Document = {
  id: string;
  title: string;
  content: string;
  annotation: string;
}


export const DOCUMENTS: Record<string, Document> = {
  '1': {
    id: '1',
    title: 'Sentenza strage di Bologna',
    content: 'bologna.txt',
    annotation: 'bologna.json'
  }
}