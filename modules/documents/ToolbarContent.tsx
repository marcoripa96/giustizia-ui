import styled from "@emotion/styled";
import { Input, useModal } from "@nextui-org/react";
import { FaSistrix } from '@react-icons/all-files/fa/FaSistrix';
import SearchModal from "./SearchModal";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
});


const ToolbarContent = () => {
  const { bindings, setVisible } = useModal();

  return (
    <>
      <Container>
        <Input
          css={{
            minWidth: '400px'
          }}
          aria-label="Search documents"
          shadow={false}
          contentLeft={<FaSistrix />}
          placeholder="Search for a document"
          status="default"
          onClick={() => setVisible(true)}
        />
      </Container>
      <SearchModal {...bindings} />
    </>
  )
};

export default ToolbarContent;