import { AnnotationTypeList, ButtonLoading, NERDocumentViewer } from "@/components";
import { Annotation, annotationTypes } from "@/components/NERDocumentViewer";
import { useMutation } from "@/hooks";
import fetchJson, { FetchRequestInit } from "@/lib/fetchJson";
import styled from "@emotion/styled";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import { annotationsExample, contentExample } from "../utils/example";

type AnnotationTypes = Record<keyof typeof annotationTypes, number>;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  margin: 0;
  padding: 10px;
  outline: none;
  border: none;
  /* box-shadow: 0 0 #0000,0 0 #0000, 0 0 #0000,0 0 #0000, inset 0 2px 4px 0 rgba(0,0,0,0.06); */
  /* border: 1px solid rgba(229,231,235,1); */
  border-radius: 12px;
  resize: none;
  font-size: 16px;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen, Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
  background-color: rgb(0 0 0/0.02);

  &:focus {
    box-shadow: 0 0 0 1px rgb(0 0 0/0.05);
    background-color: rgb(255 255 255);
  }

  transition: background .15s cubic-bezier(.4,0,.2,1), box-shadow .15s cubic-bezier(.4,0,.2,1);
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`

const Row = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end'
})

const SecondaryText = styled.div({
  fontSize: '14px',
  color: 'rgb(75 85 99)'
})

const mutationFetcher = (options?: FetchRequestInit) => fetchJson<any, Annotation[]>('/api/infer', { ...options });

const getAnnotationTypes = (annotations: Annotation[]) => {
  const items = annotations.reduce((acc, ann) => {
    if (!acc[ann.ner_type]) {
      acc[ann.ner_type] = 1;
    } else {
      acc[ann.ner_type] = acc[ann.ner_type] + 1;
    }
    return acc;
  }, {} as AnnotationTypes);
  return Object.keys(items).map((item) => ({
    label: annotationTypes[item as keyof typeof annotationTypes].label,
    n: items[item as keyof typeof items]
  }))
}

const QueryText = () => {
  const [content, setContent] = useState<string>(contentExample);
  const { data: annotations, loading, mutate } = useMutation(mutationFetcher, annotationsExample);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);


  const onClick = () => {
    if (textAreaRef.current) {
      const { value } = textAreaRef.current;
      mutate({
        method: 'POST',
        body: { data: value }
      }).then((res) => {
        setContent(value);
      })
    }
  }

  const annotationTypesArray = useMemo(() => {
    if (annotations) {
      return getAnnotationTypes(annotations);
    }
    return [];
  }, [annotations])

  return (
    <>
      <TextArea
        ref={textAreaRef}
        defaultValue={content}
        autoComplete="off"
        spellCheck="false" />
      <Row>
        <SecondaryText>{content.split(' ').length} words</SecondaryText>
      </Row>
      <ButtonLoading onClick={onClick} loading={loading}>Compute</ButtonLoading>
      {annotations ? (
        <Column>
          <AnnotationTypeList items={annotationTypesArray} />
          <NERDocumentViewer content={content} annotations={annotations} />
        </Column>
      ) : null}
    </>
  )
}

export default QueryText;
