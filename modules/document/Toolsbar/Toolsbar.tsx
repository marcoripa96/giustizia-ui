import styled from "@emotion/styled";
import { Switch } from "@nextui-org/react";
import TypeFilter from "./TypeFilter";

const Container = styled.div({
  position: 'sticky',
  top: '48px',
  display: 'flex',
  flexDirection: 'row',
  alignitems: 'center',
  padding: '5px',
  background: '#FFF',
  borderBottom: '1px solid #F3F3F5',
  zIndex: 10
})

const Toolsbar = () => {
  return (
    <Container>
      {/* <Switch
      <Switch initialChecked />; */}
      <TypeFilter />
    </Container>
  )
};

export default Toolsbar;