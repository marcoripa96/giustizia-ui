import styled from "@emotion/styled"
import { PropsWithChildren } from "react";
import SidebarContent from "./SidebarContent";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '250px'
});

const ContentLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <SidebarContent />
      <Container>
        {children}
      </Container>
    </>
  )
}

export default ContentLayout;