import styled from "@emotion/styled"
import dynamic, { Loader } from "next/dynamic";
import { ComponentType } from "react";
import { UIAction } from "../../DocumentProvider/types";
import { selectDocumentAction, useSelector } from "../../DocumentProvider/selectors";
import ActionSidebarContentSkeleton from "./ActionSidebarContentSkeleton";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  flexGrow: 1,
  minWidth: 0
});

const dynamicWithLoading = (loader: Loader) => {
  return dynamic(loader, { loading: () => <ActionSidebarContentSkeleton /> })
}

const content: Record<UIAction, ComponentType> = {
  add: dynamicWithLoading(() => import('../../SidebarAddAnnotation/SidebarAddAnnotation')),
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
      <Content />
    </Container>
  )
}

export default ActionSidebarContent;