import { Select } from "@/components";
import { useForm } from "@/hooks";
import styled from "@emotion/styled";
import { Button, Checkbox, Col, FormElement, Input, Modal, Text } from "@nextui-org/react"
import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from "react";
import { selectDocumentTaxonomy, useDocumentDispatch, useSelector } from "../DocumentProvider/selectors";
import { ascend, ParentNode } from "./Tree";

type SelectColorProps = {
  value: string;
  onChange: (value: string) => void;
}

const Row = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: '10px'
})

const SelectContainer = styled.div({
  flexGrow: 1
})

const ContainerSelectColor = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
  alignItems: 'center'
})

const ColorSquare = styled.div<{ color: string }>(({ color }) => ({
  width: '30px',
  height: '30px',
  borderRadius: '4px',
  background: color,
  border: '2px solid rgba(0,0,0,0.1)'
}));

/**
 * Select color form
 */
const SelectColor = ({ onChange, value }: SelectColorProps) => {
  const handleChange = (event: ChangeEvent<FormElement>) => {
    onChange(event.target.value);
  }

  return (
    <ContainerSelectColor>
      <ColorSquare color={value} />
      <SelectContainer>
        <Input
          aria-label="Type color"
          fullWidth
          bordered
          value={value}
          onChange={handleChange}
          shadow={false} />
      </SelectContainer>
    </ContainerSelectColor>
  )
};


type SelectTypeProps = {
  value: string;
  onChange: (value: string) => void;
}

const ContainerSelectType = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
  alignItems: 'center'
})

/**
 * Select type form
 */
const SelectType = ({ onChange, value: valueProp }: SelectTypeProps) => {
  const [value, setValue] = useState(valueProp);
  const [checked, setChecked] = useState(false);
  const taxonomy = useSelector(selectDocumentTaxonomy);

  const items = useMemo(() => {
    return Object.values(taxonomy).map((type) => {
      return {
        label: type.label,
        value: type.key
      }
    })
  }, [taxonomy]);

  const handleOnChange = (event: MouseEvent, value: string) => {
    console.log(value);
    setValue(value);
    onChange(value);
  }

  const handleCheck = () => {
    setChecked((s) => {
      const newState = !s;
      if (!newState) {
        setValue('');
        onChange('');
      }
      return newState;
    })
  }

  return (
    <ContainerSelectType>
      <Checkbox aria-label="Enable sub-type" isSelected={checked} onChange={handleCheck} />
      <Text css={{ margin: 0 }}>Subclass of</Text>
      <SelectContainer>
        <Select
          inputProps={{
            'aria-label': 'Type color',
            placeholder: 'Type',
            shadow: false,
            bordered: true,
            disabled: !checked
          }}
          items={items}
          value={value}
          onChange={handleOnChange} />
      </SelectContainer>
    </ContainerSelectType>
  )
};

type FormProps = {
  onClose: () => void;
}

type FormState = {
  label: string;
  key: string;
  parent: string;
  color: string;
}

const FormContainer = styled.form({
  display: 'flex',
  flexDirection: 'column',
})


/**
 * Form to add an annotation type
 */
const Form = ({ onClose }: FormProps) => {
  const { value, register, onSubmit, setValue } = useForm<FormState>({
    label: '',
    key: '',
    parent: '',
    color: '#AA9CFC'
  });
  const taxonomy = useSelector(selectDocumentTaxonomy);
  const dispatch = useDocumentDispatch();

  const { label, key, parent } = value;

  useEffect(() => {
    if (!parent) return;
    const parentNode = ascend(taxonomy, parent) as ParentNode;
    setValue({
      color: parentNode.color
    })
  }, [taxonomy, parent, dispatch])

  const handleOnBlurName = () => {
    if (label === '') return;
    if (key !== '') return;
    const typeKey = label.slice(0, 3).toUpperCase();
    setValue({ key: typeKey })
  }


  const handleForm = (data: FormState) => {
    dispatch({
      type: 'addTaxonomyType',
      payload: { type: data }
    })
    onClose();
  }

  return (
    <FormContainer onSubmit={onSubmit(handleForm)}>
      <Modal.Header>
        <Col css={{ textAlign: 'left' }}>
          <Text b size={18}>Add entity type</Text>
          <Text color="rgba(0,0,0,0.5)" css={{ lineHeight: 1.1 }} >
            Create a new type to be used to annotate entities in your documents.
          </Text>
        </Col>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Input
            aria-label="Name of the type"
            bordered
            placeholder="Name of new type"
            shadow={false}
            onBlur={handleOnBlurName}
            {...register('label')}
          />
          <Input
            aria-label="Tag of the type"
            bordered
            placeholder="Tag"
            shadow={false}
            {...register('key')}
          />
        </Row>
        <SelectType
          {...register('parent')} />
        <SelectColor {...register('color')} />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat onClick={onClose}>
          Cancel
        </Button>
        <Button auto type="submit">Add</Button>
      </Modal.Footer>
    </FormContainer>
  )
}

type AddAnnotationModalProps = {
  open: boolean;
  onClose: () => void;
}

/**
 * Modal which contains form to add a type
 */
const AddAnnotationModal = ({ open, onClose }: AddAnnotationModalProps) => {
  return (
    <Modal
      aria-labelledby="modal-title"
      open={open}
      onClose={onClose}
    >
      <Form onClose={onClose} />
    </Modal>
  )
}

export default AddAnnotationModal;