import { useQuery } from "@/utils/trpc";
import styled from "@emotion/styled";
import { Popover, Avatar, Button } from "@nextui-org/react";
import { FaSignOutAlt } from "@react-icons/all-files/fa/FaSignOutAlt";
import Link from "next/link";
import { useRouter } from "next/router";


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

const LoginAvatar = () => {
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

export default LoginAvatar;