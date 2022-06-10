import styled from "@emotion/styled";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  width: '70px',
  height: '100%',
  padding: '16px 12px',
  borderRight: '1px solid #F3F3F5',
});


const ActionBarSkeleton = () => {
  return (
    <Container>
      <Skeleton width={40} height={40} borderRadius="4px" />
      <Skeleton width={40} height={40} borderRadius="4px" />
      <Skeleton width={40} height={40} borderRadius="4px" />
      <Skeleton width={40} height={40} borderRadius="4px" />
    </Container>
  )
}

export default ActionBarSkeleton;