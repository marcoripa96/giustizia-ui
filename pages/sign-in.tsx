import type { GetServerSideProps, NextPage } from 'next'
import { FormEvent } from 'react'
import { useForm, useInput, useQueryParam } from '@/hooks';
import { useRouter } from 'next/router';
import { withAuthSsr } from '@/lib/withAuthSsr';
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

// const Card = styled(NextUICard)({
//   maxWidth: '500px',
//   margin: '0 auto'
// })


/**
 * Login page component
 */
const Login: NextPage<{}> = () => {
  const { status } = useSession()
  const signInError = useQueryParam('error');
  // const [username, onChangeUsxername] = useInput('');
  // const [loginPassword, onChangePassword] = useInput('');
  const { register, value } = useForm({
    username: '',
    password: ''
  });

  const router = useRouter();
  // const loginMutation = useMutation(['auth.login'], {
  //   onSuccess: () => {
  //     router.push('/infer');
  //   }
  // });

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    signIn('credentials', {
      ...value,
      callbackUrl: '/infer'
    });
    // loginMutation.mutate({
    //   ...value
    // })
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
          // status={loginMutation.error ? 'error' : 'default'}
          />
          <Input.Password
            bordered
            placeholder="Password"
            aria-label="password"
            {...register('password')}
            contentLeft={<FaLock />}
          // status={loginMutation.error ? 'error' : 'default'}
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
