import type { AppProps } from 'next/app'
import styled from 'styled-components'
import GlobalStyle from '../styles/globalStyles'

const Layout = styled.div`
  min-height: 100vh;
  background: #fafafa;
`

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
