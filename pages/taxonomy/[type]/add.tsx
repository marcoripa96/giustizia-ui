import { useParam } from "@/hooks";
import Description from "@/modules/taxonomy/Description";
import Layout, { LayoutContentProps } from "@/modules/taxonomy/Layout";
import NodeManagement from "@/modules/taxonomy/NodeManagement";
import TaxonomyProvider from "@/modules/taxonomy/TaxonomyProvider";
import { NextPageWithLayout } from "@/pages/_app";
import styled from "@emotion/styled";
import { Button, Text } from "@nextui-org/react";
import { ReactElement, ReactNode, useState } from "react";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import Link from "next/link";
import Content from "@/modules/taxonomy/Content";


export type ContentProps = {
  title: string;
  content: ReactNode;
}


// Page component
const AddTypePage: NextPageWithLayout<LayoutContentProps> = ({ type }) => {

  return (
    <Content
      title="Aggiungi tipo">
      <NodeManagement typeKey={type.toUpperCase()} addNode />
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

