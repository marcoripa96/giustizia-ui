import { useQuery } from '@/utils/trpc';
import styled from '@emotion/styled';
import { Avatar, Card, Grid, Popover } from '@nextui-org/react';
import Link from 'next/link';
import { Button } from '../Button';
import { FaSignOutAlt } from '@react-icons/all-files/fa/FaSignOutAlt';
import { useRouter } from 'next/router';

const Container = styled.div({
  position: 'sticky',
  display: 'flex',
  top: 0,
  background: '#FFF',
  // boxShadow: '0 2px 4px rgb(0 0 0 / 2%), inset 0 -1px 0 rgb(0 0 0 / 6%)',
  padding: '5px 24px',
  borderBottom: '1px solid #EAECED',
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

const Toolbar = () => {
  const { data, isFetching } = useQuery(['auth.user']);
  const { refetch } = useQuery(['auth.logout'], { enabled: false });
  const router = useRouter();

  const handleLogout = () => {
    refetch().then(() => {
      router.push('/login');
    })
  }

  return (
    <Container>
      <Nav>
        <Link href="/infer" passHref>
          <Logo>
            🔨 GiustiziaUI
          </Logo>
        </Link>
        <Grid.Container direction="row" css={{ width: 'auto', gap: '10px' }}>
          <Link href="/documents" passHref>
            <LinkButton>Browse documents</LinkButton>
          </Link>
          {data?.isLoggedIn ? (
            <Popover>
              <Popover.Trigger>
                <Avatar
                  size="md"
                  text={data.username.slice(0, 1).toUpperCase()}
                  pointer
                />
              </Popover.Trigger>
              <Popover.Content>
                <Button onClick={handleLogout} iconRight={<FaSignOutAlt />}>Logout</Button>
              </Popover.Content>
            </Popover>

          ) : (
            <Link href="/login" passHref>
              <LinkButton>Login</LinkButton>
            </Link>
          )}
        </Grid.Container>
      </Nav>
    </Container>
  )
}

export default Toolbar;

