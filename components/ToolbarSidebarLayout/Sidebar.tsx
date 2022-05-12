import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

const Container = styled.div({
  position: 'fixed',
  top: '48px',
  left: 0,
  bottom: 0,
  width: '70px',
  padding: '16px 12px',
  borderRight: '1px solid #F3F3F5'
});

const Sidebar = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Container>
      {children}
    </Container>
  )
};

export default Sidebar;