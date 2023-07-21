import { Global } from '@emotion/react';
import styled from '@emotion/styled';
import type { AppProps } from 'next/app';
import GlobalStyles from '../styles/globalStyles';
import NextNProgress from 'nextjs-progressbar';
import { withTRPC } from '@trpc/next';
import { AppRouter } from '@/server/routers/_app';
import { NextUIProvider } from '@nextui-org/react';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { SessionProvider } from "next-auth/react"
import { TranslationProvider } from '@/components';
import TaxonomyProvider from '@/modules/taxonomy/TaxonomyProvider';
import '@/styles/globals.css'


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const Layout = styled.div`
  min-height: 100vh;
  background: #ffffff;
`;

const getTRPCUrl = () => {
  // return process.env.NEXT_PUBLIC_VERCEL_URL
  //   ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
  //   : 'http://localhost:3000/api/trpc';
  if (typeof window !== 'undefined') {
    return `${process.env.NEXT_PUBLIC_BASE_PATH}/api/trpc`
  }

  const url = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api/trpc`
    : `${process.env.NEXT_PUBLIC_FULL_PATH}/api/trpc`;

  return url;
};

function MyApp({
  Component,
  pageProps: { session, locale, ...pageProps },
  router
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SessionProvider session={session} basePath={`${process.env.NEXT_PUBLIC_BASE_PATH}/api/auth`}>
      <Global styles={GlobalStyles} />
      <TranslationProvider locale={locale}>
        <TaxonomyProvider>
          <NextUIProvider>
            <Layout>
              <NextNProgress color="rgb(75 85 99)" showOnShallow={false} />
              {getLayout(<Component {...pageProps} />)}
            </Layout>
          </NextUIProvider>
        </TaxonomyProvider>
      </TranslationProvider>
    </SessionProvider>
  );
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
