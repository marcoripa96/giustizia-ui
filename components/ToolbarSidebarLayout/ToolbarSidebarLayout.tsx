import styled from "@emotion/styled";
import { PropsWithChildren } from "react";
import Content from "./Content";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column'
})


const ToolbarSidebarLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Container>
      <Toolbar />
      <Sidebar />
      <Content>
        {children}
      </Content>
    </Container>
  )
}

export default ToolbarSidebarLayout;