import { AnnotationTypeFilter } from "@/components";
import { useSelector, selectDocumentTagTypeFilter, useDocumentDispatch, selectDocumentTaxonomy, selectDocumentEntityAnnotations, selectAnnotationTypes } from "../DocumentProvider/selectors";

const TypeFilter = () => {
  // const annotations = useSelector(selectDocumentEntityAnnotations);
  // const taxonomy = useSelector(selectDocumentTaxonomy);
  const items = useSelector(selectAnnotationTypes);
  const typeFilters = useSelector(selectDocumentTagTypeFilter);
  const dispatch = useDocumentDispatch();

  const handleAnnotationTypeFilterChange = (types: string[]) => {
    dispatch({
      type: 'setUI',
      payload: {
        typeFilter: types
      }
    })
  }

  return (
    <AnnotationTypeFilter
      items={items}
      value={typeFilters}
      onChange={handleAnnotationTypeFilterChange}
    />
  )
};

export default TypeFilter;