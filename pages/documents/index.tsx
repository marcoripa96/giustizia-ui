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
import ToolbarContent from '@/modules/documents/ToolbarContent'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
`

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
    </Container>
  )
}

Documents.getLayout = function getLayout(page: ReactElement) {
  return (
    <ToolbarSidebarLayout
      toolbarContent={<ToolbarContent />}>
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
