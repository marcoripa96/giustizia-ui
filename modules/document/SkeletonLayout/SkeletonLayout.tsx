import { ToolbarLayout } from "@/components";
import styled from "@emotion/styled";
import DocumentSkeleton from "./DocumentSkeleton/DocumentSkeleton";
import LeftSidebarSkeleton from "./LeftActionBarSkeleton/LeftActionBarSkeleton";
import ToolbarContentSkeleton from "./ToolbarContentSkeleton/ToolbarContentSkeleton";
import { ToolsbarSkeleton } from "./ToolsbarSkeleton";

// const Container = styled.div({
//   display: 'flex',
//   flexDirection: 'column',
//   paddingLeft: '320px',
//   paddingRight: '320px',
//   background: '#FAFAFA',
//   '@media screen and (max-width: 1250px)': {
//     paddingLeft: '70px'
//   }
// });

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '320px',
  background: '#FAFAFA',
  '@media screen and (max-width: 1250px)': {
    paddingLeft: '70px'
  }
});

const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
  paddingRight: '320px',
  background: '#FAFAFA',
});

const SkeletonLayout = () => {

  return (
    <ToolbarLayout
      toolbarContent={<ToolbarContentSkeleton />}>
      <LeftSidebarSkeleton />
      <Container>
        <ToolsbarSkeleton />
        <Content>
          <DocumentSkeleton />
        </Content>
      </Container>
    </ToolbarLayout>
  )
}

export default SkeletonLayout;