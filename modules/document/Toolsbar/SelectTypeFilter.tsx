import { BaseSelect, Option } from "@/components/BaseSelect";
import { useSelector, useDocumentDispatch, selectActiveEntityAnnotations, selectDocumentTagTypeFilter, selectDocumentTaxonomy } from "../DocumentProvider/selectors";
import { MouseEvent, useMemo } from "react";
import { Checkbox } from "@nextui-org/react";
import { getAnnotationTypes } from "../DocumentProvider/utils";
import { useViewIndex } from "../ViewProvider/ViewProvider";
import { useText } from "@/components";

const SelectTypeFilter = () => {
  const t = useText('document');
  const viewIndex = useViewIndex();
  const annotations = useSelector((state) => selectActiveEntityAnnotations(state, viewIndex));
  const taxonomy = useSelector(selectDocumentTaxonomy);
  const typeFilters = useSelector((state) => selectDocumentTagTypeFilter(state, viewIndex));
  const dispatch = useDocumentDispatch();


  const handleChange = (event: MouseEvent, value: string | string[]) => {
    if (!Array.isArray(value)) {
      return;
    }
    dispatch({
      type: 'setView',
      payload: {
        viewIndex,
        view: {
          typeFilter: value
        }
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
        labelLeft: t('subToolbar.types.label'),
        'aria-label': 'Select type filter'
      }}>
      {items.map((item) => (
        <Option key={item.key} value={item.key} label={item.label}>
          <Checkbox aria-label="Select item" isSelected={typeFilters.indexOf(item.key) !== -1} />
          {item.label}
        </Option>
      ))}
    </BaseSelect>
  )
}

export default SelectTypeFilter;