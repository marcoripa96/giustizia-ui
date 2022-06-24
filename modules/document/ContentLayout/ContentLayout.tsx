import styled from "@emotion/styled"
import { PropsWithChildren } from "react";
import { useSelector, selectDocumentLeftSidebarOpen } from "../DocumentProvider/selectors";
import { SidebarAnnotationDetails } from "../SidebarAnnotationDetails";
import { Toolsbar } from "../Toolsbar";
import { LeftSidebar } from "./LeftSidebar";
import RightSidebarContent from "./RightSidebarContent";

const Container = styled.div({
  height: 'calc(100vh - 48px)',
  display: 'flex',
  flexDirection: 'row'
})

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