import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import styled from 'styled-components'
import { FormEvent, useState } from 'react'
import { Button, Card, InputText } from '@/components';
import { useInput, useMutation } from '@/hooks';
import fetchJson, { FetchError, FetchRequestInit } from '@/lib/fetchJson';
import { useRouter } from 'next/router';
import { withAuthSsr } from '@/lib/withAuthSsr';

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

const CardLogin = styled(Card)`
  max-width: 500px;
  margin: 0 auto;
`

const LoginTitle = styled.h1`
  font-size: 34px;
  margin: 0 0 24px 0;
  text-align: center;
`


const mutationFetcher = (options?: FetchRequestInit) => fetchJson('/api/login', { ...options });

/**
 * Login page component
 */
const Login: NextPage<{}> = () => {
  const [loginPassword, onChangePassword] = useInput();
  const router = useRouter();
  const { mutate: login, error } = useMutation(mutationFetcher);

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    login({
      body: { password: loginPassword },
      method: 'POST'
    }).then(() => {
      router.push('/documents')
    })
  }

  return (
    <Container>
      <CardLogin>
        <Box as="form" onSubmit={onFormSubmit}>
          <LoginTitle>GiustiziaUI 🔨</LoginTitle>
          <InputText
            type="password"
            placeholder="Password"
            error={error?.data.message}
            onChange={onChangePassword} />
          <Button>Login</Button>
        </Box>
      </CardLogin>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = withAuthSsr(async (context) => {
  return {
    props: {}
  }
}, { destination: '/documents', redirectWhen: 'isLoggedIn' });



export default Login
