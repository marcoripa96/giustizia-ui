import styled from "@emotion/styled";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Container = styled.div({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '20px',
  paddingRight: '15px'
});

const ToolbarContentSkeleton = () => {
  return (
    <Container>
      <Skeleton width={250} height={20} />
    </Container>
  )
}

export default ToolbarContentSkeleton;
