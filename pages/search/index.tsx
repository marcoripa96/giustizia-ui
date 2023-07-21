import { useClickOutside, useForm } from "@/hooks";
import { useInfiniteQuery } from "@/utils/trpc";
import { MessageCircle, SearchIcon } from "lucide-react";
import { useRouter } from "next/router";
import { Fragment, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components";
import { ActiveFiltersList } from "@/modules/search/ActiveFilters";
import { Facets } from "@/modules/search/Facets";
import { DocumentHit } from "@/modules/search/DocumentHit";
import { LLMSearch } from "@/modules/search/LLMSearch";
import { Searchbar } from "@/modules/search/Searchbar";
import LoadingOverlay from "@/modules/review/LoadingOverlay";
import Link from "next/link";
import { LLMButton } from "@/modules/search/LLMButton";

const variants = {
  isFetching: { opacity: 0.5 },
  isNotFetching: { opacity: 1 },
}

const getFacetsFromUrl = (facets: Record<string, string | string[] | undefined>) => {
  return Object.keys(facets).reduce((acc, key) => {
    const [type, k] = key.split('_');
    const value = facets[key];

    const arrayToMutate = type === 'annotation' ? acc.annotations : acc.metadata;

    if (Array.isArray(value)) {
      const values = value.map((v) => ({ type: k, value: v }))
      arrayToMutate.push(...values)
    } else if (value) {
      arrayToMutate.push({ type: k, value })
    }

    return acc;

  }, { annotations: [] as ({ type: string, value: string })[], metadata: [] as ({ type: string, value: string })[] })
}




const Search = () => {
  const router = useRouter();
  const { text, ...facetsFilters } = router.query;
  const facets = useMemo(() => getFacetsFromUrl(facetsFilters), [facetsFilters]);
  const { register, onSubmit, setValue } = useForm({
    text: ''
  });

  useEffect(() => {
    if (!router.isReady) return;

    if (text) {
      setValue({
        text: text as string
      })
    }


  }, [router.query]);

  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery(['search.facetedSearch', {
    text: text as string || '',
    ...facets,
    limit: 20
  }], {
    staleTime: Infinity,
    getNextPageParam: (lastPage) => lastPage.pagination.current_page < lastPage.pagination.total_pages ? lastPage.pagination.current_page + 1 : undefined,
    getPreviousPageParam: (firstPage) => firstPage.pagination.current_page > 1 ? firstPage.pagination.current_page - 1 : undefined,
    keepPreviousData: true
  });

  const { ref, inView } = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const handleSubmit = ({ text }: { text: string }) => {
    const url = {
      pathname: router.pathname,
      query: { ...router.query, text }
    }
    router.push(url, undefined, { shallow: true })
  }


  return (

    data ? (
      <>
        <div className="flex flex-col h-screen">
          <div className="fixed top-0 left-0 w-full flex items-center h-16 bg-white z-10 px-24 border-b border-gray-200" style={{ borderBottom: "1px solid rgb(226, 232, 240)" }}>
            <Link href={"/"} passHref>
              <a className="text-2xl font-semibold self-center">
                Dave
              </a>
            </Link>
            <form onSubmit={onSubmit(handleSubmit)} className="flex-grow max-w-3xl ml-auto mr-auto pl-4">
              <Searchbar {...register('text')} loading={isFetching} />
            </form>
          </div>
          <div className="flex flex-col py-6 mt-16 px-24">
            <h2>Documents</h2>
          </div>
          <motion.div style={{ ...(isFetching && { pointerEvents: 'none' }) }} className="flex relative px-24" variants={variants} animate={isFetching ? 'isFetching' : 'isNotFetching'} transition={{ duration: 0.5 }} >
            {data && <Facets facets={data.pages[0].facets} />}
            <div className="flex-grow flex flex-col gap-4 p-6">
              <div className="flex flex-col sticky top-16 bg-white py-6">
                <h4>{`${data.pages[0].pagination.total_hits} results for "${text}"`}</h4>
                {data && <ActiveFiltersList facets={data.pages[0].facets} />}
              </div>
              <div className="grid gap-x-8 gap-y-8" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))' }}>
                {data && data.pages.map((page) => (
                  <Fragment key={page.pagination.current_page}>
                    {page.hits.map((hit) => (
                      <DocumentHit key={hit._id} hit={hit} />
                    ))}
                  </Fragment>
                ))}
              </div>
              {hasNextPage && (
                <div ref={ref} className="w-full">
                  <Button loading={isFetching} onClick={() => fetchNextPage()} className="bg-slate-900 mx-auto">Load More</Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
        <LLMButton />
      </>

    ) : (
      <LoadingOverlay show />
    )
  )
};

export default Search;