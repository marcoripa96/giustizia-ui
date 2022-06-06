import { GetAllDocuments } from "@/server/routers/document";
import styled from "@emotion/styled";
import { Table, styled as styledNext, Button, Text } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import DocumentCard from "./DocumentCard";
import { FaTh } from "@react-icons/all-files/fa/FaTh"
import { FaListUl } from "@react-icons/all-files/fa/FaListUl"


type DocumentsListProps = {
  documents: GetAllDocuments;
}

const DocumentsGridContainer = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill,minmax(256px,1fr))',
  gridGap: '32px 32px'
})

const DocumentsGrid = ({ documents }: DocumentsListProps) => {
  return (
    <DocumentsGridContainer>
      {documents.map(({ id, ...props }) => <DocumentCard key={id} id={id} {...props} />)}
    </DocumentsGridContainer>
  )
}

const columns = [
  {
    key: "title",
    label: "Title",
  },
  {
    key: "preview",
    label: "Preview",
  },
  {
    key: "lastModified",
    label: "Last modified",
  },
];

const CellOverflowHidden = styled.div({
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  maxWidth: '400px',
})

const DocumentsTable = ({ documents }: DocumentsListProps) => {
  return (
    <Table
      lined
      shadow={false}
      css={{
        height: "auto",
        minWidth: "100%",
      }}
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column key={column.key}>{column.label}</Table.Column>
        )}
      </Table.Header>
      <Table.Body items={documents}>
        {(item) => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>
              <CellOverflowHidden>
                {item.preview}
              </CellOverflowHidden>
            </Table.Cell>
            <Table.Cell>Edited 2 days ago</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  )
}

type DocumentsListView = 'grid' | 'table';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
})


const DocumentsList = ({ documents }: DocumentsListProps) => {
  const [view, setView] = useState<DocumentsListView>('grid');

  return (
    <Container>
      <Text h3>{`Documents (${documents.length})`}</Text>
      {view === 'grid' ? (
        <DocumentsGrid documents={documents} />
      ) : (
        <DocumentsTable documents={documents} />
      )}
    </Container>
  )
}

export default DocumentsList;