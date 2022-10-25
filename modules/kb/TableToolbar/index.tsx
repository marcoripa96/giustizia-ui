import { IconButton } from "@/components";
import styled from "@emotion/styled";
import { Input, Text, Tooltip } from "@nextui-org/react";
import { FiRotateCw } from "@react-icons/all-files/fi/FiRotateCw";
import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import { FiTrash } from "@react-icons/all-files/fi/FiTrash";
import { FiGitMerge } from "@react-icons/all-files/fi/FiGitMerge";


import { useTableContext } from "../Table";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column'
})

const ActionsBar = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '5px'
})

const SearchBarContainer = styled.div({
  width: '100%',
  padding: '5px 0'
})

const NumberOfRowsTag = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '2px 4px',
  borderRadius: '6px',
  fontSize: '12px',
  color: 'rgba(0, 114, 245, 1)',
  background: 'rgba(0, 114, 245, 0.2)'
})

const TableToolbar = () => {
  const { selectedRows } = useTableContext();

  console.log(selectedRows);

  return (
    <Container>


      <SearchBarContainer>
        <Input
          size="lg"
          shadow={false}
          bordered
          fullWidth
          placeholder="Search entity title"
          contentRight={
            <FiSearch />
          } />
      </SearchBarContainer>
      <ActionsBar>
        {selectedRows.length === 0 ? (
          <Tooltip content={"Refresh"} placement="bottom" color="invert">
            <IconButton rounded>
              <FiRotateCw />
            </IconButton>
          </Tooltip>
        ) : (
          <>
            <NumberOfRowsTag>
              {`Selected rows: ${selectedRows === 'all' ? 'All' : selectedRows.length}`}
            </NumberOfRowsTag>
            {selectedRows.length > 1 ? (
              <Tooltip content={"Merge"} placement="bottom" color="invert">
                <IconButton rounded>
                  <FiGitMerge />
                </IconButton>
              </Tooltip>

            ) : null}
            <Tooltip content={"Delete"} placement="bottom" color="invert">
              <IconButton rounded>
                <FiTrash />
              </IconButton>
            </Tooltip>
          </>
        )}
      </ActionsBar>
    </Container>
  )
};

export default TableToolbar;