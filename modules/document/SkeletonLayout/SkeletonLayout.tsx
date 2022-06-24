import { ToolbarLayout } from "@/components";
import styled from "@emotion/styled";
import DocumentSkeleton from "./DocumentSkeleton/DocumentSkeleton";
import LeftSidebarSkeleton from "./LeftActionBarSkeleton/LeftActionBarSkeleton";
import ToolbarContentSkeleton from "./ToolbarContentSkeleton/ToolbarContentSkeleton";
import { ToolsbarSkeleton } from "./ToolsbarSkeleton";

const Container = styled.div({
  height: 'calc(100vh - 48px)',
  display: 'flex',
  flexDirection: 'row',
})

const Content = styled.div({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  background: '#FAFAFA',
});

const SkeletonLayout = () => {

  return (
    <ToolbarLayout
      toolbarContent={<ToolbarContentSkeleton />}>
      <Container>
        <LeftSidebarSkeleton />
        <Content>
          <ToolsbarSkeleton />
          <DocumentSkeleton />
        </Content>
      </Container>
    </ToolbarLayout>
  )
}

export default SkeletonLayout;