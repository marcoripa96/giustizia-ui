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

  const renderItems = () => {
    return annotationSets.map((item) => {
      const annotationName = item.name.split('_')[1];

      return (
        <BaseSelectItem key={item.name} value={item.name} label={annotationName}>
          {annotationName}
        </BaseSelectItem>
      )
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
      {renderItems()}
    </BaseSelect>
  )
}

export default SelectAnnotationSet;