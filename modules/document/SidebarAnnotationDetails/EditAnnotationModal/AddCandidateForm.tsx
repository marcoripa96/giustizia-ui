import { Flex, useText } from "@/components";
import { useForm, useInput } from "@/hooks";
import styled from "@emotion/styled";
import { Button, Divider, FormElement, Input, Text, Textarea } from "@nextui-org/react";
import { ChangeEvent, useState } from "react";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  borderRadius: '6px',
  border: '1px solid #0072F5',
  padding: '10px'
})

const Form = styled.form({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  button: {
    marginRight: 'auto'
  }
})

const regexesKBs = [
  {
    regex: /(?:en|it)-?.wikipedia.org\/wiki\//,
    label: 'Wikipedia'
  },
  {
    regex: /dbpedia.org\/page/,
    label: 'DBPedia'
  },
  {
    regex: /geonames.org/,
    label: 'Geonames'
  }
]

const detectKB = (url: string) => {
  for (const r of regexesKBs) {
    if (url.match(r.regex)) {
      return r.label;
    }
  }
  return 'https://'
}

const AddCandidateLink = () => {
  const t = useText('document');
  const { binds, setValue } = useInput();
  const [label, setCurrentLabel] = useState<string>('https://');

  const handleChange = (event: ChangeEvent<FormElement>) => {
    const value = event.target.value;
    setCurrentLabel(detectKB(value));
    setValue(value);
  }

  return (
    <Flex direction="row" gap="10px">
      <Input
        {...binds}
        labelLeft={label}
        placeholder="Rosource link..."
        shadow={false}
        fullWidth
      />
      <Button auto>{t('modals.editAnnotation.addCandidate.add')}</Button>
    </Flex>
  )
}

const AddCandidateForm = () => {
  const t = useText('document');
  const { register } = useForm({
    title: '',
    description: ''
  });

  return (
    <Container>
      <Flex>
        <Text size={18} css={{ lineHeight: 1.2 }}>{t('modals.editAnnotation.addCandidate.title')}</Text>
        <Text size={16} css={{ color: 'rgba(0,0,0,0.5)' }}>
          {t('modals.editAnnotation.addCandidate.description')}
        </Text>
      </Flex>
      <AddCandidateLink />
      <Divider />
      <Form>
        <Input
          {...register('title')}
          aria-label="candidate-title"
          placeholder={t('modals.editAnnotation.addCandidate.candidateTitle')}
          shadow={false}
          fullWidth
        />
        <Textarea
          aria-label="candidate-description"
          {...register('description')}
          placeholder={t('modals.editAnnotation.addCandidate.candidateDescription')}
          shadow={false}
          fullWidth
        />
        <Button auto>{t('modals.editAnnotation.addCandidate.add')}</Button>
      </Form>
    </Container>

  )
};

export default AddCandidateForm;