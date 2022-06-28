import type { GetServerSideProps, NextPage } from 'next'
import { withAuthSsr } from '@/lib/withAuthSsr'
import styled from '@emotion/styled'
import { QueryText } from '@/modules/infer/QueryText'
import { Text } from '@nextui-org/react'
import { NextPageWithLayout } from './_app'
import { ReactElement } from 'react'
import { Toolbar, useText } from '@/components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0px auto;
  background: linear-gradient(180deg,hsla(0,0%,100%,0) 0,#fff 300px),fixed 0 0 /20px 20px radial-gradient(#d1d1d1 1px,transparent 0),fixed 10px 10px /20px 20px radial-gradient(#d1d1d1 1px,transparent 0);
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  padding: 120px 20px;
`

const SubTitle = styled(Text)`
  color: rgb(75 85 99);
  font-weight: normal;
  margin: 0;
  margin-bottom: 30px;
`


/**
 * Homepage component
 */
const Home: NextPageWithLayout<{}> = () => {
  return (
    <Container>
      <Section>
        <Text h1>GiustiziaUI</Text>
        <SubTitle h3>Here you can try out the pipeline.</SubTitle>
        <QueryText />
      </Section>
    </Container>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Toolbar />
      {page}
    </>
  )
}

export default Home
