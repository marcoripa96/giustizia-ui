import { Button } from "@/components";
import TagList from "@/components/TagList";
import { FlatTreeNode } from "@/components/TreeSpecialization";
import { useForm } from "@/hooks";
import { ContentProps } from "@/pages/taxonomy";
import styled from "@emotion/styled";
import { Input, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Description from "./Description";
import { useSelector, useTaxonomyDispatch } from "./TaxonomyProvider/selectors";

type NodeManagementProps = {
  typeKey: string;
  addNode?: boolean;
  changePageContent: (content: ContentProps) => void;
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

type FormState = {
  label: string;
  key: string;
  terms: string[];
}


const NodeManagement = ({ typeKey, addNode, changePageContent }: NodeManagementProps) => {
  const dispatch = useTaxonomyDispatch();
  const taxonomyNode = useSelector((state) => state.taxonomy[typeKey]);
  const { register, onSubmit, setValue, value } = useForm<FormState>({
    label: addNode ? '' : taxonomyNode.label,
    key: addNode ? '' : taxonomyNode.key,
    terms: addNode ? [] : (taxonomyNode.terms || [])
  });

  useEffect(() => {
    setValue({
      label: addNode ? '' : taxonomyNode.label,
      key: addNode ? '' : taxonomyNode.key,
      terms: addNode ? [] : (taxonomyNode.terms || [])
    })
  }, [taxonomyNode, addNode]);

  const handleSubmit = (value: FormState) => {
    if (addNode) {
      dispatch({
        type: 'addType',
        payload: {
          ...value,
          parent: typeKey
        }
      });
    } else {
      // c'è un problema con l'edit. la Key non deve essere anche la chiave del dizionario. Se pensiamo a mongo ad esempio è l'id di mongo. Quindi simulerei questa cosa
      // dispatch({
      //   type: 'editType',
      //   payload: {
      //     oldKey: typeKey,
      //     new: {
      //       ...value,
      //       parent: typeKey
      //     }
      //   }
      // });
    }
  }


  return (
    <Container as="form" onSubmit={onSubmit(handleSubmit)}>
      <Row>
        <Input size="lg" {...register('label')} label="Etichetta" placeholder="Nome del tipo" />
        <Input size="lg" {...register('key')} label="Tag" placeholder="Tag del tipo" />
      </Row>
      <Text>{`Aggiungi i termini più rappresentativi per il tipo:`}</Text>
      <TagList {...register('terms')} />
      <Button
        type="submit"
        css={{
          marginLeft: 'auto'
        }}>
        Save
      </Button>
    </Container>
  );
}

export default NodeManagement