import styled from "@emotion/styled";
import ActionBarSkeleton from "./ActionBarSkeleton";
import ActionSidebarContentSkeleton from "./ActionSidebarContentSkeleton";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  background: '#FFF',
})

const LeftSidebarSkeleton = () => {

  return (
    <Container>
      <ActionBarSkeleton />
      <ActionSidebarContentSkeleton />
    </Container>
  )
}

export default LeftSidebarSkeleton;
