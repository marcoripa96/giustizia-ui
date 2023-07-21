import { Facet, FacetedQueryOutput } from "@/server/routers/search";
import { X } from "lucide-react";
import { useRouter } from "next/router";

const getActiveFilters = (facets: ActiveFiltersListProps['facets'], { text, ...filters }: Record<string, string | string[] | undefined>) => {
  return Object.keys(filters).map((filterType) => {
    const value = (Array.isArray(filters[filterType]) ? filters[filterType] : [filters[filterType]]) as string[];
    const [category, type] = filterType.split('_');

    const group = category === 'annotation' ? 'annotations' : 'metadata';

    return value.map((v) => {
      const facetGroup = facets[group as keyof typeof facets].find((facetG) => facetG.key === type) as Facet;

      return {
        filterType,
        value: facetGroup.children.find((facet) => facet.key === v) as Facet['children'][number]
      }
    })
  }).flat()
}

type ActiveFiltersListProps = {
  facets: FacetedQueryOutput['facets']
}

const ActiveFiltersList = ({ facets }: ActiveFiltersListProps) => {
  const router = useRouter();

  const activeFilters = getActiveFilters(facets, router.query)

  const removeFilter = (key: string, value: Facet['children'][number]) => {
    const filterValue = router.query[key];
    const v = Array.isArray(filterValue) ? filterValue : [filterValue] as string[]
    const newFilters = v.filter((f) => f !== value.key);

    const url = {
      pathname: router.pathname,
      query: {
        ...router.query,
        [key]: newFilters
      }
    }

    router.push(url, undefined, { shallow: true })
  }

  const removeAllFilters = () => {
    const { text, } = router.query

    const url = {
      pathname: router.pathname,
      query: {
        text
      }
    }

    router.push(url, undefined, { shallow: true })
  }

  return (
    <div className="flex flex-row items-center flex-wrap gap-2">
      {activeFilters.map((filter, index) => (
        <button key={index} onClick={() => removeFilter(filter.filterType, filter.value)} className="cursor-pointer hover:opacity-90 border-none m-0  bg-slate-900 rounded-full px-2 py-1 text-white text-xs flex flex-row items-center gap-2">
          {filter.filterType.startsWith('annotation') ? filter.value.display_name : filter.value.key}
          <X size={16} />
        </button>
      ))}
      {activeFilters.length > 0 ? (
        <button onClick={removeAllFilters} className="text-xs border-none bg-transparent flex justify-start m-0 p-0 font-semibold underline cursor-pointer">
          Clear all filters
        </button>
      ) : null}

    </div>
  )
}

export { ActiveFiltersList }
