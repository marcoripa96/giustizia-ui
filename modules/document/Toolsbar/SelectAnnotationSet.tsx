import { BaseSelect, BaseSelectItem } from "@/components/BaseSelect";
import { useSelector, selectDocumentActiveAnnotationSet, selectAllEntityAnnotationSets, useDocumentDispatch } from "../DocumentProvider/selectors";
import { MouseEvent } from "react";

const SelectAnnotationSet = () => {
  const activeAnnotationSet = useSelector(selectDocumentActiveAnnotationSet);
  const annotationSets = useSelector(selectAllEntityAnnotationSets);
  const dispatch = useDocumentDispatch();

  const handleChange = (event: MouseEvent, value: string | string[]) => {
    if (Array.isArray(value)) {
      return;
    }
    dispatch({
      type: 'changeAnnotationSet',
      payload: {
        annotationSet: value
      }
    })
  }

  return (
    <BaseSelect
      onChange={handleChange}
      value={activeAnnotationSet}
      inputProps={{
        labelLeft: 'Set:',
        'aria-label': 'select annotation set'
      }}>
      {annotationSets.map((item) => (
        <BaseSelectItem key={item.name} value={item.name} label={item.name}>
          {item.name}
        </BaseSelectItem>
      ))}
    </BaseSelect>
  )
}

export default SelectAnnotationSet;