import type { GetServerSideProps, NextPage } from 'next'
import { FormEvent } from 'react'
import { ButtonLoading, Card, InputText } from '@/components';
import { useInput } from '@/hooks';
import { useRouter } from 'next/router';
import { withAuthSsr } from '@/lib/withAuthSsr';
import styled from '@emotion/styled';
import { useQuery } from '@/utils/trpc';

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

/**
 * Login page component
 */
const Login: NextPage<{}> = () => {
  const [loginPassword, onChangePassword] = useInput('');

  const router = useRouter();
  const { isFetching, error, refetch } = useQuery(['auth.login', { password: loginPassword }], { enabled: false, retry: false })

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    refetch().then(({ isSuccess }) => {
      if (isSuccess) {
        router.push('/infer');
      }
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
            error={error?.message}
            onChange={onChangePassword} />
          <ButtonLoading disabled={!loginPassword || isFetching} loading={isFetching}>Login</ButtonLoading>
        </Box>
      </CardLogin>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = withAuthSsr(async (context) => {
  return {
    props: {}
  }
}, { destination: '/infer', redirectWhen: 'isLoggedIn' });



export default Login
