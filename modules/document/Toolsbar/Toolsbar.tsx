import styled from "@emotion/styled";
import SelectAnnotationSet from "./SelectAnnotationSet";
import SelectTypeFilter from "./SelectTypeFilter";

const Container = styled.div({
  position: 'sticky',
  top: '48px',
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
  alignitems: 'center',
  padding: '5px',
  background: '#FFF',
  borderBottom: '1px solid #F3F3F5',
  zIndex: 10
})


const Toolsbar = () => {

  return (
    <Container>
      <SelectAnnotationSet />
      <SelectTypeFilter />
    </Container>
  )
};

export default Toolsbar;