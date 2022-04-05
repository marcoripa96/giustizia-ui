import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoaderSkeleton = () => {
  return (
    <>
      <p>
        <Skeleton width="90%" />
        <Skeleton width="100%" />
        <Skeleton width="95%" />
      </p>
      <p>
        <Skeleton width="50%" />
        <Skeleton width="45%" />
        <Skeleton width="80%" />
        <Skeleton width="70%" />
      </p>
      <p>
        <Skeleton width="100%" count={3} />
      </p>
      <p>
        <Skeleton width="20%" />
        <Skeleton width="10%" count={3} />
      </p>
      <p>
        <Skeleton width="50%" />
        <Skeleton width="45%" />
        <Skeleton width="80%" />
        <Skeleton width="70%" />
      </p>
    </>
  )
}

export default LoaderSkeleton;