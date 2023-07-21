import { Scroller } from "@/components/Scroller"
import { useForm } from "@/hooks"
import { FacetedQueryOutput } from "@/server/routers/search"
import Fuse from "fuse.js"
import { SearchIcon } from "lucide-react"
import { useMemo, useRef } from "react"
import { FacetFilter } from "./FacetFilter"

type FacetsProps = {
  facets: FacetedQueryOutput['facets']
}

const facetsAnnotationsOrder = ['persona', 'luogo', 'organizzazione', 'data', 'denaro', 'altro']
const facetsMetadataOrder = ['anno sentenza', 'anno ruolo']

const buildFacets = (facets: FacetedQueryOutput['facets']) => {
  const annotations = facets.annotations.map((facet) => ({ filterType: 'annotation', ...facet })).sort((a, b) => {
    return facetsAnnotationsOrder.indexOf(a.key) - facetsAnnotationsOrder.indexOf(b.key);
  })
  const metadata = facets.metadata.map((facet) => ({ filterType: 'metadata', ...facet })).sort((a, b) => {
    return facetsMetadataOrder.indexOf(a.key) - facetsMetadataOrder.indexOf(b.key);
  })

  return [...metadata, ...annotations]
}

const Facets = ({ facets }: FacetsProps) => {
  const { register, value } = useForm({
    filter: ''
  });

  const allFacets = useMemo(() => buildFacets(facets), [facets]);

  const fuse = useRef(new Fuse(allFacets, {
    keys: ['key']
  }))

  const filteredFacets = value.filter.trim() === '' ? allFacets : fuse.current.search(value.filter).map(({ item }) => item)

  return allFacets.length > 0 ? (
    <div className="sticky top-16 w-72 h-[calc(100vh-4rem)]">
      <Scroller>
        <div className="flex flex-col pr-6 py-6 gap-8">
          <div className="flex flex-col">
            <div className="text-lg font-semibold">Filter</div>
            <div className="flex flex-row items-center border-[1px] border-solid border-slate-200 rounded-md p-3 w-full gap-2">
              <SearchIcon size={22} />
              <input
                className="text-slate-800 resize-none bg-transparent w-full h-full border-none text-base"
                spellCheck="false"
                placeholder={`Find filter`}
                {...register('filter')}
              />
            </div>
          </div>

          {filteredFacets.map(({ filterType, ...facet }) => <FacetFilter key={facet.key} facet={facet} filterType={filterType} />)}
        </div>

      </Scroller>
    </div>
  ) : null
}

export { Facets }