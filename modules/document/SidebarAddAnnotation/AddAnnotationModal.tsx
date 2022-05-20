import { Item, Select } from "@/components";
import { useForm } from "@/hooks";
import { AnnotationType } from "@/hooks/use-ner";
import { isEmptyObject } from "@/utils/shared";
import styled from "@emotion/styled";
import { Button, Checkbox, Col, FormElement, Input, Modal, Text } from "@nextui-org/react"
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useDocumentDispatch, useDocumentTypes } from "../DocumentProvider/selectors";
import { getTypeFromPath } from "../DocumentProvider/utils";

type SelectColorProps = {
  value: string;
  onChange: (value: string) => void;
}

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

const getChildrenTypes = (path: string, children: Record<string, Omit<AnnotationType, "color">> | undefined): Item[] => {
  if (!children || isEmptyObject(children)) {
    return [];
  }
  return Object.keys(children).flatMap((subType) => {
    const subTypes = children[subType];
    const subPath = `${path}.${subType}`
    const item = {
      label: subTypes.label,
      value: subPath
    };
    return [item, ...getChildrenTypes(subPath, subTypes.children)];
  })
}

/**
 * Select type form
 */
const SelectType = ({ onChange, value: valueProp }: SelectTypeProps) => {
  const [value, setValue] = useState(valueProp);
  const [checked, setChecked] = useState(false);
  const types = useDocumentTypes();

  const items = useMemo(() => {
    // return Object.keys(types).flatMap((type) => {
    //   const { label, children } = types[type];
    //   const path = type;
    //   const item = {
    //     label: label,
    //     value: path
    //   };
    //   return [item, ...getChildrenTypes(path, children)];
    // });
    return [];
  }, [types]);

  const handleOnChange = (value: string) => {
    setValue(value);
    onChange(value);
  }

  const handleCheck = () => {
    setChecked((s) => {
      const newState = !s;
      if (!newState) {
        handleOnChange('');
      }
      return newState;
    })
  }

  return (
    <ContainerSelectType>
      <Checkbox aria-label="Enable sub-type" isSelected={checked} onChange={handleCheck} />
      <Text css={{ margin: 0 }}>Sub-type of</Text>
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
  name: string;
  type: string;
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
    name: '',
    type: '',
    color: '#AA9CFC'
  });
  const types = useDocumentTypes();
  const dispatch = useDocumentDispatch();

  const { type } = value;

  // useEffect(() => {
  //   if (!type) return;
  //   const typeObj = getTypeFromPath(types, type);
  //   if (!typeObj) return;

  //   setValue({
  //     color: typeObj.color
  //   })
  // }, [type, types])


  const handleForm = (data: FormState) => {
    dispatch({
      type: 'addType',
      payload: {
        label: data.name,
        path: data.type,
        color: data.color
      }
    })
    onClose();
  }

  return (
    <FormContainer onSubmit={onSubmit(handleForm)}>
      <Modal.Header>
        <Col css={{ textAlign: 'left' }}>
          <Text b size={18}>Add annotation type</Text>
          <Text color="rgba(0,0,0,0.5)" css={{ lineHeight: 1.1 }} >
            Create a new type to be used to annotate entities in your documents.
          </Text>
        </Col>
      </Modal.Header>
      <Modal.Body>
        <Input
          aria-label="Name of the type"
          bordered
          placeholder="Name of new type"
          shadow={false}
          {...register('name')}
        />
        <SelectType
          {...register('type')} />
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