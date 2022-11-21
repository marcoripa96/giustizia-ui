import { Flex, useText } from '@/components';
import { useForm, useInput } from '@/hooks';
import { Candidate, EntityAnnotation } from '@/server/routers/document';
import styled from '@emotion/styled';
import { Button, Input, Modal, Text } from '@nextui-org/react';
import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { Dispatch, SetStateAction, useMemo } from 'react';
import {
  selectDocumentText,
  useDocumentDispatch,
  useSelector,
} from '../../DocumentProvider/selectors';
import EntityContext from '../EntityContext';
import TypesHierarchy from '../TypesHierarchy';
import AddLinkItem from './AddLinkItem';
import LinkList from './LinkList';
import SelectType from './SelectType';

type FormProps = {
  annotation: EntityAnnotation;
  setAnnotation: Dispatch<SetStateAction<EntityAnnotation | undefined>>;
  setVisible: (value: boolean) => void;
};

type FormState = {
  types: string[];
  linkCandidate: {
    url: string;
    title: string;
  };
};

const Form = styled.form({
  display: 'flex',
  flexDirection: 'column',
});

function matchTitleContains(items: Candidate[], value: string) {
  const regex = new RegExp(value, 'i');
  return items.filter((cand) => cand.title.match(regex));
}

const EditAnnotationForm = ({
  annotation,
  setAnnotation,
  setVisible,
}: FormProps) => {
  const t = useText('document');
  const {
    type,
    features: {
      is_nil,
      title,
      url,
      types,
      additional_candidates,
      // linking: {
      //   candidates,
      //   top_candidate
      // } = {}
    },
  } = annotation;
  const resolvedTypes = Array.from(new Set([type, ...(types || [])]));

  const { value, register, onSubmit } = useForm<FormState>({
    types: resolvedTypes,
    linkCandidate: { url, title },
  });
  const { binds: searchBinds } = useInput('');
  const text = useSelector(selectDocumentText);
  const dispatch = useDocumentDispatch();

  const handleSubmit = (data: FormState) => {
    dispatch({
      type: 'editAnnotation',
      payload: {
        annotationId: annotation.id,
        topCandidate: data.linkCandidate,
        types: data.types,
      },
    });
    setVisible(false);
  };

  const filteredCandidates = useMemo(() => {
    if (!additional_candidates) return [];
    return matchTitleContains(additional_candidates, searchBinds.value);
  }, [additional_candidates, searchBinds.value]);

  const tempAnn = {
    ...annotation,
    type: value.types[0],
    features: {
      ...annotation.features,
      types: value.types.slice(1),
    },
  };

  return (
    <Form onSubmit={onSubmit(handleSubmit)}>
      <Modal.Body css={{ padding: '0px 24px' }}>
        <Flex direction="column" gap="10px">
          <Flex direction="column">
            <Text size={20}>{t('modals.editAnnotation.context')}</Text>
            {text && <EntityContext text={text} annotation={tempAnn} />}
          </Flex>
          <Flex direction="column">
            <Text size={20}>{t('modals.editAnnotation.type')}</Text>
            <Text size={16} css={{ color: 'rgba(0,0,0,0.5)' }}>
              {t('modals.editAnnotation.typeDescription')}
            </Text>
          </Flex>
          <SelectType {...register('types')} />
          {value.types.map((type, index) => (
            <Flex key={type} direction="row" alignItems="center" gap="5px">
              <Text size={11} b>
                {index + 1}.
              </Text>
              <TypesHierarchy type={type} />
            </Flex>
          ))}
          <Flex direction="column">
            <Text size={20}>{t('modals.editAnnotation.links')}</Text>
            <Text size={16} css={{ color: 'rgba(0,0,0,0.5)' }}>
              {t('modals.editAnnotation.linksDescription')}
            </Text>
          </Flex>

          <Input
            aria-label="Search link"
            placeholder={t('modals.editAnnotation.searchLink')}
            shadow={false}
            {...searchBinds}
            contentLeft={<FiSearch />}
          />
          <AddLinkItem setAnnotation={setAnnotation} />
          <LinkList
            candidates={filteredCandidates}
            {...register('linkCandidate')}
          />
        </Flex>
      </Modal.Body>
      <Modal.Footer>
        <Button
          auto
          flat
          onClick={() => setVisible(false)}
          css={{
            background: 'rgba(0,0,0,0.1)',
            color: 'rgba(0,0,0,0.6)',
            '&:hover': {
              background: 'rgba(0,0,0,0.15)',
            },
          }}
        >
          {t('modals.editAnnotation.btnCancel')}
        </Button>
        <Button type="submit" auto>
          {t('modals.editAnnotation.btnConfirm')}
        </Button>
      </Modal.Footer>
    </Form>
  );
};

export default EditAnnotationForm;
