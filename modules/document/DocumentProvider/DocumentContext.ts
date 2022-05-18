import { createContext } from "react";
import { Dispatch, State } from "./types";


export const DocumentStateContext = createContext<State | undefined>(undefined);
export const DocumentDispatchContext = createContext<Dispatch | undefined>(undefined);

