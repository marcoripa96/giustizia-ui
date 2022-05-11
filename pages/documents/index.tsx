import type { GetServerSideProps, NextPage } from 'next'
import { ToolbarSidebarLayout } from '@/components'
import { withAuthSsr } from '@/lib/withAuthSsr'
import styled from '@emotion/styled'
import { useQuery } from '@/utils/trpc'
import { NextPageWithLayout } from '../_app'
import { ReactElement } from 'react'
import { Card } from '@nextui-org/react'
import ActionBar from '@/modules/documents/ActionBar'
import DocumentCard from '@/modules/documents/DocumentCard'
import DocumentsList from '@/modules/documents/DocumentsList'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  /* min-height: 100vh; */
  /* max-width: 1200px; */
  /* margin: 0px auto; */
  /* padding: 40px 20px; */

  /* @media (max-width: 1300px) {
    max-width: 900px;
  } */
`

// const DocumentsContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill,minmax(256px,1fr));
//   grid-gap: 32px 32px;
//   /* display: grid;
//   grid-template-columns: 1fr 1fr 1fr 1fr;
//   grid-gap: 20px;
//   margin: 0px auto;

//   @media (max-width: 1300px) {
//     grid-template-columns: 1fr 1fr 1fr;
//   }

//   @media (max-width: 990px) {
//     grid-template-columns: 1fr 1fr;
//   }

//   @media (max-width: 660px) {
//     grid-template-columns: 1fr;
//   } */
// `

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 48px;
`

/**
 * Homepage component
 */
const Documents: NextPageWithLayout = () => {
  const { data: documents } = useQuery(['document.getAllDocuments']);

  if (!documents) {
    return null;
  }

  return (
    <Container>
      <ActionBar />
      <DocumentsList documents={documents} />
      {/* <PageTitle>Documents ({documents.length})</PageTitle>
      <DocumentsContainer>
        {documents.map(({ id, ...props }, index) => <DocumentCard key={index} id={id} {...props} />)}
      </DocumentsContainer> */}
    </Container>
  )
}

Documents.getLayout = function getLayout(page: ReactElement) {
  return (
    <ToolbarSidebarLayout>
      {page}
    </ToolbarSidebarLayout>
  )
}


/**
 * Get all documents from the server before rendering the page
 */
export const getServerSideProps: GetServerSideProps = withAuthSsr(async (context) => {
  return {
    props: {}
  }
});

export default Documents
