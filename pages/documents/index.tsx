import type { GetServerSideProps, GetServerSidePropsContext, GetStaticProps, NextPage } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import styled from 'styled-components'
import { DocumentResponse } from '../api/document'
import { DocumentCard } from '@/components'
import { DOCUMENTS } from '@/documents'
import { withAuthSsr } from '@/lib/withAuthSsr'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0px auto;
  padding: 40px 20px;
`

const DocumentsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  margin: 0px auto;
`

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 48px;
`

type DocumentsProps = {
  documents: DocumentResponse;
}

/**
 * Homepage component
 */
const Documents: NextPage<DocumentsProps> = ({ documents }) => {
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
  const documents = await Promise.all(Object.keys(DOCUMENTS).map(async (key) => {
    const document = DOCUMENTS[key];
    const documentPath = path.join(process.cwd(), '_files', document.content);
    const content = await fs.readFile(documentPath, 'utf-8');
    const preview = content.slice(0, 600);
    return {
      id: document.id,
      title: document.title,
      preview
    }
  }));
  return {
    props: {
      documents
    }, // will be passed to the page component as props
  }
});

export default Documents
