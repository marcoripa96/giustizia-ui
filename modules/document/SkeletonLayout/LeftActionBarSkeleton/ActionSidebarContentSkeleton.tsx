import styled from '@emotion/styled';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '250px',
  borderRight: '1px solid #F3F3F5',
  padding: '10px',
  '@media screen and (max-width: 1250px)': {
    display: 'none'
  }
});


const ActionSidebarContentSkeleton = () => {
  return (
    <Container>
      <Skeleton width="100%" height="20px" />
      <p>
        <Skeleton width="50%" />
        <Skeleton width="45%" />
        <Skeleton width="80%" />
        <Skeleton width="70%" />
      </p>
      <p>
        <Skeleton width="50%" />
        <Skeleton width="45%" />
        <Skeleton width="80%" />
        <Skeleton width="70%" />
      </p>
      <p>
        <Skeleton width="50%" />
        <Skeleton width="45%" />
        <Skeleton width="80%" />
        <Skeleton width="70%" />
      </p>
      <p>
        <Skeleton width="50%" />
        <Skeleton width="45%" />
        <Skeleton width="80%" />
        <Skeleton width="70%" />
      </p>
    </Container>
  )
}

export default ActionSidebarContentSkeleton;