import type { GetServerSideProps, NextPage } from 'next'
import { MainToolbar } from '@/components'
import { withAuthSsr } from '@/lib/withAuthSsr'
import styled from '@emotion/styled'
import { QueryText } from '@/modules/infer/QueryText'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* max-width: 1200px; */
  margin: 0px auto;
  /* padding: 0 20px; */
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

const Title = styled.h1`
  font-size: 42px;
  margin: 0;
`

const SubTitle = styled.h3`
  font-size: 24px;
  color: rgb(75 85 99);
  font-weight: normal;
  margin: 0;
  margin-bottom: 30px;
`


/**
 * Homepage component
 */
const Home: NextPage<{}> = () => {

  return (
    <Container>
      <Section>
        <Title>GiustiziaUI</Title>
        <SubTitle>Here you can try out the pipeline.</SubTitle>
        <QueryText />
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
