import styled from "@emotion/styled";
import { NextPage } from "next";
import { ReactElement } from "react";
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

const RightContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1
})

// Page component
const TaxonomyPage: NextPageWithLayout<{}> = () => {

  return (
    <>
      {/* Sidebar content */}
      <Sidebar>
        This is inside the sidebar
      </Sidebar>
      {/* Right page content */}
      <RightContent>
        This is inside the right content
      </RightContent>
    </>
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

