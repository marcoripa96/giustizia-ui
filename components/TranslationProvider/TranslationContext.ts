import { Translation } from "@/translation/type";
import { createContext } from "react";
import { BaseTranslation } from "./translations/base";

type TranslationContextProps = {
  locale: Translation;
};

export const TranslationContext = createContext<TranslationContextProps | undefined>(undefined);