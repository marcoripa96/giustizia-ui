import { Skeleton } from "@/components/Skeleton";
import { cn } from "@/lib/utils";
import { DocumentWithChunk } from "@/server/routers/search";
import { Tooltip } from "@nextui-org/react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { FileText, Sparkles, User, Link as LinkIcon, Unlink, Link2 } from "lucide-react";
import Link from "next/link";

type ReplyProps = {
  role: 'system' | 'assistant' | 'user';
  content: string;
  usrMessage?: string;
  isDoneStreaming?: boolean;
  context?: DocumentWithChunk[]
}

function urlToPathArray(url: string) {
  // const urlObj = new URL(url);
  return url.split("/").filter(Boolean); // Split on / and remove empty strings
  // Concatenate hostname with pathnames
}

const SkeletonMessage = () => {
  return (
    <div className="flex flex-row gap-2">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="flex flex-col gap-2 flex-grow">
        <Skeleton className="w-5/6 h-2" />
        <Skeleton className="w-2/6 h-2" />
        <Skeleton className="w-4/6 h-2" />
        <Skeleton className="w-3/6 h-2" />
      </div>
    </div>

  )
}

const variants: Variants = {
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1
    },
  }),
  hidden: { opacity: 0, y: -50 },
}

const Message = ({ role, content, usrMessage, context, isDoneStreaming }: ReplyProps) => {
  return (
    <motion.div animate={{ translateY: 0 }} initial={{ translateY: 20 }} className={cn("flex gap-2", {
      'ml-8': role === 'user'
    })}>
      <div className={cn("rounded-full  h-8 w-8 flex items-center justify-center flex-shrink-0", {
        'bg-slate-100': role === 'assistant',
        'bg-orange-100': role === 'user'
      })}>
        {role === 'assistant' ? <Sparkles size={18} /> : <User size={18} />}
      </div>
      <div className={cn("flex flex-col", {
        "bg-slate-50 p-2 rounded-xl": role === 'assistant'
      })}>
        <div className="text-sm font-semibold">{role === 'assistant' ? 'Dave' : 'User'}</div>
        <div className="text-sm whitespace-pre-line">{usrMessage ?? content}</div>

        {context && isDoneStreaming && (
          <>
            <div className="w-full h-[2px] bg-slate-200 my-4" />
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                {context.map((doc, i) => (
                  <motion.div key={doc.id} className="flex flex-col p-2 gap-2" variants={variants} custom={i} initial="hidden"
                    animate="visible">
                    <div className="flex flex-row items-center gap-2">
                      <Link2 size={14} />
                      <span className="text-neutral-900/80 tracking-wide text-sm whitespace-nowrap text-ellipsis overflow-hidden">{urlToPathArray(`/documents/${doc.id}`).join(' > ')}</span>
                    </div>
                    <Link href={`/documents/${doc.id}`} passHref>
                      <a className="text-blue-700 text-base tracking-wide">{doc.title}</a>
                    </Link>
                    <div className="text-xs tracking-wide">
                      {doc.preview}
                    </div>
                    <div className="flex flex-row items-center flex-wrap gap-x-2">
                      <span className="text-xs leading-tight font-semibold">Relevant passages:</span>
                      {doc.chunks.map((chunk) => (
                        <Tooltip content={<div className="max-w-xs">{chunk.text}</div>} key={chunk.id}>
                          <div className="whitespace-nowrap w-56 text-ellipsis overflow-hidden text-xs bg-slate-200 rounded-md px-2">
                            {chunk.text.slice(0, 50)}
                          </div>
                        </Tooltip>

                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>

          </>
        )}

      </div>
    </motion.div >
  )
}

export { Message, SkeletonMessage }