import { AnnotationType } from "@/hooks/use-ner";
import styled from "@emotion/styled";
import { Divider, Text } from "@nextui-org/react";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import { FiUpload } from "@react-icons/all-files/fi/FiUpload";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { useDocumentActiveType, useDocumentDispatch, useDocumentTypes } from "../DocumentProvider/selectors";
import AddAnnotationModal from "./AddAnnotationModal";

export type Item = {
  label: string;
  color: string;
  children?: Record<string, Omit<Item, 'color'>>
};

type TreeListProps = {
  items: Record<string, Item>;
  value: string | undefined;
  onChange: (path: string) => void;
}

/**
 * Item which displays a type
 */
type ItemType = AnnotationType & {
  active: boolean;
  // path to the type (e.g., type1.subtype1)
  path: string;
  onClick: (path: string) => void;
};


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

const ItemColor = styled.div<{ color: string }>(({ color }) => ({
  width: '20px',
  height: '20px',
  borderRadius: '4px',
  background: color,
  border: '2px solid rgba(0,0,0,0.1)'
}));

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
})

const ItemType = ({ active, color, label, path, onClick }: ItemType) => {
  const splittedPath = path.split('.');
  const paddingLeft = (splittedPath.length - 1) * 30 + 14
  return (
    <ItemContainer
      paddingLeft={paddingLeft}
      active={active}
      onClick={() => onClick(path)} >
      <ItemColor color={color} />
      <Text css={{ fontSize: '18px' }}>{label}</Text>
    </ItemContainer>
  )
};

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

/**
 * Component which renders the types as a tree
 */
const TreeList = ({ items, value, onChange }: TreeListProps) => {
  const onClick = (path: string) => {
    onChange(path);
  }

  /**
   * Renders subtypes recursively
   */
  const renderSubTypes = (
    color: string,
    childrenTypes: Record<string, Omit<AnnotationType, "color">> | undefined,
    path: string
  ): ReactNode => {
    if (!childrenTypes) {
      return null;
    }

    return Object.keys(childrenTypes).map((subTypeKey) => {
      const { children, label } = childrenTypes[subTypeKey];
      const subPath = `${path}.${subTypeKey}`;
      const isActive = subPath === value;
      return (
        <Fragment key={subPath}>
          <ItemType
            label={label}
            color={color}
            active={isActive}
            path={subPath}
            onClick={onClick} />
          {renderSubTypes(color, children, subPath)}
        </Fragment>
      )
    });
  }

  return (
    <>
      {Object.keys(items).map((typeKey) => {
        const { color, label, children } = items[typeKey];
        const path = typeKey;
        const isActive = path === value;
        return (
          <Fragment key={typeKey}>
            <ItemType
              color={color}
              label={label}
              path={path}
              active={isActive}
              onClick={onClick} />
            {renderSubTypes(color, children, path)}
          </Fragment>
        )
      })}
    </>
  )
}


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

  const handleOnChange = (path: string) => {
    // change type
    dispatch({
      type: 'changeAction',
      payload: {
        action: {
          value: 'add',
          data: path
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
          <TreeList items={types} value={activeType} onChange={handleOnChange} />
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