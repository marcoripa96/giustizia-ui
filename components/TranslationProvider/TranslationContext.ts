import { createContext } from "react";
import { BaseTranslation } from "./translations/base";

type TranslationContextProps = {
  loading: boolean;
  texts: BaseTranslation | undefined;
};

export const TranslationContext = createContext<TranslationContextProps | undefined>(undefined);