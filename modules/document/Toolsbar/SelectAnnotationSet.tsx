import { BaseSelect, Option } from "@/components/BaseSelect";
import { useSelector, selectDocumentActiveAnnotationSet, selectAllEntityAnnotationSets, useDocumentDispatch, selectDocumentId } from "../DocumentProvider/selectors";
import { MouseEvent, useCallback, useMemo } from "react";
import { useViewIndex } from "../ViewProvider/ViewProvider";
import { FiPlus } from '@react-icons/all-files/fi/FiPlus';
import styled from "@emotion/styled";
import { FiX } from "@react-icons/all-files/fi/FiX";
import { useMutation } from "@/utils/trpc";
import { AnnotationSet, EntityAnnotation } from "@/server/routers/document";
import { ConfirmationDialog, useConfirmationDialog, useText } from "@/components";

const DeleteButton = styled.button({
  height: '20px',
  width: '20px',
  padding: 0,
  border: 'none',
  outline: 'none',
  borderRadius: '6px',
  background: 'transparent',
  visibility: 'hidden',
  cursor: 'pointer',
  '&:hover': {
    background: 'rgba(0,0,0,0.1)',
  },
  '> svg': {
    width: '100%',
    height: '100%',
    color: 'rgba(0,0,0,0.5)'
  }
})

const OptionContainer = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:hover': {
    '& > button': {
      visibility: 'visible'
    }
  },
})

type ProcessedAnnotationSet = AnnotationSet<EntityAnnotation> & {
  readableName: string;
}

const addReadableName = (annotationSets: AnnotationSet<EntityAnnotation>[]): ProcessedAnnotationSet[] => {
  const processedAnnotationSets = annotationSets.map((item) => {
    const [key, ...rest] = item.name.split('_')
    const annotationName = rest.join('_');
    return { ...item, readableName: annotationName };
  }).sort((a, b) => a.readableName.toLowerCase() < b.readableName.toLowerCase() ? -1 : 1);
  return processedAnnotationSets;
}

type DeleteModalProps = {
  onConfirm: () => void;
}


const SelectAnnotationSet = () => {
  const t = useText('document');
  const viewIndex = useViewIndex();
  const docId = useSelector(selectDocumentId);
  const activeAnnotationSet = useSelector((state) => selectDocumentActiveAnnotationSet(state, viewIndex));
  const annotationSets = useSelector(selectAllEntityAnnotationSets);
  const deleteAnnotationSet = useMutation(['document.deleteAnnotationSet']);
  const dispatch = useDocumentDispatch();

  const {
    bindings: bindingsDeleteAnnSet,
    props: propsDeleteAnnSet,
    setVisible: setDeleteAnnSetVisible
  } = useConfirmationDialog<DeleteModalProps>();

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

  const handleDeleteAnnotationSet = (event: MouseEvent<HTMLButtonElement>, annSet: ProcessedAnnotationSet) => {
    event.stopPropagation();

    const onConfirm = () => {
      if (annSet._id) {
        deleteAnnotationSet.mutate({
          docId,
          annotationSetId: annSet._id
        })
      }
      dispatch({
        type: 'deleteAnnotationSet',
        payload: {
          name: annSet.name
        }
      })
      setDeleteAnnSetVisible({ open: false })
    }
    setDeleteAnnSetVisible({ open: true, props: { onConfirm } })
  }

  const renderItems = () => {
    const processedAnnotationSets = addReadableName(annotationSets);

    return processedAnnotationSets.map((item) => {
      return (
        <Option key={item.name} value={item.name} label={item.readableName}>
          <OptionContainer>
            {item.readableName}
            <DeleteButton onClick={(event) => handleDeleteAnnotationSet(event, item)}>
              <FiX />
            </DeleteButton>
          </OptionContainer>
        </Option>
      )
    })
  }

  return (
    <>
      <BaseSelect
        onChange={handleChange}
        value={activeAnnotationSet}
        nonOptionNode={
          <Option key="new-ann-set" value="new-ann-set" label="new-ann-set" onClick={openNewDialog}>
            <FiPlus />
            {t('subToolbar.annotationSet.new')}
          </Option>
        }
        inputProps={{
          labelLeft: t('subToolbar.annotationSet.label'),
          'aria-label': 'select annotation set'
        }}>
        {renderItems()}
      </BaseSelect>
      <ConfirmationDialog
        {...bindingsDeleteAnnSet}
        {...propsDeleteAnnSet}
        content="You are trying to delete an annotation set and all of its annotations. Are you sure?" />
    </>

  )
}

export default SelectAnnotationSet;