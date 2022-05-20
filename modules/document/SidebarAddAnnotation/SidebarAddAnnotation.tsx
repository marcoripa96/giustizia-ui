import styled from "@emotion/styled";
import { Divider, Text } from "@nextui-org/react";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import { FiUpload } from "@react-icons/all-files/fi/FiUpload";
import { useEffect, useState } from "react";
import { useDocumentActiveType, useDocumentDispatch, useDocumentTypes } from "../DocumentProvider/selectors";
import AddAnnotationModal from "./AddAnnotationModal";
import { Tree } from "./Tree";


const ItemContainer = styled.button<{ active?: boolean, paddingLeft?: number }>(({ active, paddingLeft = 14 }) => ({
  border: 'none',
  outline: 'none',
  background: 'transparent',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
  padding: `10px 14px`,
  paddingLeft: `${paddingLeft}px`,
  '&:hover': {
    background: 'rgba(0,0,0,0.03)'
  },
  '&:active': {
    background: 'rgba(0,0,0,0.08)'
  },
  transition: '150ms ease-out',
  cursor: 'pointer',
  ...(active && {
    background: 'rgba(0,0,0,0.05)'
  })
}));

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
})

const TreeContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  '::-webkit-scrollbar': {
    height: '4px',
    width: '2px'
  },
  '::-webkit-scrollbar-thumb': {
    background: 'rgba(0,0,0,0.1)'
  }
});



const ContentTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '10px 14px'
})

const SidebarAddAnnotation = () => {
  const dispatch = useDocumentDispatch();
  // get all types
  const types = useDocumentTypes();
  // get currently active type
  const activeType = useDocumentActiveType();

  const [addModalVisible, setAddModalVisible] = useState(false);

  useEffect(() => {
    // set initial type
    const initialValue = Object.keys(types)[0];
    dispatch({
      type: 'changeAction',
      payload: {
        action: {
          value: 'add',
          data: initialValue
        },
      }
    })
  }, [types])

  const handleNodeSelect = (key: string) => {
    dispatch({
      type: 'changeAction',
      payload: {
        action: {
          value: 'add',
          data: key
        },
      }
    })
  }

  const handleCloseAddModal = () => {
    setAddModalVisible(false);
  }

  return (
    <>
      <Container>
        <ContentTitle>
          <Text b>Add annotation</Text>
          <Text css={{ fontSize: '14px', lineHeight: '1', color: 'rgba(0,0,0,0.5)' }}>
            Add a new annotation by selecting a span of text
          </Text>
        </ContentTitle>
        <Divider css={{ background: '#F3F3F5' }} />
        <TreeContainer>
          <Tree items={types} onNodeSelect={handleNodeSelect} selected={activeType} />
        </TreeContainer>
        <Divider css={{ background: '#F3F3F5' }} />
        <ItemContainer onClick={() => setAddModalVisible(true)}>
          <FiPlus />
          <Text css={{ fontSize: '18px' }}>Add new type</Text>
        </ItemContainer>
        <Divider css={{ background: '#F3F3F5' }} />
        <ItemContainer>
          <FiUpload />
          <Text css={{ fontSize: '18px' }}>Load taxonomy</Text>
        </ItemContainer>
        <Divider css={{ background: '#F3F3F5' }} />
      </Container>
      <AddAnnotationModal open={addModalVisible} onClose={handleCloseAddModal} />
    </>
  );
}

export default SidebarAddAnnotation;