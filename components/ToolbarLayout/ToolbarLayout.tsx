import styled from "@emotion/styled";
import { PropsWithChildren, ReactNode } from "react";
import Content from "./Content";
import Toolbar from "./Toolbar";

type ToolbarSidebarLayoutProps = {
  toolbarContent?: ReactNode;
  // siderbarContent?: ReactNode;
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column'
})


const ToolbarLayout = ({ toolbarContent, children }: PropsWithChildren<ToolbarSidebarLayoutProps>) => {
  return (
    <Container>
      <Toolbar>
        {toolbarContent}
      </Toolbar>
      <Content>
        {children}
      </Content>
    </Container>
  )
}

export default ToolbarLayout;