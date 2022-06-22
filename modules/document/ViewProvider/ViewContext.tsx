import { createContext } from "react";

export type ViewContext = {
  viewIndex: number
}

export const ViewContext = createContext<ViewContext | undefined>(undefined);
