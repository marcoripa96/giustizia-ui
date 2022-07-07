import { GetStaticProps, GetStaticPropsContext } from "next";

type StaticPropsResult = {
  [key: string]: any,
  props: Record<string, any>
}

type StaticPropsWithLocale = StaticPropsResult & {
  props: {
    locale: any;
    [key: string]: string;
  }
}

const withLocale = (handler: GetStaticProps) => {
  const locale = process.env.LOCALE || 'ita';

  return async (context: GetStaticPropsContext) => {
    const localeObj = (await import(`@/translation/${locale}`)).default;
    const res = await handler(context) as StaticPropsResult;

    return {
      ...res,
      props: {
        ...res.props,
        locale: localeObj
      }
    }
  }
};

export default withLocale;