import { DocumentByIdResponse } from "@/pages/api/document/[id]";
import { FC, useMemo } from "react";
import styled from 'styled-components';
import LoaderSkeleton from "./LoaderSkeleton/LoaderSkeleton";
import MentionTag from "./MentionTag/MentionTag";
import { Toolbar } from "./Toolbar";
import { Mention } from "./types";

type DocumentViewerProps = {
  document: DocumentByIdResponse | undefined;
};

const DocumentContainer = styled.div`
  min-height: 100vh;
  background: #FFF;
  max-width: 900px;
  padding: 24px 36px;
  border-radius: 6px;
  margin: 0 auto;
`

const DocumentContent = styled.p`
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.7;
`

/**
 * Replace mentions with a component to visualize its type
 */
const replaceMentions = (content: string, mentions: Mention[]) => {
  if (!content || !mentions) {
    return [];
  }

  let result: any = [];
  let lastPosition = 0;

  mentions.forEach((mention, index) => {
    const { start_pos_original, end_pos_original } = mention;
    const firstSplit = content.slice(lastPosition, start_pos_original);
    const entity = content.slice(start_pos_original, end_pos_original);

    result.push(firstSplit)
    result.push(<MentionTag key={index} mention={mention}>{entity}</MentionTag>)

    lastPosition = end_pos_original;
  });

  return result;
}

const CommonLayout: FC<{}> = ({ children }) => (
  <>
    <Toolbar />
    <DocumentContainer>
      {children}
    </DocumentContainer>
  </>
)

const DocumentViewer: FC<DocumentViewerProps> = ({ document }) => {
  const annotatedText = useMemo(() => {
    if (!document) {
      return [];
    }
    const { content, annotation } = document;
    return replaceMentions(content, annotation);
  }, [document]);

  return (
    <>
      <Toolbar />
      <DocumentContainer>
        {document ? (
          <DocumentContent>
            {annotatedText}
          </DocumentContent>
        ) : (
          <LoaderSkeleton />
        )}

      </DocumentContainer>
    </>
  )
};

export default DocumentViewer;