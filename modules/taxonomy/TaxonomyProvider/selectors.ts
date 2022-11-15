import { buildTreeFromFlattenedObject } from "@/components/TreeSpecialization";
import { useContext } from "react";
import { createSelector } from "reselect";
import { TaxonomyDispatchContext, TaxonomyStateContext } from "./context";
import { State } from "./reducer";

/**
 * Access the document state within the DocumentProvider.
 */
export const useTaxonomyState = () => {
  const context = useContext(TaxonomyStateContext);

  if (context === undefined) {
    throw new Error('useTaxonomyState must be used within a TaxonomyProvider');
  }

  return context;
};

/**
 * Access the document disptach within the DocumentProvider.
 */
export const useTaxonomyDispatch = () => {
  const context = useContext(TaxonomyDispatchContext);

  if (context === undefined) {
    throw new Error(
      'useTaxonomyDispatch must be used within a TaxonomyProvider'
    );
  }

  return context;
};

export function useSelector<T>(cb: (state: State) => T) {
  const _state = useTaxonomyState();
  return cb(_state);
}


// SELECTORS
export const selectFlatTaxonomy = (state: State) => state.taxonomy;

export const selectTreeTaxonomy = createSelector(
  [selectFlatTaxonomy],
  (flatTaxonomy) => buildTreeFromFlattenedObject(flatTaxonomy)
);
