import { createContext } from "react";
import { Dispatch, State } from "./types";


export const ReviewStateContext = createContext<State | undefined>(undefined);
export const ReviewDispatchContext = createContext<Dispatch | undefined>(undefined);

