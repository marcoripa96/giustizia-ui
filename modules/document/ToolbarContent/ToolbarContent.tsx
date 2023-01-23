import styled from "@emotion/styled";
import { selectDocumentData, useDocumentDispatch, useSelector } from "../DocumentProvider/selectors";
import { HiArrowLeft } from '@react-icons/all-files/hi/HiArrowLeft';
import { Text } from "@nextui-org/react";
import { IconButton, Button, useText } from "@/components";
import Link from "next/link";
import { useContext, useMutation } from "@/utils/trpc";
import { useQueryClient } from "react-query";
import { useParam } from "@/hooks";

const Container = styled.div({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '20px',
  paddingRight: '15px',
  minWidth: 0
});


const ToolbarContent = () => {
  const t = useText('document');
  const document = useSelector(selectDocumentData);
  const save = useMutation(['document.save']);
  const dispatch = useDocumentDispatch();
  const utils = useContext();
  const [id] = useParam<string>('id');


  const handleSave = () => {
    save.mutate({
      docId: id,
      doc: document
    }, {
      onSuccess: async (data) => {
        const v = await utils.refetchQueries({ queryKey: ['document.getDocument'] })
        console.log(v);
        // dispatch({
        //   type: 'udpateAnnotationSets',
        //   payload: {
        //     annotationSets: data
        //   }
        // })
      }
    })
  }

  return (
    <Container>
      <Link href="/documents" passHref>
        <IconButton as="a"><HiArrowLeft /></IconButton>
      </Link>
      <Text h4 css={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '500px' }}>{document.name}</Text>
      <Button
        auto
        size="sm"
        loading={save.isLoading}
        onClick={handleSave}
        css={{ marginLeft: 'auto' }}>
        {t('toolbar.save')}
      </Button>
    </Container>
  )
}

export default ToolbarContent;