import { Button } from "@/components";
import TagList from "@/components/TagList";
import { FlatTreeNode } from "@/components/TreeSpecialization";
import { useForm } from "@/hooks";
import styled from "@emotion/styled";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Description from "./Description";
import { useSelector } from "./TaxonomyProvider/selectors";

type NodeManagementProps = {
  typeKey: string;
  editMode: boolean;
  changeRightContent: (content: JSX.Element) => void;
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
})

const Row = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px'
})

const handleSave = (key: string, changeRightContent: (content: JSX.Element) => void) => {
  window.alert('TODO: 1- update taxonomy \n2- go to the general view')
  changeRightContent(<Description />)
}

type FormProps = {
  taxonomyNode: FlatTreeNode;
}

const Form = ({ taxonomyNode }: FormProps) => {
  const { register, onSubmit, setValue } = useForm({
    label: taxonomyNode.label,
    key: taxonomyNode.key,
    terms: taxonomyNode.terms || []
  });

  useEffect(() => {
    setValue({
      label: taxonomyNode.label,
      key: taxonomyNode.key,
      terms: taxonomyNode.terms || []
    })
  }, [taxonomyNode])


  return (
    <Container as="form">
      <Row>
        <Input {...register('label')} label="Etichetta" placeholder="Nome del tipo" />
        <Input {...register('key')} label="Tag" placeholder="Tag del tipo" />
      </Row>
      <TagList {...register('terms')} />
    </Container>
    // <div>
    //   <h1>Node Management</h1>
    //   <span>{editMode ? 'Modify type' + key : 'Add new type under ' + key }</span>
    //   <Button onClick={() => handleSave(key, changeRightContent)}>Conferma</Button>
    // </div>
  )
}

const NodeManagement = ({ typeKey, editMode, changeRightContent }: NodeManagementProps) => {
  const taxonomyNode = useSelector((state) => state.taxonomy[typeKey]);

  return (
    <Form taxonomyNode={taxonomyNode} />
    // <div>
    //   <h1>Node Management</h1>
    //   <span>{editMode ? 'Modify type' + key : 'Add new type under ' + key }</span>
    //   <Button onClick={() => handleSave(key, changeRightContent)}>Conferma</Button>
    // </div>
  )
}

export default NodeManagement