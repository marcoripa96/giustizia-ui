import { createContext } from "react";
import { Dispatch, State } from "./reducer";


export const TaxonomyStateContext = createContext<State | undefined>(undefined);
export const TaxonomyDispatchContext = createContext<Dispatch | undefined>(undefined);