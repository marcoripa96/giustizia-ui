import styled from "@emotion/styled"
import { PropsWithChildren } from "react";
import { LeftSidebar } from "./LeftSidebar";
import RightSidebarContent from "./RightSidebarContent";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '320px',
  paddingRight: '320px',
  background: '#FAFAFA',
});

const ContentLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <LeftSidebar />
      <Container>
        {children}
      </Container>
      <RightSidebarContent />
    </>
  )
}

export default ContentLayout;