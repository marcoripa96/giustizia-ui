import Description from "@/modules/taxonomy/Description";
import SidebarContent from "@/modules/taxonomy/SidebarContent";
import styled from "@emotion/styled";
import { ReactElement, useState } from "react";
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
  const [rightContent, setRightContent] = useState(<Description/>)

  const changeRightContent = (content: JSX.Element) => {      
    setRightContent(content)
  }

  return (
    <>
      {/* Sidebar content */}
      <Sidebar>
        <SidebarContent changeRightContent={changeRightContent}/>
      </Sidebar>
      {/* Right page content */}
      <RightContent>
        {rightContent}
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

