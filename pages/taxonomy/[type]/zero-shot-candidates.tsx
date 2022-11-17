import { useParam } from "@/hooks";
import Content from "@/modules/taxonomy/Content";
import Layout, { LayoutContentProps } from "@/modules/taxonomy/Layout";
import { useSelector } from "@/modules/taxonomy/TaxonomyProvider/selectors";
import ZeroShotCandidates from "@/modules/taxonomy/ZeroShotCandidates";
import { NextPageWithLayout } from "@/pages/_app";
import { useQuery } from "@/utils/trpc";
import { Loading, Text } from "@nextui-org/react";
import { ReactElement } from "react";

const EditTypePage: NextPageWithLayout<LayoutContentProps> = ({ type }) => {
  const taxonomyNode = useSelector((state) => state.taxonomy[type.toUpperCase()]);

  const { data, isFetching } = useQuery(['taxonomygetZeroShotCandidates', { id: type, terms: taxonomyNode.terms || [] }]);

  // return <Loading size="xl" css={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateY(-50%) translateX(-50%)' }} />
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
EditTypePage.getLayout = function getLayout(page: ReactElement<LayoutContentProps>) {

  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default EditTypePage
