import styled from "@emotion/styled";
import ButtonGroup from "./ButtonGroup";


const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  width: '70px',
  height: '100%',
  // padding: '16px 12px',
  borderRight: '1px solid #F3F3F5',
});


const ActionSidebar = () => {
  return (
    <Container>
      <ButtonGroup />
    </Container>
  )
}

export default ActionSidebar;