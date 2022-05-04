import { AnnotationTypeList, ButtonLoading, CopyToClipboardButton, NERDocumentViewer, NERViewer } from "@/components";
import { annotationTypes } from "@/components/NERDocumentViewer";
import { useQueryParam } from "@/hooks";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { annotationsExample, contentExample } from "../utils/example";
import { useQuery } from "@/utils/trpc";
import { fixedEncodeURIComponent } from "@/utils/shared";
import { NERAnnotation } from "@/server/routers/document";

const TextAreaWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
`

const TextArea = styled.textarea`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 10px;
  outline: none;
  border: none;
  border-radius: 12px;
  resize: none;
  font-size: 16px;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen, Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
  background-color: rgb(0 0 0/0.02);
  &::-webkit-scrollbar {
    height: 4px;
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,.26)
  }
  &:focus {
    box-shadow: 0 0 0 1px rgb(0 0 0/0.05);
    background-color: rgb(255 255 255);
  }

  transition: background .15s cubic-bezier(.4,0,.2,1), box-shadow .15s cubic-bezier(.4,0,.2,1);
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const Error = styled.span`
  font-size: 14px;
  color: rgb(240, 62, 62);
`


const getAnnotationTypes = (annotations: NERAnnotation[]) => {
  const items = annotations.reduce((acc, ann) => {
    if (!acc[ann.ner_type]) {
      acc[ann.ner_type] = 1;
    } else {
      acc[ann.ner_type] = acc[ann.ner_type] + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  return Object.keys(items).map((item) => ({
    label: annotationTypes[item as keyof typeof annotationTypes].label,
    n: items[item as keyof typeof items]
  }))
}

const QueryText = () => {
  const router = useRouter();
  // get query parameter if there is a query
  const query = useQueryParam<string>('query');
  const result = useQueryParam<string>('result');

  // set content to example if there is no query otherwise set it empty
  // the content is only set when an annotation result is computed
  const [content, setContent] = useState<string>(query ? '' : contentExample);

  const { data: annotation, isFetching, error, refetch } = useQuery(
    ['infer.getPipelineResults', { value: query }],
    { enabled: false, initialData: query ? [] : annotationsExample, retry: false })

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!textAreaRef.current) return;

    if (!query) {
      // when navigating back and forth the query could is set to undefined and the example would break
      textAreaRef.current.value = contentExample;
      setContent(contentExample);
      return;
    }

    if ((query && !result) || (query && !content)) {
      refetch().then(() => {
        setContent(query);
        // append result=true to the end of the url so that I can query again when initiating a new request on button press
        router.push(`/infer?query=${fixedEncodeURIComponent(query)}&result=true`, undefined, { shallow: true })
      });
      textAreaRef.current.value = query;
    }
  }, [query, result, content])

  const onClick = () => {
    if (textAreaRef.current) {
      const { value } = textAreaRef.current;
      // change the query parameter by shallow routing (page is not reloaded, query param are just updated)
      // this will trigger the useEffect to run and fetch the annotations
      router.push(`/infer?query=${fixedEncodeURIComponent(value)}`, undefined, { shallow: true })
    }
  }

  const annotationTypesArray = useMemo(() => {
    if (annotation) {
      return getAnnotationTypes(annotation);
    }
    return [];
  }, [annotation])

  const clipboardValue = useMemo(() => {
    if (query) {
      return router.asPath;
    }
    if (!content) {
      return ''
    }

    return `/infer?query=${fixedEncodeURIComponent(content)}`
  }, [query, content]);

  return (
    <>
      <TextAreaWrapper>
        <TextArea
          ref={textAreaRef}
          defaultValue={content}
          autoComplete="off"
          spellCheck="false" />
        <CopyToClipboardButton value={clipboardValue} />
      </TextAreaWrapper>

      <Row>
        <SecondaryText>{content.split(' ').length} words</SecondaryText>
      </Row>
      <ButtonLoading onClick={onClick} loading={isFetching}>Compute</ButtonLoading>
      {error && <Error>Something went wrong :(</Error>}
      {annotation ? (
        <Column>
          {annotationTypesArray.length > 0 && <AnnotationTypeList items={annotationTypesArray} />}
          <NERViewer content={content} annotations={annotation} />
        </Column>
      ) : null}
    </>
  )
}

export default QueryText;
