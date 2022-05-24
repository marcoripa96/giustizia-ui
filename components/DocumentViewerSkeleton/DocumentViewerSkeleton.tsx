import { FC } from "react";
import styled from '@emotion/styled';
import LoaderSkeleton from "./LoaderSkeleton/LoaderSkeleton";

const DocumentContainer = styled.div`
  min-height: 100vh;
  background: #FFF;
  max-width: 900px;
  width: 100%;
  padding: 24px 36px;
  border-radius: 6px;
  margin: 0 auto;
`

const DocumentViewerSkeleton: FC<{}> = () => {
  return (
    <DocumentContainer>
      <LoaderSkeleton />
    </DocumentContainer>
  )
}

export default DocumentViewerSkeleton;
