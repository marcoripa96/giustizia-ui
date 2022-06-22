import styled from "@emotion/styled";
import { selectViews, useSelector } from "../DocumentProvider/selectors";
import { useViewIndex } from "../ViewProvider/ViewProvider";
import FixedItems from "./FixedItems";
import SelectAnnotationSet from "./SelectAnnotationSet";
import SelectTypeFilter from "./SelectTypeFilter";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  minHeight: '52px',
  justifyContent: 'space-between',
  padding: '5px',
  background: '#FFF',
  borderBottom: '1px solid #F3F3F5'
})

const ItemsContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px'
})


const Toolsbar = () => {
  const views = useSelector(selectViews);
  const viewIndex = useViewIndex();

  const isLastView = views.length - 1 === viewIndex;

  return (
    <Container>
      <ItemsContainer>
        <SelectAnnotationSet />
        <SelectTypeFilter />
      </ItemsContainer>
      {isLastView && <FixedItems />}
    </Container>
  )
};

export default Toolsbar;