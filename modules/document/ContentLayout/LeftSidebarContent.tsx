import styled from "@emotion/styled"
import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { UIAction } from "../DocumentProvider/types";
import { useDocumentAction } from "../DocumentProvider/selectors";

const Container = styled.div({
  position: 'fixed',
  top: '48px',
  left: '70px',
  bottom: '0px',
  display: 'flex',
  flexDirection: 'column',
  width: '250px',
  borderRight: '1px solid #F3F3F5',
  background: '#FFF'
});

const content: Record<UIAction, ComponentType> = {
  add: dynamic(() => import('../SidebarAddAnnotation/SidebarAddAnnotation')),
  select: () => null,
  delete: () => null,
  filter: () => null,
  settings: () => null
}

const SidebarContent = () => {
  const action = useDocumentAction();
  const Content = content[action.value];
  return (
    <Container>
      <Content />
    </Container>
  )
}

export default SidebarContent;