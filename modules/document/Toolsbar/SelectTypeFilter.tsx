import { BaseSelect, BaseSelectItem } from "@/components/BaseSelect";
import { useSelector, useDocumentDispatch, selectActiveEntityAnnotations, selectDocumentTagTypeFilter, selectDocumentTaxonomy } from "../DocumentProvider/selectors";
import { MouseEvent, useMemo } from "react";
import { Checkbox } from "@nextui-org/react";
import { getAnnotationTypes } from "../DocumentProvider/utils";

const SelectTypeFilter = () => {
  const annotations = useSelector(selectActiveEntityAnnotations);
  const taxonomy = useSelector(selectDocumentTaxonomy);
  const typeFilters = useSelector(selectDocumentTagTypeFilter);
  const dispatch = useDocumentDispatch();


  const handleChange = (event: MouseEvent, value: string | string[]) => {
    if (!Array.isArray(value)) {
      return;
    }
    dispatch({
      type: 'setUI',
      payload: {
        typeFilter: value
      }
    })
  }

  const items = useMemo(() => {
    return getAnnotationTypes(taxonomy, annotations);
  }, [taxonomy, annotations]);

  return (
    <BaseSelect
      onChange={handleChange}
      value={typeFilters}
      multiple
      inputProps={{
        labelLeft: 'Types:',
        'aria-label': 'Select type filter'
      }}>
      {items.map((item) => (
        <BaseSelectItem key={item.key} value={item.key} label={item.label}>
          <Checkbox aria-label="Select item" isSelected={typeFilters.indexOf(item.key) !== -1} />
          {item.label}
        </BaseSelectItem>
      ))}
    </BaseSelect>
  )
}

export default SelectTypeFilter;