import { FlatTreeObj } from "@/components/TreeSpecialization";
import { PropsWithChildren, useReducer } from "react";
import { flatTaxonomy } from "../taxonomy";
import { TaxonomyDispatchContext, TaxonomyStateContext } from "./context";
import { taxonomyReducer } from "./reducer";

const TaxonomyProvider = ({ children }: PropsWithChildren<{}>) => {
  // query taxonomy
  // check if loading
  // if loading return skeleton / null for now

  return (
    <TaxonomyStateProvider data={flatTaxonomy}>
      {children}
    </TaxonomyStateProvider>
  )

};

type TaxonomyStateProviderProps = PropsWithChildren<{
  data: FlatTreeObj
}>

const TaxonomyStateProvider = ({
  data,
  children,
}: TaxonomyStateProviderProps) => {
  const [state, dispatch] = useReducer(taxonomyReducer, { taxonomy: data });

  return (
    <TaxonomyStateContext.Provider value={state}>
      <TaxonomyDispatchContext.Provider value={dispatch}>
        {children}
      </TaxonomyDispatchContext.Provider>
    </TaxonomyStateContext.Provider>
  )
};

export default TaxonomyProvider;