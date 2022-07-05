import styled from "@emotion/styled";
import { selectDocumentData, useDocumentDispatch, useSelector } from "../DocumentProvider/selectors";
import { HiArrowLeft } from '@react-icons/all-files/hi/HiArrowLeft';
import { Text } from "@nextui-org/react";
import { IconButton, Button } from "@/components";
import Link from "next/link";
import { useMutation } from "@/utils/trpc";

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
  const save = useMutation(['document.save']);
  const dispatch = useDocumentDispatch();

  const handleSave = () => {
    save.mutate({
      docId: document._id,
      annotationSets: document.annotation_sets
    }, {
      onSuccess: (data) => {
        dispatch({
          type: 'udpateAnnotationSets',
          payload: {
            annotationSets: data
          }
        })
      }
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