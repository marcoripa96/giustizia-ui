import styled from "@emotion/styled";
import { useDocumentState } from "../DocumentProvider/selectors";
import { HiArrowLeft } from '@react-icons/all-files/hi/HiArrowLeft';
import { Button, Text } from "@nextui-org/react";
import { IconButton } from "@/components";
import Link from "next/link";

const Container = styled.div({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '20px',
  paddingRight: '15px'
});


const ToolbarContent = () => {
  const { data } = useDocumentState();
  if (!data) {
    // TODO: skeleton
    return null;
  }

  return (
    <Container>
      <Link href="/documents" passHref>
        <IconButton as="a"><HiArrowLeft /></IconButton>
      </Link>
      <Text h4>{data.title}</Text>
      <Button auto size="sm" disabled css={{ marginLeft: 'auto' }}>Save</Button>
    </Container>
  )
}

export default ToolbarContent;