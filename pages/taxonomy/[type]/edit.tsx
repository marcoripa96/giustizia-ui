import { useParam } from "@/hooks";
import Content from "@/modules/taxonomy/Content";
import Layout, { LayoutContentProps } from "@/modules/taxonomy/Layout";
import NodeManagement from "@/modules/taxonomy/NodeManagement";
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
  return (
    <Content
      title="Gestisci tipo">
      {/* <Row>
        <Button size="sm" auto iconRight={<FiPlus />} onClick={handleClick}>Aggiungi sottotipo</Button>
      </Row> */}
      {type && <NodeManagement typeKey={type.toUpperCase()} />}
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

