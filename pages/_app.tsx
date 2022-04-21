import { MainToolbar } from '@/components'
import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import type { AppProps } from 'next/app'
import GlobalStyles from '../styles/globalStyles'
import NextNProgress from "nextjs-progressbar";

const Layout = styled.div`
  min-height: 100vh;
  background: #FFFFFF;
`

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Global styles={GlobalStyles} />
      <Layout>
        {!(['/login'].includes(router.pathname)) && <MainToolbar />}
        <NextNProgress color='rgb(75 85 99)' showOnShallow={false} />
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
