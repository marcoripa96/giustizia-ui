import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

type SidebarProps = PropsWithChildren<{
  open?: boolean;
}>;

const Container = styled.aside({
  display: 'flex',
  flexDirection: 'column',
  padding: '24px',
  border: '1px solid #eaeced'
})


function Sidebar({ open = false, children }: SidebarProps) {
  if (!open) {
    return null;
  }

  return (
    <Container>
      {children}
    </Container>
  );
};

export default Sidebar;