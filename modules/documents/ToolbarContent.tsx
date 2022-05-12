import { useQuery } from "@/utils/trpc";
import styled from "@emotion/styled";
import { Avatar, Button, Input, Popover } from "@nextui-org/react";
import { FaSignOutAlt } from "@react-icons/all-files/fa/FaSignOutAlt";
import { FaSistrix } from '@react-icons/all-files/fa/FaSistrix';
import Link from "next/link";
import { useRouter } from "next/router";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
});


const ToolbarContent = () => {
  return (
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
      />
    </Container>
  )
};

export default ToolbarContent;