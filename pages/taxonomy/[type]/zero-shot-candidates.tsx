import Content from "@/modules/taxonomy/Content";
import Layout, { LayoutContentProps } from "@/modules/taxonomy/Layout";
import { useSelector } from "@/modules/taxonomy/TaxonomyProvider/selectors";
import ZeroShotCandidates from "@/modules/taxonomy/ZeroShotCandidates";
import { NextPageWithLayout } from "@/pages/_app";
import { useQuery } from "@/utils/trpc";
import { ReactElement } from "react";

const ZeroShotCandidatesPage: NextPageWithLayout<LayoutContentProps> = ({ type }) => {
  const taxonomyNode = useSelector((state) => state.taxonomy[type]);

  const { data, isFetching } = useQuery(['taxonomygetZeroShotCandidates', { id: type, terms: taxonomyNode.terms || [], parent: taxonomyNode.parent as string }], { staleTime: Infinity });

  return (
    <Content
      title={`Possibili esempi di ${taxonomyNode.label}`}
      description="Seleziona gli esempi annotati correttamente"
      showLoader={isFetching}>
      {data ? <ZeroShotCandidates candidates={data} /> : null}
    </Content>
  )

}

// Fullscreen layout for the page
ZeroShotCandidatesPage.getLayout = function getLayout(page: ReactElement<LayoutContentProps>) {

  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default ZeroShotCandidatesPage
