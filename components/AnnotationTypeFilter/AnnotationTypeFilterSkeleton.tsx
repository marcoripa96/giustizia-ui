import styled from "@emotion/styled";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
  padding: '5px',
})


const AnnotationTypeFilterSkeleton = () => {
  return (
    <Container>
      <Skeleton width={60} height={20} />
      <Skeleton width={60} height={20} />
      <Skeleton width={60} height={20} />
      <Skeleton width={60} height={20} />
      <Skeleton width={60} height={20} />
      <Skeleton width={60} height={20} />
      <Skeleton width={60} height={20} />
      <Skeleton width={60} height={20} />
    </Container>
  )
};

export default AnnotationTypeFilterSkeleton;