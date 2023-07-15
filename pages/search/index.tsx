import AutoResizeTextArea from "@/components/AutoResizeTextArea";
import { useForm } from "@/hooks";
import { useStreamQuery } from "@/hooks/use-stream-query";
import { cn } from "@/lib/utils";
import type { MostSimilarDocument } from "@/server/routers/search";
// import { documents } from "@/server/routers/search";
import { useMutation, useQuery } from "@/utils/trpc";
import { Button, Input, Textarea } from "@nextui-org/react";
import { motion } from "framer-motion";
import { ArrowRight, FileText, History, Search, SearchIcon, Slice } from 'lucide-react';
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


/*********************************************
 * LLM SEARCH
 *********************************************/

const randomQuestions = [
  "What's your favorite way to spend a day off?",
  "What type of music are you into?",
  "What was the best vacation you ever took and why?",
  "Where's the next place on your travel bucket list and why?",
  "What are your hobbies, and how did you get into them?",
  "What was your favorite age growing up?",
  "Was the last thing you read digitally or in print?",
];


function urlToPathArray(url: string) {
  // const urlObj = new URL(url);
  return url.split("/").filter(Boolean); // Split on / and remove empty strings
  // Concatenate hostname with pathnames
}

type MostSimilarDocumentsListProps = {
  documents: MostSimilarDocument[]
}

const MostSimilarDocumentsList = ({ documents }: MostSimilarDocumentsListProps) => {
  return (

    <div className="flex flex-col gap-4">
      {documents.map((doc, index) => (
        <div key={index} className="flex flex-col">
          <div className="flex flex-row items-center gap-2">
            <FileText size={14} />
            <span className="text-gray-400 text-xs whitespace-nowrap text-ellipsis overflow-hidden">{urlToPathArray(`/documents/${doc.id}`).join(' > ')}</span>
          </div>
          <Link href={`/documents/${doc.id}`} passHref>
            <a className="underline text-blue-500 text-lg">{doc.title}</a>
          </Link>
          <div className="text-sm">
            {doc.preview}
          </div>
        </div>
      ))}
    </div>
  )
}

const MostSimilarDocumentsListSkeleton = () => {
  return (
    <div className="flex flex-col gap-8">
      {[...new Array(5)].map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="bg-slate-200 h-4 w-4/6 animate-pulse" />
          <div className="bg-slate-200 h-4 w-full animate-pulse" />
          <div className="bg-slate-200 h-4 w-3/6 animate-pulse" />
        </div>
      ))}

    </div >
  )
}

const ContentSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="bg-slate-200 h-4 w-full animate-pulse" />
      <div className="bg-slate-200 h-4 w-full animate-pulse" />
      <div className="bg-slate-200 h-4 w-4/6 animate-pulse" />
    </div >
  )
}

type QuestionsHistoryProps = {
  history: QuestionHistory;
  onHistoryQuestionClick: (q: QuestionHistory[number]) => void;
}

type QuestionHistory = { query: string; date: string; }[]

const QuestionsHistory = ({ history, onHistoryQuestionClick }: QuestionsHistoryProps) => {
  return (

    <div className="flex flex-col gap-3 p-2">
      {history.map((q, index) => (
        <div key={index} className="flex flex-row gap-2 items-center p-2 border-[1px] border-slate-200 border-solid rounded hover:bg-slate-100 cursor-pointer" onClick={() => onHistoryQuestionClick(q)}>
          <History size={18} className="flex-shrink-0 text-slate-400" />
          <div className="flex flex-col min-w-0">
            <div className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">{q.query}</div>
            <div className="text-xs">{new Date(q.date).toLocaleDateString()}</div>
          </div>
        </div>

      ))}
    </div>

  )
}


const LLMSearch = () => {
  const router = useRouter();
  const { query } = router.query;
  const hasQuery = !!query;

  const { register, onSubmit, setValue } = useForm({
    query: ''
  });
  const [history, setHistory] = useState<QuestionHistory>(() => {
    if (typeof window === 'undefined') {
      return [];
    }

    const questionsHistory = localStorage.getItem('history');

    if (!questionsHistory) {
      return [];
    }

    return JSON.parse(questionsHistory);
  })
  const [isRouterReady, setRouterReady] = useState(false);


  const { data: mostSimilarDocuments, isFetching: mostSimilarDocumentsLoading } = useQuery(['search.mostSimilarDocuments', { query: query as string || '' }], { enabled: hasQuery, staleTime: Infinity })

  const { content, isStreaming, isLoading, stream } = useStreamQuery('/api/generate');


  const handleSubmit = ({ query }: { query: string }) => {
    if (query === router.query.query as string) {
      return;
    }

    setHistory((h) => {
      const newHistory = [...h, { query, date: new Date().toISOString() }];
      localStorage.setItem('history', JSON.stringify(newHistory));
      return newHistory
    })

    const url = {
      pathname: router.pathname,
      query: { ...router.query, query }
    }
    router.push(url, undefined, { shallow: true })
  }

  useEffect(() => {
    setRouterReady(router.isReady);
  }, [router.isReady]);

  useEffect(() => {
    if (!router.isReady) return;

    if (query) {
      setValue({
        query: query as string
      })
    }


  }, [router.query]);

  useEffect(() => {
    if (mostSimilarDocuments) {
      const context = mostSimilarDocuments.map(({ chunks }) => chunks.map(({ text }) => text).join('\n')).join('\n').slice(0, 200);
      const prompt = `Given the query Q and the context C, answer using ONLY the information in the context C. If you don't know the answer, just replay that you don't know. Replay using the italian language\nQ:${query}\nC:${context}`
      console.log(prompt)
      void stream({ inputs: prompt })
    }
  }, [mostSimilarDocuments]);

  const handleClickQuestion = (q: string) => {
    setValue({
      query: q
    })
  }

  const handleQuestionHistoryClick = (q: QuestionHistory[number]) => {
    const url = {
      pathname: router.pathname,
      query: { ...router.query, query: q.query }
    }
    router.push(url, undefined, { shallow: true })
  }



  if (!isRouterReady) {
    return null
  }

  return (
    <div className="flex lg:flex-row flex-col min-h-full py-5">
      <div className="lg:flex flex-col w-[300px] gap-8 flex-shrink-0 pr-8 hidden">
        {hasQuery && (
          <Link href="/search" passHref>
            <a className="text-2xl font-semibold self-center">
              DAVE
            </a>
          </Link>

        )}
        <QuestionsHistory history={history} onHistoryQuestionClick={handleQuestionHistoryClick} />
      </div>

      <div className="flex flex-col w-full max-w-3xl mx-auto">
        <form className={cn(
          'flex flex-col',
          {
            'items-center': !hasQuery
          }
        )} onSubmit={onSubmit(handleSubmit)}>
          <div className="flex flex-col items-center text-center w-full gap-7">
            {!hasQuery && (
              <div className="flex flex-col items-center text-center">
                <h1>DAVE</h1>
                <h2>Document <span className="inline-block underline-yellow">Annotation</span> <span className=" inline-block underline-blue">Validation</span></h2>
                <h2 className="-mt-5">and <span className="inline-block underline-green">Exploration</span>.</h2>
              </div>
            )}
            <div className={cn('flex w-full ', {
              "flex-col gap-7": !hasQuery,
              "flex-row gap-3": hasQuery
            })}>
              <motion.div className="w-full flex-grow" layoutId="text-area">
                <div className="flex flex-row items-center border-[1px] border-solid border-slate-200 rounded-md p-3 w-full gap-4">
                  <SearchIcon />
                  <input
                    className="text-slate-800 resize-none bg-transparent w-full h-full border-none"
                    spellCheck="false"
                    placeholder="Type a question here"
                    {...register('query')} />
                </div>
              </motion.div>
              <Button type="submit" auto className="bg-slate-900 h-full self-center">Search</Button>
            </div>



            {!hasQuery && (
              <div className="flex flex-col mt-10">
                <h4 className="font-normal">Try with a question...</h4>
                <div className="flex flex-row justify-center flex-wrap gap-2 max-w-2xl">
                  {randomQuestions.map((q, index) => (
                    <button type="button" key={index} className="border-none rounded-md cursor-pointer hover:bg-slate-200 bg-slate-100 text-sm" onClick={() => handleClickQuestion(q)}>{q}</button>
                  ))}
                </div>
              </div>
            )}

          </div>
        </form>

        {hasQuery && (
          <div className="flex flex-col mt-24 gap-3">
            <div className="text-2xl font-bold ">
              {query}
            </div>
            <div className="text-base font-bold tracking-widest">
              {`Answer | Vicuna13B Model`}
            </div>
            <div className="whitespace-pre-line">
              {(mostSimilarDocumentsLoading || isLoading) ? (
                <ContentSkeleton />
              ) : (
                <>
                  {content}
                </>
              )}
            </div>
          </div>
        )}
      </div>



      <div className={cn("flex flex-col gap-4 flex-shrink-0", {
        'w-[300px] px-3': !hasQuery,
        'lg:w-[400px] lg:pl-9 xl:mr-52 lg:pt-40 lg:mr-10 max-w-3xl w-full mx-auto': hasQuery
      })}>

        {(hasQuery && (
          <>
            <div className="text-sm font-bold spacing tracking-widest">SOURCES</div>
            {mostSimilarDocuments && !mostSimilarDocumentsLoading ? (
              <MostSimilarDocumentsList documents={mostSimilarDocuments} />
            ) : (
              <MostSimilarDocumentsListSkeleton />
            )}
          </>
        ))}
      </div>
    </div>
  )
}

/*********************************************
**********************************************
**********************************************/


/*********************************************
 * Faceted SEARCH
 *********************************************/

const FacetedSearch = () => {
  const router = useRouter();
  const { query } = router.query;

  const hasQuery = !!query;

  const { register, onSubmit, setValue } = useForm({
    query: ''
  });

  const { data, isFetching: mostSimilarDocumentsLoading } = useQuery(['search.facetedSearch', { text: query as string || '', metadata: [], annotations: [] }], { enabled: hasQuery, staleTime: Infinity })

  const handleSubmit = ({ query }: { query: string }) => {
    if (query === router.query.query as string) {
      return;
    }

    const url = {
      pathname: router.pathname,
      query: { ...router.query, query }
    }
    router.push(url, undefined, { shallow: true })
  }

  console.log(data)

  return (
    <div className="flex lg:flex-row flex-col justify-center min-h-full py-5">
      <div className="lg:flex flex-col w-[300px] gap-8 flex-shrink-0 pr-8 hidden">

      </div>
      <div className="flex flex-col w-full max-w-3xl mx-auto">
        <form className={cn(
          'flex flex-col',
          {
            'items-center': !hasQuery
          }
        )} onSubmit={onSubmit(handleSubmit)}>
          <div className="flex flex-col items-center text-center w-full gap-7">
            {!hasQuery && (
              <div className="flex flex-col items-center text-center">
                <h1>DAVE</h1>
                <h2>Document <span className="inline-block underline-yellow">Annotation</span> <span className=" inline-block underline-blue">Validation</span></h2>
                <h2 className="-mt-5">and <span className="inline-block underline-green">Exploration</span>.</h2>
              </div>
            )}
            <div className={cn('flex w-full ', {
              "flex-col gap-7": !hasQuery,
              "flex-row gap-3": hasQuery
            })}>
              <motion.div className="w-full flex-grow" layoutId="text-area">
                <div className="flex flex-row items-center border-[1px] border-solid border-slate-200 rounded-md p-3 w-full gap-4">
                  <SearchIcon />
                  <input
                    className="text-slate-800 resize-none bg-transparent w-full h-full border-none"
                    spellCheck="false"
                    placeholder="Type a question here"
                    {...register('query')} />
                </div>
              </motion.div>
              <Button type="submit" auto className="bg-slate-900 h-full self-center">Search</Button>
            </div>
          </div>
        </form>

        {hasQuery && (
          <div className="flex flex-col mt-24 gap-3">
            <div className="text-2xl font-bold ">
              {query}
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

const SearchPage = () => {
  const router = useRouter();

  const { type } = router.query;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (type) {
      return;
    }

    const url = {
      pathname: router.pathname,
      query: { ...router.query, type: type === 'llm' ? 'facets' : 'llm' }
    }

    router.push(url, undefined, { shallow: true })
  }, [type]);


  const handleChangeSearchType = () => {
    const url = {
      pathname: router.pathname,
      query: { ...router.query, type: type === 'llm' ? 'facets' : 'llm' }
    }
    router.push(url, undefined, { shallow: true })
  }

  if (!type) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row items-center justify-end p-4">
        <Button auto className="bg-slate-900 h-full self-center" onClick={handleChangeSearchType}>
          {type === 'llm' ? 'Switch to faceted search' : 'Switch to LLM search'}
        </Button>
      </div>
      {type === 'llm' ? <LLMSearch /> : <FacetedSearch />}
    </div>
  )
}

export default SearchPage;