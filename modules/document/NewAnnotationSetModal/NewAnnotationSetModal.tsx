import { Flex } from "@/components";
import { BaseSelect, Option } from "@/components/BaseSelect";
import { useForm } from "@/hooks";
import styled from "@emotion/styled";
import { Button, Input, Modal, Text } from "@nextui-org/react";
import { selectAllEntityAnnotationSets, selectNewAnnotationModalOpen, useDocumentDispatch, useSelector } from "../DocumentProvider/selectors";

const FormContainer = styled.form({
  display: 'flex',
  flexDirection: 'column'
})

type FormState = {
  name: string;
  preset: string;
}

type FormProps = {
  onClose: () => void;
}

const Form = ({ onClose }: FormProps) => {
  const annotationSets = useSelector(selectAllEntityAnnotationSets);
  const dispatch = useDocumentDispatch();

  const { register, onSubmit } = useForm<FormState>({
    name: '',
    preset: ''
  })

  const renderItems = () => {
    return annotationSets.map((item) => {
      const annotationName = item.name.split('_')[1];

      return (
        <Option key={item.name} value={item.name} label={annotationName}>
          {annotationName}
        </Option>
      )
    })
  }

  const handleSubmit = (formValues: FormState) => {
    dispatch({
      type: 'createAnnotationSet',
      payload: formValues
    })
    onClose();
  }

  return (
    <FormContainer onSubmit={onSubmit(handleSubmit)}>
      <Modal.Body css={{ paddingTop: 10, paddingBottom: 10 }}>
        <Input {...register('name')} bordered label="Annotation Set name" />
        <BaseSelect {...register('preset')} onTop inputProps={{ label: 'Preset' }}>
          <Option value="" label="Empty (without pre-existing annotations)">
            Empty (without pre-existing annotations)
          </Option>
          {renderItems()}
        </BaseSelect>
      </Modal.Body>
      <Modal.Footer>
        <Button auto size="sm" flat onClick={onClose} css={{
          background: 'rgba(0,0,0,0.1)',
          color: 'rgba(0,0,0,0.6)',
          '&:hover': {
            background: 'rgba(0,0,0,0.15)'
          }
        }}>
          Cancel
        </Button>
        <Button type="submit" auto size="sm">Create</Button>
      </Modal.Footer>
    </FormContainer>
  )
}

const NewAnnotationSetModal = () => {
  const isOpen = useSelector(selectNewAnnotationModalOpen);
  const dispatch = useDocumentDispatch();


  const closeModal = () => {
    dispatch({
      type: 'setUI',
      payload: {
        newAnnotationModalOpen: false
      }
    })
  }

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Modal.Header>
        <Flex>
          <Text id="modal-title" size={18}>
            Create a new Annotation Set
          </Text>
          <Text id="modal-title" size={16} css={{ color: 'rgba(0,0,0,0.5)', textAlign: 'left', lineHeight: 1.2 }}>
            Create a new annotation set. Select an empty preset or an existing set of annotations as starting point:
          </Text>
        </Flex>
      </Modal.Header>
      <Form onClose={closeModal} />
    </Modal>
  )
};

export default NewAnnotationSetModal;