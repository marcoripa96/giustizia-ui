import styled from "@emotion/styled"
import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { UIAction } from "../../DocumentProvider/types";
import { useDocumentAction } from "../../DocumentProvider/selectors";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  flexGrow: 1
});

const content: Record<UIAction, ComponentType> = {
  add: dynamic(() => import('../../SidebarAddAnnotation/SidebarAddAnnotation')),
  select: () => null,
  delete: () => null,
  filter: () => null,
  settings: () => null
}

const ActionSidebarContent = () => {
  const action = useDocumentAction();
  const Content = content[action.value];

  return (
    <Container>
      <Content />
    </Container>
  )
}

export default ActionSidebarContent;