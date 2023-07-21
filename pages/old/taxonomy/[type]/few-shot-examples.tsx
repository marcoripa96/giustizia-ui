import Content from "@/modules/taxonomy/Content";
import FewShotCandidates from "@/modules/taxonomy/FewShotExamples";
import Layout, { LayoutContentProps } from "@/modules/taxonomy/Layout";
import { useSelector } from "@/modules/taxonomy/TaxonomyProvider/selectors";
import { NextPageWithLayout } from "@/pages/_app";
import { useQuery } from "@/utils/trpc";
import { ReactElement } from "react";

const FewShotExamplesPage: NextPageWithLayout<LayoutContentProps> = ({ type }) => {
  const taxonomyNode = useSelector((state) => state.taxonomy[type]);

  const { data, isFetching } = useQuery(['taxonomygetFewShotCandidates', { id: type }], { staleTime: Infinity });

  // return <Loading size="xl" css={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateY(-50%) translateX(-50%)' }} />
  return (
    <Content
      title={`Esempi annotati di ${taxonomyNode.label}`}
      description="Di seguito alcuni esempi annotati automaticamente sulla base della precedente scelta"
      showLoader={isFetching}>
      {data ? <FewShotCandidates candidates={data} /> : null}
    </Content>
  )

}

// Fullscreen layout for the page
FewShotExamplesPage.getLayout = function getLayout(page: ReactElement<LayoutContentProps>) {

  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default FewShotExamplesPage
