import { BaseSelect, Option } from "@/components/BaseSelect";
import { useSelector, selectDocumentActiveAnnotationSet, selectAllEntityAnnotationSets, useDocumentDispatch } from "../DocumentProvider/selectors";
import { MouseEvent } from "react";
import { useViewIndex } from "../ViewProvider/ViewProvider";
import { FiPlus } from '@react-icons/all-files/fi/FiPlus';

const SelectAnnotationSet = () => {
  const viewIndex = useViewIndex();
  const activeAnnotationSet = useSelector((state) => selectDocumentActiveAnnotationSet(state, viewIndex));
  const annotationSets = useSelector(selectAllEntityAnnotationSets);
  const dispatch = useDocumentDispatch();

  const openNewDialog = () => {
    dispatch({
      type: 'setUI',
      payload: {
        newAnnotationModalOpen: true
      }
    })
  }

  const handleChange = (event: MouseEvent, value: string | string[]) => {
    if (Array.isArray(value)) {
      return;
    }
    dispatch({
      type: 'changeAnnotationSet',
      payload: {
        viewIndex,
        annotationSet: value
      }
    })
  }

  const renderItems = () => {
    return annotationSets.map((item) => {
      const [key, ...rest] = item.name.split('_')
      const annotationName = rest.join('_')

      return (
        <Option key={item.name} value={item.name} label={annotationName}>
          {annotationName}
        </Option>
      )
    })
  }

  return (
    <BaseSelect
      onChange={handleChange}
      value={activeAnnotationSet}
      nonOptionNode={
        <Option key="new-ann-set" value="new-ann-set" label="new-ann-set" onClick={openNewDialog}>
          <FiPlus />
          New annotation set
        </Option>
      }
      inputProps={{
        labelLeft: 'Set:',
        'aria-label': 'select annotation set'
      }}>
      {renderItems()}
    </BaseSelect>
  )
}

export default SelectAnnotationSet;