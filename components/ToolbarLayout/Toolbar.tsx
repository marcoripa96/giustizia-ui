import styled from "@emotion/styled";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { LoginAvatar } from "../LoginAvatar";

const Container = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: '48px',
  display: 'flex',
  flexDirection: 'row',
  background: '#FFF',
  borderBottom: '1px solid #F3F3F5',
  zIndex: 10
});

const ToolbarContent = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '6px 12px',
  flexGrow: 1,
  justifyContent: 'space-between',
  minWidth: 0
})

const Logo = styled.a({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '22px',
  fontWeight: 700,
  width: '70px',
  padding: '6px 12px',
  borderRight: '1px solid #F3F3F5',
})



const Toolbar = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Container id="toolbar">
      <Link href="/infer" passHref>
        <Logo>
          🔨
        </Logo>
      </Link>
      <ToolbarContent>
        {children}
        <LoginAvatar />
      </ToolbarContent>
    </Container>
  )
};

export default Toolbar;