import { AnnotationTypeList, ButtonLoading, NERDocumentViewer } from "@/components";
import { Annotation, annotationTypes } from "@/components/NERDocumentViewer";
import { useQueryParams } from "@/hooks";
import fetchJson, { FetchRequestInit } from "@/lib/fetchJson";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { annotationsExample, contentExample } from "../utils/example";
import { FaCheck } from '@react-icons/all-files/fa/FaCheck';
import { FaRegCopy } from '@react-icons/all-files/fa/FaRegCopy';
import { useQuery } from "@/utils/trpc";

type AnnotationTypes = Record<keyof typeof annotationTypes, number>;

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
  /* box-shadow: 0 0 #0000,0 0 #0000, 0 0 #0000,0 0 #0000, inset 0 2px 4px 0 rgba(0,0,0,0.06); */
  /* border: 1px solid rgba(229,231,235,1); */
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

const fixedEncodeURIComponent = (value: string) => {
  return encodeURIComponent(value).replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  }).replace(/%20/g, '+');
}

const ButtonClipboard = styled.button({
  position: 'absolute',
  bottom: '3px',
  right: '5px',
  outline: 'none',
  border: 'none',
  color: 'rgb(0 0 0/0.50)',
  backgroundColor: '#F0F0F0',
  borderRadius: '6px',
  padding: '10px',
  cursor: 'pointer',
  svg: {
    width: '18px',
    height: '18px'
  }
})

const CopyToClipboardButton = ({ value }: { value: string }) => {
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    if (clicked) {
      timeoutId = setTimeout(() => {
        setClicked(false)
      }, 1000)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [clicked])

  const handleClick = () => {
    navigator.clipboard.writeText(`${window.location.origin}${value}`)
    setClicked(true)
  }

  return (
    <ButtonClipboard onClick={handleClick}>
      {clicked ? <FaCheck /> : <FaRegCopy />}
    </ButtonClipboard>
  )
}

const QueryText = () => {
  // get query parameter if there is a query
  const { query } = useQueryParams(['query']);

  // set content to example if there is no query otherwise set it empty
  // the content is the result not what's inside the text area (working with uncontrolled component)
  const [content, setContent] = useState<string>(query ? '' : contentExample);

  const { data: annotations, isFetching, refetch } = useQuery(
    ['infer.getPipelineResults', { value: query }],
    { enabled: false, initialData: query ? [] : annotationsExample })

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (query) {
      // when the query changes query for the annotations
      refetch().then(() => {
        setContent(query);
      })
    }
  }, [query])

  const onClick = () => {
    if (textAreaRef.current) {
      const { value } = textAreaRef.current;
      // change the query parameter by shallow routing
      router.push(`/infer?query=${fixedEncodeURIComponent(value)}`, undefined, { shallow: true })
    }
  }

  const annotationTypesArray = useMemo(() => {
    if (annotations) {
      return getAnnotationTypes(annotations);
    }
    return [];
  }, [annotations])

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

      {annotations ? (
        <Column>
          {annotationTypesArray.length > 0 && <AnnotationTypeList items={annotationTypesArray} />}
          <NERDocumentViewer content={content} annotations={annotations} />
        </Column>
      ) : null}
    </>
  )
}

export default QueryText;
