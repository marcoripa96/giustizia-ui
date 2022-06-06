import { Flex } from "@/components";
import { useForm, useInput } from "@/hooks";
import styled from "@emotion/styled";
import { Button, Divider, FormElement, Input } from "@nextui-org/react";
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
  const [value, onChange] = useInput();
  const [label, setCurrentLabel] = useState<string>('https://');

  const handleChange = (event: ChangeEvent<FormElement>) => {
    const value = event.target.value;
    setCurrentLabel(detectKB(value));
    onChange(event);
  }

  return (
    <Flex direction="row" gap="10px">
      <Input
        value={value}
        onChange={handleChange}
        labelLeft={label}
        placeholder="Rosource link..."
        shadow={false}
        fullWidth
      />
      <Button auto flat>Add</Button>
    </Flex>
  )
}

const AddCandidateForm = () => {
  const { register } = useForm({
    title: ''
  });

  return (
    <Container>
      <AddCandidateLink />
      <Divider />
      <Form>
        <Input
          {...register('title')}
          placeholder="Candidate title"
          shadow={false}
          fullWidth
        />
      </Form>
    </Container>

  )
};

export default AddCandidateForm;