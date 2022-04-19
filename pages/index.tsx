import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import { Button, Card, DocumentCard, NERDocumentViewer } from '@/components'
import { DocumentResponse } from './api/document'
import { DOCUMENTS } from '@/documents'
import { ChangeEvent, useState } from 'react'
import { Annotation } from '@/components/NERDocumentViewer'
import { withAuthSsr } from '@/lib/withAuthSsr'
import styled from '@emotion/styled'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0px auto;
  padding: 40px 20px;
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 160px;
`

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  margin: 0;
  padding: 10px;
  outline: none;
  border: none;
  box-shadow: 0 0 #0000,0 0 #0000, 0 0 #0000,0 0 #0000, inset 0 2px 4px 0 rgba(0,0,0,0.06);
  border: 1px solid rgba(229,231,235,1);
  border-radius: 6px;
  resize: vertical;
  font-size: 16px;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen, Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
`

/**
 * Homepage component
 */
const Home: NextPage<{}> = () => {
  const [text, setText] = useState<string>('');

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  return (
    <Container>
      <Section>
        <TextArea onChange={onChange} />
        <Button>Compute</Button>
        {/* <NERDocumentViewer content={text} annotations={annotations} /> */}
        {/* <Card>
          <TextArea />
          <Button>Compute</Button>
        </Card> */}
      </Section>

    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = withAuthSsr(async (context) => {
  return {
    props: {}
  }
});


export default Home
