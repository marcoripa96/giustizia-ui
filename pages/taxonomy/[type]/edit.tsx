import { useParam } from "@/hooks";
import Content from "@/modules/taxonomy/Content";
import Layout, { LayoutContentProps } from "@/modules/taxonomy/Layout";
import NodeManagement, { NodeManagementFormState } from "@/modules/taxonomy/NodeManagement";
import { useSelector, useTaxonomyDispatch } from "@/modules/taxonomy/TaxonomyProvider/selectors";
import { NextPageWithLayout } from "@/pages/_app";
import styled from "@emotion/styled";
import { Button, Text } from "@nextui-org/react";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useState } from "react";
import { unknown } from "zod";


export type ContentProps = {
  title: string;
  content: ReactNode;
}

const Row = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
})


// Page component
const EditTypePage: NextPageWithLayout<LayoutContentProps> = ({ type }) => {
  const dispatch = useTaxonomyDispatch();
  const router = useRouter();
  const taxonomyNode = useSelector((state) => state.taxonomy[type]);

  const handleSubmit = (value: NodeManagementFormState) => {
    dispatch({
      type: 'editType',
      payload: {
        oldKey: type,
        newNode: value
      }
    });
    router.push(`/taxonomy`, undefined, { shallow: true });
  }


  return (
    <Content
      title={`Gestisci tipo: ${taxonomyNode?.label}`}>
      {taxonomyNode && <NodeManagement onSubmit={handleSubmit} taxonomyNode={taxonomyNode} />}
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

