import type { GetStaticProps, NextPage } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import styled from 'styled-components'
import { DocumentViewer } from '@/components'

const Container = styled.div`
  min-height: 100vh;
  padding: 24px 0;
  background: #fafafa;
`

const Home: NextPage = ({ documentRaw, response }: any) => {
  return (
    <Container>
      <DocumentViewer content={documentRaw} mentions={response} />
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const documentPath = path.join(process.cwd(), 'server', 'documents', 'bologna.txt')
  const responsePath = path.join(process.cwd(), 'server', 'response', 'bologna.json')
  const documentRaw = await fs.readFile(documentPath, 'utf-8');
  const response = JSON.parse(await fs.readFile(responsePath, 'utf8'));

  return {
    props: {
      documentRaw,
      response
    }
  }
}

export default Home
