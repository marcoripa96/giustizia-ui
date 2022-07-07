import { AnnotationTypeFilter, Button, NERViewer } from "@/components";
import { useQueryParam } from "@/hooks";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@/utils/trpc";
import { fixedEncodeURIComponent } from "@/utils/shared";
import { Textarea, Text, Loading } from "@nextui-org/react";
import { flattenTree } from "@/modules/document/SidebarAddAnnotation/Tree";
import { baseTaxonomy } from "@/modules/document/DocumentProvider/state";

type QueryTextProps = {
  contentExample: string;
  annotationsExample: any;
}

const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  gap: 10px;
`

const StyledTextarea = styled(Textarea)`
  position: relative;
  width: 100%;
  height: 100%;
  
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
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
`

const QueryText = ({ contentExample, annotationsExample }: QueryTextProps) => {
  const router = useRouter();
  // get query parameter if there is a query
  const query = useQueryParam('query');
  const result = useQueryParam('result');

  // set content to example if there is no query otherwise set it empty
  // the content is only set when an annotation result is computed
  const [content, setContent] = useState<string>(query ? '' : contentExample);

  const { data: document, isFetching, error, refetch } = useQuery(
    ['infer.getPipelineResults', { value: query }],
    { enabled: false, initialData: query ? undefined : annotationsExample, retry: false })

  const [entityFilter, setEntityFilter] = useState<string[]>([]);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // for now use base taxonomy
  const taxonomy = useMemo(() => flattenTree(baseTaxonomy), []);

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

  useEffect(() => {
    if (!document) {
      return;
    }
    let typeFilter = new Set<string>();
    document.annotation_sets.entities.annotations.forEach((ann) => {
      typeFilter.add(ann.type);
    })
    setEntityFilter(Array.from(typeFilter));
  }, [document])

  const onClick = () => {
    if (textAreaRef.current) {
      const { value } = textAreaRef.current;
      // change the query parameter by shallow routing (page is not reloaded, query param are just updated)
      // this will trigger the useEffect to run and fetch the annotations
      router.push(`/infer?query=${fixedEncodeURIComponent(value)}`, undefined, { shallow: true })
    }
  }

  const filteredAnnotations = useMemo(() => {
    console.log(document);
    if (!document) {
      return [];
    }
    const { annotations } = document.annotation_sets.entities;

    return annotations.filter((ann) => {
      return entityFilter.indexOf(ann.type) !== -1;
    })
  }, [document, entityFilter])



  const handleAnnotationTypeFilterChange = (types: string[]) => {
    setEntityFilter(types);
  }

  return (
    <>
      <TextAreaWrapper>
        <StyledTextarea
          ref={textAreaRef}
          size="lg"
          rows={10}
          defaultValue={content}
          autoComplete="off"
          spellCheck="false"
          aria-label="infer text" />
        <Text color="rgb(75 85 99)" css={{ textAlign: 'end' }}>{content.split(' ').length} words</Text>
      </TextAreaWrapper>
      <Button onClick={onClick} loading={isFetching}>
        Compute
      </Button>
      {error && <Text color="error">Something went wrong :(</Text>}
      {document ? (
        <Column>
          <AnnotationTypeFilter
            taxonomy={taxonomy}
            annotations={document.annotation_sets.entities.annotations}
            value={entityFilter}
            onChange={handleAnnotationTypeFilterChange}
          />
          <NERViewer taxonomy={taxonomy} text={content} entityAnnotations={filteredAnnotations} />
        </Column>
      ) : null}
    </>
  )
}

export default QueryText;
