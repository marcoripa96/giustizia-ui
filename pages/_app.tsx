import { MainToolbar } from '@/components'
import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import type { AppProps } from 'next/app'
import GlobalStyles from '../styles/globalStyles'
import NextNProgress from "nextjs-progressbar";
import { withTRPC } from '@trpc/next';
import { AppRouter } from '@/server/routers/_app'


const Layout = styled.div`
  min-height: 100vh;
  background: #FFFFFF;
`

const getTRPCUrl = () => {
  if (process.env.VERCEL_PUBLIC_URL) {
    return `https://${process.env.VERCEL_PUBLIC_URL}/api/trpc`
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
  }
  return 'http://localhost:3000/api/trpc';
}

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

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = getTRPCUrl();

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);


