import { useParam } from "@/hooks";
import Content from "@/modules/taxonomy/Content";
import Layout, { LayoutContentProps } from "@/modules/taxonomy/Layout";
import { useSelector } from "@/modules/taxonomy/TaxonomyProvider/selectors";
import ZeroShotCandidates from "@/modules/taxonomy/ZeroShotCandidates";
import { NextPageWithLayout } from "@/pages/_app";
import { useQuery } from "@/utils/trpc";
import { Text } from "@nextui-org/react";
import { ReactElement } from "react";

const EditTypePage: NextPageWithLayout<LayoutContentProps> = ({ type }) => {
  const taxonomyNode = useSelector((state) => state.taxonomy[type.toUpperCase()]);

  const { data } = useQuery(['taxonomygetZeroShotCandidates', { id: type, terms: taxonomyNode.terms || [] }]);

  return (
    <Content
      title={`Possibili esempi di ${taxonomyNode.label}`}
      description="Seleziona gli esempi annotati correttamente">
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
