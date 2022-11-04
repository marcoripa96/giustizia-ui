import { ConfirmationDialog, useConfirmationDialog, useText } from "@/components";
import useModal from "@/hooks/use-modal";
import { isEmptyObject } from "@/utils/shared";
import styled from "@emotion/styled";
import { Divider, Text } from "@nextui-org/react";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import { FiUpload } from "@react-icons/all-files/fi/FiUpload";
import { useEffect, useState } from "react";
import { selectDocumentActiveType, selectTaxonomyTree, useDocumentDispatch, useSelector } from "../DocumentProvider/selectors";
import AddAnnotationModal from "./AddAnnotationModal";
import { Tree } from "../../../components/Tree";

type DeleteModalProps = {
  onConfirm: () => void;
}


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
  const t = useText('document');
  const dispatch = useDocumentDispatch();
  // get all types
  const taxonomyTree = useSelector(selectTaxonomyTree);
  // const taxonomyTree = useDocumentTaxonomyTree();
  // get currently active type
  const activeType = useSelector(selectDocumentActiveType);

  const {
    bindings: bindingsAddType,
    setVisible: setAddTypeVisible
  } = useModal();
  const {
    bindings: bindingsDeleteNode,
    props: propsDeleteNode,
    setVisible: setDeleteNodeVisible
  } = useConfirmationDialog<DeleteModalProps>();

  useEffect(() => {
    // set initial type
    const initialValue = isEmptyObject(taxonomyTree) ? '' : taxonomyTree[0].key;
    dispatch({
      type: 'changeActionData',
      payload: {
        data: initialValue
      }
    })
  }, [taxonomyTree])

  const handleNodeSelect = (key: string) => {
    dispatch({
      type: 'changeActionData',
      payload: {
        data: key
      }
    })
  }

  const handleNodeDelete = (key: string) => {
    const onConfirm = () => {
      dispatch({
        type: 'deleteTaxonomyType',
        payload: { key }
      })
      setDeleteNodeVisible({ open: false })
    }
    setDeleteNodeVisible({ open: true, props: { onConfirm } })
  }

  return (
    <>
      <Container>
        <ContentTitle>
          <Text b>{t('leftSidebar.addContent.title')}</Text>
          <Text css={{ fontSize: '14px', lineHeight: '1', color: 'rgba(0,0,0,0.5)' }}>
            {t('leftSidebar.addContent.description')}
          </Text>
        </ContentTitle>
        <Divider css={{ background: '#F3F3F5' }} />
        <TreeContainer>
          <Tree items={taxonomyTree} onNodeSelect={handleNodeSelect} onNodeDelete={handleNodeDelete} selected={activeType} />
        </TreeContainer>
        <Divider css={{ background: '#F3F3F5' }} />
        <ItemContainer onClick={() => setAddTypeVisible(true)}>
          <FiPlus />
          <Text css={{ fontSize: '18px' }}>{t('leftSidebar.addContent.addType')}</Text>
        </ItemContainer>
        <Divider css={{ background: '#F3F3F5' }} />
        <ItemContainer>
          <FiUpload />
          <Text css={{ fontSize: '18px' }}>{t('leftSidebar.addContent.loadTaxonomy')}</Text>
        </ItemContainer>
        <Divider css={{ background: '#F3F3F5' }} />
      </Container>
      <AddAnnotationModal {...bindingsAddType} />
      <ConfirmationDialog
        {...bindingsDeleteNode}
        {...propsDeleteNode}
        content="By deleting this type from the taxonomy you will also delete all annotations with this entity type. Are you sure?" />
    </>
  );
}

export default SidebarAddAnnotation;