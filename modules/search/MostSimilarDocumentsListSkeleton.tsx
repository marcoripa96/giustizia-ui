import { Skeleton } from "@/components/Skeleton"

const MostSimilarDocumentsListSkeleton = () => {
  return (
    <div className="flex flex-col gap-8">
      {[...new Array(5)].map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/6" />
        </div>
      ))}

    </div >
  )
}

export { MostSimilarDocumentsListSkeleton }
