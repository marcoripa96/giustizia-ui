import styled from "@emotion/styled";
import { Table, styled as styledNext, Text } from "@nextui-org/react";
import Link from "next/link";
import { Fragment, useState } from "react";
import DocumentCard from "./DocumentCard";
import { FaTh } from "@react-icons/all-files/fa/FaTh"
import { FaListUl } from "@react-icons/all-files/fa/FaListUl"
import { InfiniteData } from "react-query";
import { GetPaginatedDocuments } from "@/server/routers/document";


type DocumentsListProps = {
  data: InfiniteData<GetPaginatedDocuments>;
}

const DocumentsGridContainer = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill,minmax(256px,1fr))',
  gridGap: '32px 32px'
})

const DocumentsGrid = ({ data }: DocumentsListProps) => {
  return (
    <DocumentsGridContainer>
      {data.pages.map((page) => (
        <Fragment key={page.page}>
          {page.docs.map((doc) => (
            <DocumentCard key={doc.id} {...doc} />
          ))}
        </Fragment>
      ))}
    </DocumentsGridContainer>
  )
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
})


const DocumentsList = ({ data }: DocumentsListProps) => {
  return (
    <Container>
      <Text h3>{`Documents (${data.pages[0].totalDocs})`}</Text>
      <DocumentsGrid data={data} />
    </Container>
  )
}

export default DocumentsList;