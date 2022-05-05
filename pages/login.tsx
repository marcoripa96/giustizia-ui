import type { GetServerSideProps, NextPage } from 'next'
import { FormEvent } from 'react'
import { useInput } from '@/hooks';
import { useRouter } from 'next/router';
import { withAuthSsr } from '@/lib/withAuthSsr';
import styled from '@emotion/styled';
import { useQuery } from '@/utils/trpc';
import { Card, Input, Text, Spacer } from '@nextui-org/react';
import { Button } from '@/components';

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
      <Card css={{ maxWidth: '500px', margin: '0 auto' }}>
        <Box as="form" onSubmit={onFormSubmit}>
          <Text h2 css={{ textAlign: 'center' }}>GiustiziaUI 🔨</Text>
          <Spacer y={0.5} />
          <Input.Password
            bordered
            labelPlaceholder="Password"
            onChange={onChangePassword}
            status={error ? 'error' : 'default'}
          />
          {error && <Text color="error">Invalid Password</Text>}
          <Button type="submit" disabled={!loginPassword} loading={isFetching}>
            Login
          </Button>
        </Box>
      </Card>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = withAuthSsr(async (context) => {
  return {
    props: {}
  }
}, { destination: '/infer', redirectWhen: 'isLoggedIn' });



export default Login
