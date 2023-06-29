import AutoResizeTextArea from "@/components/AutoResizeTextArea";
import { useForm } from "@/hooks";
import { useStreamQuery } from "@/hooks/use-stream-query";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Search } from 'lucide-react';
import { useRouter } from "next/router";
import { useEffect } from "react";

const SearchPage = () => {
  const { register, onSubmit } = useForm({
    query: ''
  });
  const router = useRouter();

  const { content, isStreaming, stream } = useStreamQuery('/api/generate');

  const handleSubmit = ({ query }: { query: string }) => {
    void stream({ inputs: query })
    // const url = {
    //   pathname: router.pathname,
    //   query: { ...router.query, query }
    // }
    // router.push(url, undefined, { shallow: true })
  }

  useEffect(() => {
    if (!router.isReady) return;

    console.log(router.query);
  }, [router.query]);

  return (
    <div className="flex flex-col p-3 items-center">
      <div className="flex flex-col items-center text-center w-full max-w-5xl gap-7">
        <div className="flex flex-col items-center text-center">
          <h1>DAVE</h1>
          <h2>Document <span className="inline-block underline-yellow">Annotation</span> <span className=" inline-block underline-blue">Validation</span></h2>
          <h2 className="-mt-5">and <span className="inline-block underline-green">Exploration</span>.</h2>
        </div>
        <AutoResizeTextArea
          className="w-full border-none rounded-md p-3" spellCheck="false" />
      </div>

      {/* <form className="flex max-w-4xl mx-auto w-full gap-3 items-center" onSubmit={onSubmit(handleSubmit)}>
        <Input fullWidth contentLeft={<Search />} shadow={false} placeholder="Search for a document" size="lg" {...register('query')} spellCheck="false" />
        <Button type="submit" auto>Search</Button>
      </form>
      <div>
        {content}
      </div> */}
    </div>
  )
}

export default SearchPage;