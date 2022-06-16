import styled from "@emotion/styled";
import ActionBarSkeleton from "./ActionBarSkeleton";
import ActionSidebarContentSkeleton from "./ActionSidebarContentSkeleton";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  position: 'fixed',
  top: '48px',
  left: 0,
  bottom: 0,
  background: '#FFF',
  zIndex: 100,
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