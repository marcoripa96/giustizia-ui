import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import type { AppProps } from 'next/app'
import GlobalStyles from '../styles/globalStyles'

const Layout = styled.div`
  min-height: 100vh;
  background: #F8F9FA;;
`

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={GlobalStyles} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
