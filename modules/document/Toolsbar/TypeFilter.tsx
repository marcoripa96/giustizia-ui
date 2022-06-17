import { AnnotationTypeFilter } from "@/components";
import { useSelector, selectDocumentTagTypeFilter, useDocumentDispatch, selectDocumentTaxonomy, selectDocumentEntityAnnotations } from "../DocumentProvider/selectors";

const TypeFilter = () => {
  const annotations = useSelector(selectDocumentEntityAnnotations);
  const taxonomy = useSelector(selectDocumentTaxonomy);
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
      taxonomy={taxonomy}
      annotations={annotations}
      value={typeFilters}
      onChange={handleAnnotationTypeFilterChange}
    />
  )
};

export default TypeFilter;