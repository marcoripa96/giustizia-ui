import Table from "@/modules/kb/Table";
import TableToolbar from "@/modules/kb/TableToolbar";
import Toolbar from "@/modules/kb/Toolbar";
import styled from "@emotion/styled"
// import { Card, Table } from "@nextui-org/react";
import { ReactElement, useMemo } from "react";
import { NextPageWithLayout } from "./_app";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 100vh;
//   max-width: 1250px;
//   margin: 0 auto 0 auto;
// `


const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  // maxWidth: '1250px',
  // margin: '0 auto 0 auto',
  // paddingBottom: '10px',
  // '> div': {
  //   height: '100%',
  //   overflowX: 'hidden'
  // }
})

const PageContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  maxWidth: '1250px',
  margin: '0 auto 0 auto',
  padding: '10px',

})

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const columns = [
  {
    key: "title",
    label: "TITLE",
  },
  {
    key: "extract",
    label: "DESCRIPTION",
  },
  {
    key: "link",
    label: "LINK",
  },
];

const makeData = (n: number) => {
  return Array.from({ length: n }).map((_, index) => {
    return {
      key: index,
      ...columns.reduce((acc, col) => {
        acc[col.key] = 'test';
        return acc;
      }, {} as any)
    }
  })
}


const KB = () => {
  return (
    <Container>
      <Toolbar />
      <PageContent>
        <Table />
      </PageContent>
    </Container>
  )
}



export default KB