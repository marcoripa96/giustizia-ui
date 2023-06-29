import AutoResizeTextArea from "@/components/AutoResizeTextArea";
import { useForm } from "@/hooks";
import { useStreamQuery } from "@/hooks/use-stream-query";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Search } from 'lucide-react';
import { useRouter } from "next/router";
import { useEffect } from "react";

const randomQuestions = [
  "What's your favorite way to spend a day off?",
  "What type of music are you into?",
  "What was the best vacation you ever took and why?",
  "Where's the next place on your travel bucket list and why?",
  "What are your hobbies, and how did you get into them?",
  "What was your favorite age growing up?",
  "Was the last thing you read digitally or in print?",
];


const SearchPage = () => {
  const { register, onSubmit, setValue } = useForm({
    query: ''
  });
  const router = useRouter();

  const { content, isStreaming, stream } = useStreamQuery('/api/generate');

  const { query } = router.query;

  const handleSubmit = ({ query }: { query: string }) => {

    // void stream({ inputs: query })
    const url = {
      pathname: router.pathname,
      query: { ...router.query, query }
    }
    router.push(url, undefined, { shallow: true })
  }

  useEffect(() => {
    if (!router.isReady) return;

    console.log(router.query);
  }, [router.query]);

  const handleClickQuestion = (q: string) => {
    setValue({
      query: q
    })
  }

  return (
    <div className="flex flex-row min-h-full">
      <div className="flex flex-col w-[300px]">

      </div>

      <form className="flex flex-col p-3 items-center justify-center flex-grow" onSubmit={onSubmit(handleSubmit)}>
        <div className="flex flex-col items-center text-center w-full max-w-5xl gap-7">
          {!query && (
            <div className="flex flex-col items-center text-center">
              <h1>DAVE</h1>
              <h2>Document <span className="inline-block underline-yellow">Annotation</span> <span className=" inline-block underline-blue">Validation</span></h2>
              <h2 className="-mt-5">and <span className="inline-block underline-green">Exploration</span>.</h2>
            </div>
          )}

          <AutoResizeTextArea
            className="w-full border border-slate-200 rounded-md p-3 text-slate-800" spellCheck="false" placeholder="Type a question here" {...register('query')} />
          <Button type="submit" className="bg-slate-900">Search</Button>

          {!query && (
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
      <div className="flex flex-col w-[300px]">

      </div>
    </div>
  )
}

export default SearchPage;