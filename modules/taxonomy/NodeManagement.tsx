import { Button } from "@/components";
import TagList from "@/components/TagList";
import { FlatTreeNode } from "@/components/TreeSpecialization";
import { useForm, useParam } from "@/hooks";
import { ContentProps } from "@/pages/old/taxonomy";
import styled from "@emotion/styled";
import { Input, Text } from "@nextui-org/react";
import { FocusEvent, useEffect, useRef, useState } from "react";
import Description from "./Description";
import { useSelector, useTaxonomyDispatch } from "./TaxonomyProvider/selectors";

type NodeManagementProps = {
  taxonomyNode: FlatTreeNode;
  onSubmit: (value: NodeManagementFormState) => void;
  addNode?: boolean;
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

export type NodeManagementFormState = {
  label: string;
  key: string;
  terms: string[];
}


const NodeManagement = ({ taxonomyNode, addNode, onSubmit: onSubmitProp }: NodeManagementProps) => {
  // const taxonomyNode = useSelector((state) => state.taxonomy[typeKey]);

  const { isDirty, value, register, onSubmit, setValue } = useForm<NodeManagementFormState>({
    label: '',
    key: '',
    terms: []
  });
  const previousLabel = useRef<string>('');



  useEffect(() => {
    setValue({
      label: addNode ? '' : taxonomyNode.label,
      key: addNode ? '' : taxonomyNode.key,
      terms: addNode ? [] : (taxonomyNode.terms || [])
    })
  }, [taxonomyNode, addNode]);

  const handleOnBlur = () => {
    if (!addNode) return;

    const lbl = value.label.toLowerCase();
    if (lbl !== previousLabel.current) {
      setValue({
        terms: value.terms.length === 0
          ? [lbl]
          : value.terms.map((term) => term === previousLabel.current ? lbl : term)
      })
      previousLabel.current = lbl
    }
  }


  const toInputUppercase = (event: any) => {
    event.target.value = event.target.value.toUpperCase();
  };

  return (
    <Container as="form" onSubmit={onSubmit(onSubmitProp)}>
      <Row>
        <Input size="lg" {...register('label')} label="Nome" placeholder="Nome del tipo" onBlur={handleOnBlur} />
        <Input size="lg" onInput={toInputUppercase} {...register('key')} label="Tag" placeholder="Tag del tipo" />
      </Row>
      {(taxonomyNode.parent || addNode) && (
        <>
          <Text>{`Aggiungi i termini più rappresentativi per il tipo:`}</Text>
          <TagList {...register('terms')} />
        </>
      )}
      <Button
        type="submit"
        disabled={!isDirty}
        auto
        css={{
          marginRight: 'auto'
        }}>
        Salva modifiche
      </Button>
    </Container>
  );
}

export default NodeManagement