import { useForm } from "@/hooks";
import { Searchbar } from "@/modules/search/Searchbar";
import { useRouter } from "next/router";

const Homepage = () => {
  const router = useRouter();
  const { register, onSubmit, setValue } = useForm({
    text: ''
  });

  const handleSubmit = ({ text }: { text: string }) => {
    const url = {
      pathname: "/search",
      query: { ...router.query, text }
    }
    router.push(url, undefined, { shallow: true })
  }

  return (
    <div className="flex flex-col items-center justify-center text-center w-full gap-14 h-screen">
      <div className="flex flex-col items-center text-center -mt-40">
        <h1>DAVE</h1>
        <h2 className="font-normal">Document <span className="inline-block underline-yellow">Annotation</span> <span className=" inline-block underline-blue">Validation</span></h2>
        <h2 className="-mt-5 font-normal">and <span className="inline-block underline-green">Exploration</span>.</h2>
      </div>

      <form onSubmit={onSubmit(handleSubmit)} className="w-full max-w-2xl">
        <Searchbar {...register('text')} />
      </form>
    </div>
  )
};

export default Homepage;