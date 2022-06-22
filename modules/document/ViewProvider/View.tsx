import { Scroller } from "@/components/Scroller";
import styled from "@emotion/styled";
import DocumentViewer from "../DocumentViewer/DocumentViewer";
import { Toolsbar } from "../Toolsbar";

const DocumentContainer = styled.div({
  // height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  // overflowY: 'auto',
  // '::-webkit-scrollbar': {
  //   height: '4px',
  //   width: '12px'
  // },
  // '::-webkit-scrollbar-thumb': {
  //   background: 'rgba(0,0,0,0.1)'
  // }
})

const View = () => {
  return (
    <>
      <Toolsbar />
      {/* <DocumentContainer> */}
      <Scroller>
        <DocumentContainer>
          <DocumentViewer />
        </DocumentContainer>
      </Scroller>
      {/* </DocumentContainer> */}
    </>

  )
}

export default View;