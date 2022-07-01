import { Scroller } from "@/components/Scroller";
import styled from "@emotion/styled";
import DocumentViewer from "../DocumentViewer/DocumentViewer";
import { Toolsbar } from "../Toolsbar";

const DocumentContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
})

const View = () => {
  return (
    <>
      <Toolsbar />
      <Scroller>
        <DocumentContainer>
          <DocumentViewer />
        </DocumentContainer>
      </Scroller>
    </>

  )
}

export default View;