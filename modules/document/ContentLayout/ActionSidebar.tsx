import styled from "@emotion/styled";
import ButtonGroup from "./ButtonGroup";


const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});


const ActionSidebar = () => {
  return (
    <Container>
      <ButtonGroup />
    </Container>
  )
}

export default ActionSidebar;