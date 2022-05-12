import styled from "@emotion/styled";
import { PropsWithChildren, ReactNode } from "react";
import Content from "./Content";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";

type ToolbarSidebarLayoutProps = {
  toolbarContent?: ReactNode;
  siderbarContent?: ReactNode;
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column'
})


const ToolbarSidebarLayout = ({ toolbarContent, siderbarContent, children }: PropsWithChildren<ToolbarSidebarLayoutProps>) => {
  return (
    <Container>
      <Toolbar>
        {toolbarContent}
      </Toolbar>
      <Sidebar>
        {siderbarContent}
      </Sidebar>
      <Content>
        {children}
      </Content>
    </Container>
  )
}

export default ToolbarSidebarLayout;