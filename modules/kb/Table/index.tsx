import styled from "@emotion/styled"
import TableToolbar from "../TableToolbar"
import { Table as NextUITable } from "@nextui-org/react";
import { createContext, Key, useContext, useMemo, useState } from "react";

type Selection = 'all' | Set<Key>;

const TableContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  '> div:nth-of-type(2)': {
    height: '100%',
    overflowX: 'hidden',
  }
})

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

type TableContextState = {
  selectedRows: string | Key[];
}
export const TableContext = createContext<TableContextState | undefined>(undefined);
export const useTableContext = () => {
  const context = useContext(TableContext);

  if (context === undefined) {
    throw new Error('useTableContext must be used within a TableContextProvider')
  }

  return context;
}


const Table = () => {
  const [selectedRows, setSelectedRows] = useState<string | Key[]>([]);

  const rows = useMemo(() => makeData(40), []);

  const onSelectionChange = (keys: Selection) => {
    if (keys === 'all') {
      setSelectedRows('all')
    } else {
      setSelectedRows(Array.from(keys));
    }
  }

  const value = useMemo(() => ({ selectedRows, rows }), [selectedRows]);

  return (
    <TableContainer>
      <TableContext.Provider value={value}>
        <TableToolbar />
        <NextUITable
          onSelectionChange={onSelectionChange}
          selectionMode="multiple"
          shadow={false}
          aria-label="Example table with dynamic content"
          css={{
            height: "100%",
            minWidth: "100%",
            padding: '0',
            'thead': {
              display: 'table',
              width: '100%',
              tableLayout: 'fixed'
            },
            'tbody': {
              display: 'block',
              height: '100%',
              overflow: 'auto',
              paddingBottom: '40px',
              '::-webkit-scrollbar': {
                height: '4px',
                width: '4px'
              },
              '::-webkit-scrollbar-thumb': {
                background: 'rgba(0,0,0,0.1)'
              }
            },
            'tr': {
              display: 'table',
              width: '100%',
              tableLayout: 'fixed'
            }
          }}
        >
          <NextUITable.Header columns={columns}>
            {(column) => (
              <NextUITable.Column key={column.key}>{column.label}</NextUITable.Column>
            )}
          </NextUITable.Header>
          <NextUITable.Body items={rows}>
            {(item) => (
              <NextUITable.Row key={item.key}>
                {(columnKey) => <NextUITable.Cell>{item[columnKey as keyof typeof item]}</NextUITable.Cell>}
              </NextUITable.Row>
            )}
          </NextUITable.Body>
        </NextUITable>
      </TableContext.Provider>
    </TableContainer>
  )
}

export default Table;