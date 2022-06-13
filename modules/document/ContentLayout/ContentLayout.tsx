import styled from "@emotion/styled"
import { PropsWithChildren } from "react";
import { useSelector, selectDocumentLeftSidebarOpen } from "../DocumentProvider/selectors";
import { SidebarAnnotationDetails } from "../SidebarAnnotationDetails";
import { LeftSidebar } from "./LeftSidebar";
import RightSidebarContent from "./RightSidebarContent";

const Container = styled.div<{ leftSidebarOpen: boolean }>(({ leftSidebarOpen }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: leftSidebarOpen ? '320px' : '70px',
  paddingRight: '320px',
  background: '#FAFAFA',
}));

const ContentLayout = ({ children }: PropsWithChildren<{}>) => {
  const leftSidebarOpen = useSelector(selectDocumentLeftSidebarOpen);
  return (
    <>
      <LeftSidebar />
      <Container
        leftSidebarOpen={leftSidebarOpen}>
        {children}
      </Container>
      <RightSidebarContent />
      <SidebarAnnotationDetails />
    </>
  )
}

export default ContentLayout;