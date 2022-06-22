import styled from "@emotion/styled"
import { PropsWithChildren } from "react";
import { useSelector, selectDocumentLeftSidebarOpen } from "../DocumentProvider/selectors";
import { SidebarAnnotationDetails } from "../SidebarAnnotationDetails";
import { Toolsbar } from "../Toolsbar";
import { LeftSidebar } from "./LeftSidebar";
import RightSidebarContent from "./RightSidebarContent";

// const FixedContainer = styled.div({
//   position: 'fixed',
//   top:
// })

// const Container = styled.div<{ leftSidebarOpen: boolean }>(({ leftSidebarOpen }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   paddingLeft: leftSidebarOpen ? '320px' : '70px',
// }));


const Container = styled.div({
  height: 'calc(100vh - 48px)',
  display: 'flex',
  flexDirection: 'row'
})

const ContentOuterWrapper = styled.div({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  background: '#FAFAFA',
});


const ContentInnerWrapper = styled.div({
  display: 'flex',
  flexDirection: 'row',
  background: '#FAFAFA',
  overflowY: 'auto'
});

const Content = styled.div({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  background: '#FAFAFA',
});


const ContentLayout = ({ children }: PropsWithChildren<{}>) => {
  // const leftSidebarOpen = useSelector(selectDocumentLeftSidebarOpen);
  return (
    <Container>
      <LeftSidebar />
      <Content>
        {children}
      </Content>
      {/* <SidebarAnnotationDetails /> */}
      {/* 
      <Container leftSidebarOpen={leftSidebarOpen}>
        <Toolsbar />
        <Content>
          {children}
        </Content>
      </Container>
      <RightSidebarContent />
      <SidebarAnnotationDetails /> */}
    </Container>
  )
}

export default ContentLayout;