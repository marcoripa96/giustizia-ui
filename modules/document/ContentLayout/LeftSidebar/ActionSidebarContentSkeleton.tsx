import { Flex } from '@/components';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const ActionSidebarContentSkeleton = () => {
  return (
    <Flex direction="column" padding="10px">
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
    </Flex>
  )
}

export default ActionSidebarContentSkeleton;