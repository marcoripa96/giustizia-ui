import { FC, useMemo } from "react";
import styled from 'styled-components';
import MentionTag from "./MentionTag";
import { Mention } from "./types";

type DocumentViewerProps = {
  content: string;
  mentions: Mention[];
}

const DocumentContainer = styled.div`
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

const DocumentViewer: FC<DocumentViewerProps> = ({ content, mentions }) => {
  // memoize, can be costly if the document is large
  const annotatedText = useMemo(() => replaceMentions(content, mentions), [content, mentions]);

  console.log(mentions)

  return (
    <DocumentContainer>
      <DocumentContent>
        {annotatedText}
      </DocumentContent>
    </DocumentContainer>
  )
};

export default DocumentViewer;