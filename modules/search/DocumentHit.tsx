import { FacetedQueryHit } from "@/server/routers/search"
import { motion } from "framer-motion"
import Link from "next/link"

type DocumentHitProps = {
  hit: FacetedQueryHit
}

const DocumentHit = ({ hit }: DocumentHitProps) => {
  return (
    <motion.div key={hit._id} layout className="flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Link href={`/documents/${hit.mongo_id}`} passHref>
        <a className="rounded-md overflow-hidden border-[1px] border-solid border-slate-200 p-4 bg-white hover:shadow-lg hover:-translate-y-6 transition-all">
          <div className="h-36 overflow-ellipsis overflow-hidden mb-2 text-sm">{hit.text}</div>
          <div className="font-bold text-sm whitespace-nowrap overflow-hidden text-ellipsis">{hit.name}</div>
        </a>
      </Link>
    </motion.div>
  )
}

export { DocumentHit }