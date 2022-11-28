import { useQuery } from "@/utils/trpc";
import styled from "@emotion/styled";
import { Popover, Avatar, Button, Dropdown, User, Text } from "@nextui-org/react";
import { FiSliders } from "@react-icons/all-files/fi/FiSliders";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useText } from "../TranslationProvider";


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
  const t = useText('infer');
  const { data, status } = useSession();

  const handleAction = (key: string | number) => {
    if (key === 'logout') {
      signOut({
        callbackUrl: '/login'
      })
    }
  }

  if (status === 'loading') {
    return (
      <Skeleton width={40} height={40} borderRadius="50%" style={{ lineHeight: 'unset' }} />
    )
  }

  if (status === 'unauthenticated') {
    return (
      <Link href="/login" passHref>
        <LinkButton>Login</LinkButton>
      </Link>
    )
  }

  return (
    <Dropdown placement="bottom-left">
      <Dropdown.Trigger>
        <Avatar
          size="md"
          text={data?.user?.name?.slice(0, 1).toUpperCase()}
          pointer
        />
      </Dropdown.Trigger>
      <Dropdown.Menu aria-label="Static Actions" onAction={handleAction}>
        <Dropdown.Item key="profile" icon={<FiSliders />}>
          <Link href="/taxonomy" passHref>
            <Text as="a" b color="inherit">
              Gestisci tassonomia
            </Text>
          </Link>

        </Dropdown.Item>
        <Dropdown.Item key="logout" color="error" withDivider>
          {t('toolbar.logout')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default LoginAvatar;