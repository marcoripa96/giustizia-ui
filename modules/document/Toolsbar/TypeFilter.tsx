import { AnnotationTypeFilter } from "@/components";
import { useSelector, selectDocumentTagTypeFilter, useDocumentDispatch, selectDocumentTaxonomy, selectActiveEntityAnnotations } from "../DocumentProvider/selectors";

const TypeFilter = () => {
  const annotations = useSelector(selectActiveEntityAnnotations);
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