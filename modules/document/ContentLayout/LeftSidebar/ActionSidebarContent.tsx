import styled from "@emotion/styled"
import dynamic, { Loader } from "next/dynamic";
import { ComponentType, Suspense } from "react";
import { UIAction } from "../../DocumentProvider/types";
import { selectDocumentAction, useSelector } from "../../DocumentProvider/selectors";
import ActionSidebarContentSkeleton from "./ActionSidebarContentSkeleton";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '250px',
  borderRight: '1px solid #F3F3F5',
});

const content: Record<UIAction, ComponentType> = {
  add: dynamic(() => import('../../SidebarAddAnnotation/SidebarAddAnnotation'), {
    suspense: true
  }),
  select: () => null,
  delete: () => null,
  filter: () => null,
  settings: () => null
}

const ActionSidebarContent = () => {
  const action = useSelector(selectDocumentAction);
  const Content = content[action.value];

  return (
    <Container>
      <Suspense fallback={<ActionSidebarContentSkeleton />}>
        <Content />
      </Suspense>
    </Container>
  )
}

export default ActionSidebarContent;