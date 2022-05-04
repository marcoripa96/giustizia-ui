import type { GetServerSideProps, NextPage } from 'next'
import { DocumentCard } from '@/components'
import { withAuthSsr } from '@/lib/withAuthSsr'
import styled from '@emotion/styled'
import { useQuery } from '@/utils/trpc'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0px auto;
  padding: 40px 20px;

  @media (max-width: 1300px) {
    max-width: 900px;
  }
`

const DocumentsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  margin: 0px auto;

  @media (max-width: 1300px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 990px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 660px) {
    grid-template-columns: 1fr;
  }
`

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 48px;
`

/**
 * Homepage component
 */
const Documents: NextPage = () => {
  const { data: documents } = useQuery(['document.getAllDocuments']);

  if (!documents) {
    return null;
  }

  return (
    <Container>
      <PageTitle>Documents ({documents.length})</PageTitle>
      <DocumentsContainer>
        {documents.map(({ id, ...props }, index) => <DocumentCard key={index} id={id} {...props} />)}
      </DocumentsContainer>
    </Container>
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
