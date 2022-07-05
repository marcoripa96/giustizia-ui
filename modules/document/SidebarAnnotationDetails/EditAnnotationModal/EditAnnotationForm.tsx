import { Flex } from "@/components";
import { useForm, useInput } from "@/hooks";
import { Candidate, EntityAnnotation } from "@/server/routers/document";
import styled from "@emotion/styled";
import { Button, Input, Modal, Text } from "@nextui-org/react";
import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import { Dispatch, SetStateAction, useMemo } from "react";
import { selectDocumentText, useDocumentDispatch, useSelector } from "../../DocumentProvider/selectors";
import EntityContext from "../EntityContext";
import TypesHierarchy from "../TypesHierarchy";
import AddLinkItem from "./AddLinkItem";
import LinkList from "./LinkList";
import SelectType from "./SelectType";

type FormProps = {
  annotation: EntityAnnotation;
  setAnnotation: Dispatch<SetStateAction<EntityAnnotation | undefined>>;
  setVisible: (value: boolean) => void;
}

type FormState = {
  type: string;
  linkCandidate: Candidate | undefined;
}

const Form = styled.form({
  display: 'flex',
  flexDirection: 'column'
})

function matchTitleContains(items: Candidate[], value: string) {
  const regex = new RegExp(value, 'i')
  return items.filter((cand) => cand.title.match(regex))
}

const EditAnnotationForm = ({ annotation, setAnnotation, setVisible }: FormProps) => {
  const {
    type,
    features: {
      linking: {
        candidates,
        top_candidate
      } = {}
    }
  } = annotation;
  const { value, register, onSubmit } = useForm<FormState>({
    type: type,
    linkCandidate: top_candidate
  });
  const { binds: searchBinds } = useInput('');
  const text = useSelector(selectDocumentText)
  const dispatch = useDocumentDispatch();

  const handleSubmit = (data: FormState) => {
    dispatch({
      type: 'editAnnotation',
      payload: {
        annotationId: annotation.id,
        topCandidate: data.linkCandidate,
        type: data.type
      }
    })
    setVisible(false);
  }

  const filteredCandidates = useMemo(() => {
    if (!candidates) return [];
    return matchTitleContains(candidates, searchBinds.value)
  }, [candidates, searchBinds.value]);

  return (
    <Form onSubmit={onSubmit(handleSubmit)}>
      <Modal.Body css={{ padding: '0px 24px' }}>
        <Flex direction="column" gap="10px">
          <Flex direction="column">
            <Text size={20}>Context</Text>
            {text && <EntityContext text={text} annotation={{ ...annotation, type: value.type }} />}
          </Flex>
          <Flex direction="column">
            <Text size={20}>Type</Text>
            <Text size={16} css={{ color: 'rgba(0,0,0,0.5)' }}>
              Edit the type of the entity by selecting it among the available ones.
            </Text>
          </Flex>
          <SelectType {...register('type')} />
          <TypesHierarchy type={value.type} />
          <Flex direction="column">
            <Text size={20}>Links</Text>
            <Text size={16} css={{ color: 'rgba(0,0,0,0.5)' }}>
              Edit links by selecting the true candidate for the entity.
            </Text>
          </Flex>

          <Input
            aria-label="Search link"
            placeholder="Search link..."
            shadow={false}
            {...searchBinds}
            contentLeft={<FiSearch />} />
          <AddLinkItem setAnnotation={setAnnotation} />
          <LinkList candidates={filteredCandidates} {...register('linkCandidate')} />
        </Flex>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat onClick={() => setVisible(false)} css={{
          background: 'rgba(0,0,0,0.1)',
          color: 'rgba(0,0,0,0.6)',
          '&:hover': {
            background: 'rgba(0,0,0,0.15)'
          }
        }}>
          Cancel
        </Button>
        <Button type="submit" auto>
          Confirm
        </Button>
      </Modal.Footer>
    </Form>

  )
}

export default EditAnnotationForm;
