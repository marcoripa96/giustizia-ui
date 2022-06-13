import styled from "@emotion/styled";
import { selectDocumentData, useDocumentState, useSelector } from "../DocumentProvider/selectors";
import { HiArrowLeft } from '@react-icons/all-files/hi/HiArrowLeft';
import { Text } from "@nextui-org/react";
import { IconButton, Button } from "@/components";
import Link from "next/link";
import { useMutation, useQuery } from "@/utils/trpc";

const Container = styled.div({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '20px',
  paddingRight: '15px'
});


const ToolbarContent = () => {
  const document = useSelector(selectDocumentData);
  const save = useMutation(['document.save'])

  const handleSave = () => {
    save.mutate({
      entitiesAnnotations: document.annotation_sets.entities
    })
  }

  return (
    <Container>
      <Link href="/documents" passHref>
        <IconButton as="a"><HiArrowLeft /></IconButton>
      </Link>
      <Text h4>{document.name}</Text>
      <Button
        auto
        size="sm"
        loading={save.isLoading}
        onClick={handleSave}
        css={{ marginLeft: 'auto' }}>
        Save
      </Button>
    </Container>
  )
}

export default ToolbarContent;