import { ToolbarLayout } from "@/components";
import useMediaQuery from "@/hooks/use-media-query";
import styled from "@emotion/styled";
import DocumentSkeleton from "./DocumentSkeleton/DocumentSkeleton";
import LeftSidebarSkeleton from "./LeftActionBarSkeleton/LeftActionBarSkeleton";
import ToolbarContentSkeleton from "./ToolbarContentSkeleton/ToolbarContentSkeleton";

const Container = styled.div<{ leftSidebarOpen: boolean }>(({ leftSidebarOpen }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: leftSidebarOpen ? '320px' : '70px',
  paddingRight: '320px',
  background: '#FAFAFA',
}));

const SkeletonLayout = () => {
  const matches = useMediaQuery('(max-width: 1250px)');

  return (
    <ToolbarLayout
      toolbarContent={<ToolbarContentSkeleton />}>
      <Container leftSidebarOpen={!matches}>
        <LeftSidebarSkeleton />
        <DocumentSkeleton />
      </Container>
    </ToolbarLayout>
  )
}

export default SkeletonLayout;