import styled from "@emotion/styled"
import { PropsWithChildren } from "react";
import LeftSidebarContent from "./LeftSidebarContent";
import RightSidebarContent from "./RightSidebarContent";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '250px',
  paddingRight: '320px',
  background: '#FAFAFA'
});

const ContentLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <LeftSidebarContent />
      <Container>
        {children}
      </Container>
      <RightSidebarContent />
    </>
  )
}

export default ContentLayout;