import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { TranslationContext } from "./TranslationContext";
import { BaseTranslation } from "./translations/base";


const useLazyTranslation = (module: string) => {
  const [t, setT] = useState<BaseTranslation>();

  useEffect(() => {
    import(`./translations/${module}`).then(({ default: defaultT }) => {
      setT(defaultT);
    });
  }, [module]);

  return {
    texts: t,
    loading: !t
  };
}

export const useText = () => {
  const context = useContext(TranslationContext);

  if (context === undefined) {
    throw new Error('useText must be used within a TranslationProvider')
  }

  const t = (text: keyof BaseTranslation) => {
    if (context.loading) {
      return null;
    }
    if (!context.texts) {
      return null;
    }
    return context.texts[text];
  }

  return t;
}

type TranslationProviderProps = PropsWithChildren<{
  module?: string;
}>

const TranslationProvider = ({
  module = 'base',
  children
}: TranslationProviderProps) => {
  const translationModule = useLazyTranslation(module);

  return (
    <TranslationContext.Provider value={translationModule}>
      {children}
    </TranslationContext.Provider>
  )
}

export default TranslationProvider;