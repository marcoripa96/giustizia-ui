import type { GetStaticProps, NextPage } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import styled from 'styled-components'
import { DocumentViewer } from '@/components'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { DocumentResponse } from './api/document'

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

const DocumentCard = styled.a`
  display: flex;
  flex-direction: column;
  height: 320px;
  min-width: 285px;
  padding: 24px;
  border-radius: 4px;
  background: #FFF;
  transition: box-shadow 250ms ease-out;

  &:hover {
    box-shadow: rgb(0 0 0 / 5%) 0px 1px 3px, rgb(0 0 0 / 5%) 0px 10px 15px -5px, rgb(0 0 0 / 4%) 0px 7px 7px -5px;
  }
`
const DocumentTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`

const DocumentDate = styled.div`
  font-size: 14px;
  color: #6c757d;
  margin: 0;
`

const DocumentPreview = styled.div`
  position: relative;
  font-size: 7px;
  border: 1px solid #e7e7e7;
  border-radius: 4px;
  flex-grow: 1;
  padding: 14px;
  overflow: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;

  &::after{
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(255,255,255,0) 85%, rgba(255,255,255,1) 100%);
  }
`

type DocumentProps = {
  id: string;
  title: string;
  preview: string;
}

const Document: FC<DocumentProps> = ({ id, title, preview }) => {
  return (
    <Link href={`/documents/${id}`} passHref>
      <DocumentCard>
        <DocumentTitle>{title}</DocumentTitle>
        <DocumentDate>Last modified yesterday</DocumentDate>
        <DocumentPreview>{preview}</DocumentPreview>
      </DocumentCard>
    </Link>
  )
}


const Home: NextPage = () => {
  const [documents, setDocuments] = useState<DocumentResponse>([]);

  useEffect(() => {
    fetch('/api/document')
      .then((res) => res.json())
      .then((data) => {
        setDocuments(data);
      });
  }, [])

  if (documents.length === 0) {
    return null
  }

  return (
    <Container>
      <PageTitle>Documents ({documents.length})</PageTitle>
      <DocumentsContainer>
        {documents.map(({ id, ...props }, index) => <Document key={index} id={id} {...props} />)}
      </DocumentsContainer>
    </Container>
  )
}

// export const getStaticProps: GetStaticProps = async (context) => {
//   const documentPath = path.join(process.cwd(), 'server', 'documents', 'bologna.txt')
//   const responsePath = path.join(process.cwd(), 'server', 'response', 'bologna.json')
//   const documentRaw = await fs.readFile(documentPath, 'utf-8');
//   const response = JSON.parse(await fs.readFile(responsePath, 'utf8'));

//   return {
//     props: {
//       documentRaw,
//       response
//     }
//   }
// }

export default Home
