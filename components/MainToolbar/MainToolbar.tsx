import styled from '@emotion/styled';
import Link from 'next/link';

const Container = styled.div({
  position: 'sticky',
  display: 'flex',
  top: 0,
  background: '#FFF',
  boxShadow: '0 2px 4px rgb(0 0 0 / 2%), inset 0 -1px 0 rgb(0 0 0 / 6%)',
  padding: '16px 24px',
  zIndex: '10'
})

const Nav = styled.nav({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '1260px',
  margin: '0 auto'
})

const Logo = styled.a({
  fontSize: '22px',
  fontWeight: 700
})

const LinkButton = styled.a({
  border: 'none',
  outline: 'none',
  padding: '8px 10px',
  borderRadius: '6px',
  color: 'rgb(75 85 99)',
  transition: 'background 250ms ease-out',

  '&:hover': {
    backgroundColor: 'rgb(0 0 0/0.03)'
  }
})

const MainToolbar = () => {
  return (
    <Container>
      <Nav>
        <Link href="/infer" passHref>
          <Logo>
            🔨 GiustiziaUI
          </Logo>
        </Link>
        <Link href="/documents" passHref>
          <LinkButton>Browse documents</LinkButton>
        </Link>
      </Nav>
    </Container>
  )
}

export default MainToolbar;

