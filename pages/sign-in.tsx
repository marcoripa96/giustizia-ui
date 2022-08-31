import type { GetServerSideProps, NextPage } from 'next'
import { FormEvent, useEffect } from 'react'
import { useForm, useInput, useQueryParam } from '@/hooks';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useMutation, useQuery } from '@/utils/trpc';
import { Card, Input, Text, Spacer } from '@nextui-org/react';
import { Button } from '@/components';
import { FaRegUser } from '@react-icons/all-files/fa/FaRegUser';
import { FaLock } from '@react-icons/all-files/fa/FaLock';
import { signIn, useSession } from 'next-auth/react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0px auto;
  padding: 40px 20px;
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`


/**
 * Login page component
 */
const Login: NextPage<{}> = () => {
  const { status } = useSession()
  const signInError = useQueryParam('error');

  const { register, value } = useForm({
    username: '',
    password: ''
  });


  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    signIn('credentials', {
      ...value,
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_PATH}/infer`
    });
  }

  return (
    <Container>
      <Card css={{ maxWidth: '500px', margin: '0 auto', padding: '12px 16px' }}>
        <Box as="form" onSubmit={onFormSubmit}>
          <Text h2 css={{ textAlign: 'center' }}>GiustiziaUI 🔨</Text>
          <Spacer y={0.5} />
          <Input
            bordered
            placeholder="Username"
            aria-label="username"
            {...register('username')}
            contentLeft={<FaRegUser />}
          />
          <Input.Password
            bordered
            placeholder="Password"
            aria-label="password"
            {...register('password')}
            contentLeft={<FaLock />}
          />
          {signInError && <Text color="error">Invalid username or password.</Text>}
          <Button type="submit" disabled={!value.password || !value.username} loading={status === 'loading'}>
            Login
          </Button>
        </Box>
      </Card>
    </Container>
  )
}

export default Login
