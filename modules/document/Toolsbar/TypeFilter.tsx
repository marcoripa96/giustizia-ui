import { AnnotationTypeFilter } from "@/components";
import { useSelector, selectDocumentTagTypeFilter, useDocumentDispatch, selectDocumentTaxonomy, selectDocumentEntityAnnotations } from "../DocumentProvider/selectors";

const TypeFilter = () => {
  const annotations = useSelector(selectDocumentEntityAnnotations);
  const taxonomy = useSelector(selectDocumentTaxonomy);
  const typeFitler = useSelector(selectDocumentTagTypeFilter);
  const dispatch = useDocumentDispatch();

  const handleAnnotationTypeFilterChange = (key: string) => {
    dispatch({
      type: 'setUI',
      payload: {
        typeFilter: key
      }
    })
  }

  return (
    <AnnotationTypeFilter
      value={typeFitler}
      onChange={handleAnnotationTypeFilterChange}
      taxonomy={taxonomy}
      annotations={annotations} />
  )
};

export default TypeFilter;