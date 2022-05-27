import styled from "@emotion/styled";
import ActionSidebar from "./ActionSidebar";
import ActionSidebarContent from "./ActionSidebarContent";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  position: 'fixed',
  top: '48px',
  left: 0,
  bottom: 0,
  width: '320px',
  borderRight: '1px solid #F3F3F5',
  background: '#FFF',
  zIndex: 100
})


const LeftSidebar = () => {
  return (
    <Container>
      <ActionSidebar />
      <ActionSidebarContent />
    </Container>
  )
}

export default LeftSidebar;
