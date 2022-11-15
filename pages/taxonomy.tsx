import Description from "@/modules/taxonomy/Description";
import PageContent from "@/modules/taxonomy/PageContent";
import SidebarContent from "@/modules/taxonomy/SidebarContent";
import TaxonomyProvider from "@/modules/taxonomy/TaxonomyProvider";
import styled from "@emotion/styled";
import { ReactElement, ReactNode, useState } from "react";
import { NextPageWithLayout } from "./_app";

const Sidebar = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '450px',
  borderRight: '1px solid #F3F3F5',
  '@media (max-width: 1276px)': {
    width: '400px',
  },
  '@media (max-width: 926px)': {
    width: '350px',
  }
})

// const RightContent = styled.div({
//   display: 'flex',
//   flexDirection: 'column',
//   flexGrow: 1
// })

export type ContentProps = {
  title: string;
  content: ReactNode;
}

// Page component
const TaxonomyPage: NextPageWithLayout<{}> = () => {
  const [content, setContent] = useState<ContentProps>({
    title: 'Test',
    content: <Description />
  })

  const changePageContent = (content: ContentProps) => {
    setContent(content);
  }

  return (
    <TaxonomyProvider>
      {/* Sidebar content */}
      <Sidebar>
        <SidebarContent changePageContent={changePageContent} />
      </Sidebar>
      {/* Right page content */}
      <PageContent {...content} />
      {/* <RightContent>
        {rightContent}
      </RightContent> */}
    </TaxonomyProvider>
  )
}


const PageContainer = styled.div({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'row'
})

// Fullscreen layout for the page
TaxonomyPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageContainer>
      {page}
    </PageContainer>
  )
}

export default TaxonomyPage

