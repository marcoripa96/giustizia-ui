import { useQuery } from "@/utils/trpc";
import styled from "@emotion/styled";
import { Avatar, Button, Input, Popover } from "@nextui-org/react";
import { FaSignOutAlt } from "@react-icons/all-files/fa/FaSignOutAlt";
import { FaSistrix } from '@react-icons/all-files/fa/FaSistrix';
import Link from "next/link";
import { useRouter } from "next/router";

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
  justifyContent: 'space-between'
})

const Logo = styled.a({
  display: 'flex',
  alignItems: 'center',
  fontSize: '22px',
  fontWeight: 700,
  width: '240px',
  padding: '6px 12px',
  borderRight: '1px solid #F3F3F5',
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

const LoginSection = () => {
  const { data, isFetching } = useQuery(['auth.user']);
  const { refetch } = useQuery(['auth.logout'], { enabled: false });
  const router = useRouter();

  const handleLogout = () => {
    refetch().then(() => {
      router.push('/login');
    })
  }

  if (!data || !data.isLoggedIn) {
    return (
      <Link href="/login" passHref>
        <LinkButton>Login</LinkButton>
      </Link>
    )
  }

  return (
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
  )
}


const Toolbar = () => {


  return (
    <Container>
      <Link href="/infer" passHref>
        <Logo>
          🔨 GiustiziaUI
        </Logo>
      </Link>
      <ToolbarContent>
        <Input
          css={{
            minWidth: '400px'
          }}
          aria-label="Search documents"
          shadow={false}
          contentLeft={<FaSistrix />}
          placeholder="Search for a document"
          status="default"
        />
        <LoginSection />
      </ToolbarContent>
    </Container>
  )
};

export default Toolbar;