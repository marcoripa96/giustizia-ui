import Description from "@/modules/taxonomy/Description";
import Layout from "@/modules/taxonomy/Layout";
import TaxonomyProvider from "@/modules/taxonomy/TaxonomyProvider";
import styled from "@emotion/styled";
import { ReactElement, ReactNode, useState } from "react";
import { NextPageWithLayout } from "../../_app";

export type ContentProps = {
  title: string;
  content: ReactNode;
}

// Page component
const TaxonomyPage: NextPageWithLayout<{}> = () => {

  return null

}

// Fullscreen layout for the page
TaxonomyPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default TaxonomyPage

