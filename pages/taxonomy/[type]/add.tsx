import { useParam } from "@/hooks";
import Description from "@/modules/taxonomy/Description";
import Layout, { LayoutContentProps } from "@/modules/taxonomy/Layout";
import NodeManagement, { NodeManagementFormState } from "@/modules/taxonomy/NodeManagement";
import TaxonomyProvider from "@/modules/taxonomy/TaxonomyProvider";
import { NextPageWithLayout } from "@/pages/_app";
import styled from "@emotion/styled";
import { Button, Text } from "@nextui-org/react";
import { ReactElement, ReactNode, useState } from "react";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import Link from "next/link";
import Content from "@/modules/taxonomy/Content";
import { useTaxonomyDispatch } from "@/modules/taxonomy/TaxonomyProvider/selectors";
import { useRouter } from "next/router";


export type ContentProps = {
  title: string;
  content: ReactNode;
}


// Page component
const AddTypePage: NextPageWithLayout<LayoutContentProps> = ({ type }) => {
  const dispatch = useTaxonomyDispatch();
  const router = useRouter();

  const handleSubmit = (value: NodeManagementFormState) => {
    // console.log(value);
    dispatch({
      type: 'addType',
      payload: {
        ...value,
        parent: type
      }
    });
    router.push(`/taxonomy`, undefined, { shallow: true });
  }

  return (
    <Content
      title="Aggiungi tipo">
      <NodeManagement onSubmit={handleSubmit} typeKey={type} addNode />
    </Content>
  )

}

// Fullscreen layout for the page
AddTypePage.getLayout = function getLayout(page: ReactElement<LayoutContentProps>) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default AddTypePage

