import { AnnotationTypeFilter } from "@/components";
import { useSelector, selectDocumentTagTypeFilter, useDocumentDispatch, selectDocumentTaxonomy, selectActiveEntityAnnotations } from "../DocumentProvider/selectors";
import { useViewIndex } from "../ViewProvider/ViewProvider";

const TypeFilter = () => {
  const viewIndex = useViewIndex();
  const annotations = useSelector((state) => selectActiveEntityAnnotations(state, viewIndex));
  const taxonomy = useSelector(selectDocumentTaxonomy);
  const typeFilters = useSelector((state) => selectDocumentTagTypeFilter(state, viewIndex));
  const dispatch = useDocumentDispatch();

  const handleAnnotationTypeFilterChange = (types: string[]) => {
    dispatch({
      type: 'setView',
      payload: {
        viewIndex,
        view: {
          typeFilter: types
        }
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