import styled from "@emotion/styled";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Container = styled.div({
  position: 'sticky',
  top: '48px',
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
  alignitems: 'center',
  padding: '10px',
  background: '#FFF',
  borderBottom: '1px solid #F3F3F5',
  zIndex: 10
})

const Toolsbar = () => {
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

export default Toolsbar;