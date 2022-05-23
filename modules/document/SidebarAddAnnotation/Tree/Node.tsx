import styled from "@emotion/styled";
import { Text } from "@nextui-org/react";
import { borderRadius, darken, rgba } from "polished";
import { MouseEvent, useMemo } from "react";
import { ChildTreeItem, TreeItem } from "./Tree";
import { useTreeContext } from "./TreeContext";
import { countChildren } from "./utils";
import { FiX } from '@react-icons/all-files/fi/FiX'

type NodeProps = {
  item: TreeItem | ChildTreeItem;
  hasChildren: boolean;
  isExpanded: boolean;
  level: number;
  toggle: () => void;
};

export function isTopLevelItem(
  value: TreeItem | ChildTreeItem
): value is TreeItem {
  return value.hasOwnProperty("color");
}

type TopLevelNodeProps = {
  item: TreeItem;
  hasChildren: boolean;
  nTotalSubChildren: number;
  onNodeDelete: (event: MouseEvent) => void;
};

type ChildNodeProps = {
  item: ChildTreeItem;
  hasChildren: boolean;
  nTotalSubChildren: number;
  onNodeDelete: (event: MouseEvent) => void;
};

// parent square size
const PARENT_SQUARE_SIZE = 20;
// child square size
const CHILD_SQUARE_SIZE = 15;
// padding of the container
const PADDING = 5;
// indentation
const INDENTATION_OFFSET = 25;
// container item size
const CONTAINER_ITEM_SIZE = 34;

const getArchHeight = (nDirectSubChildren: number) => {
  const half = CONTAINER_ITEM_SIZE / 2;
  return nDirectSubChildren === 1 ? half : half + half * nDirectSubChildren
}

const getPaddingLeftArch = (level: number) => {
  if (level === 0) {
    return PARENT_SQUARE_SIZE / 2 + PADDING;
  }
  return INDENTATION_OFFSET * level + CHILD_SQUARE_SIZE / 2 - 1 + PADDING;
}

const getPaddingLeftChildrenArch = (level: number) => {
  if (level === 1) {
    return PARENT_SQUARE_SIZE / 2 + PADDING;
  }
  return PADDING + INDENTATION_OFFSET * (level - 1) + CHILD_SQUARE_SIZE / 2 - 1;
}


const Container = styled.div<{ selected: boolean; }>(({ selected }) => ({
  position: 'relative',
  height: `${CONTAINER_ITEM_SIZE}px`,
  padding: `${PADDING}px`,
  transition: 'background 150ms ease-out',
  cursor: 'pointer',
  '&:hover': {
    background: 'rgba(0,0,0,0.03)'
  },
  '&:active': {
    background: 'rgba(0,0,0,0.08)'
  },
  ...(selected && {
    background: "rgba(0,0,0,0.05)"
  })
}));

const InnerContainer = styled.div<{
  level: number;
  nDirectSubChildren: number;
  hasChildren: boolean,
  isExpanded: boolean
}>(
  ({ level, nDirectSubChildren, hasChildren, isExpanded }) => ({
    display: "flex",
    flexDirection: "row",
    height: '100%',
    gap: "10px",
    alignItems: "center",
    paddingLeft: INDENTATION_OFFSET * level,
    ...(level > 0 && {
      '&:before': {
        content: "''",
        position: 'absolute',
        left: getPaddingLeftChildrenArch(level),
        top: '50%',
        height: '1px',
        width: '5px',
        background: 'rgba(0,0,0,0.2)'
      }
    }),
    ...(isExpanded && hasChildren && {
      '&:after': {
        content: "''",
        position: 'absolute',
        left: getPaddingLeftArch(level),
        top: '100%',
        height: getArchHeight(nDirectSubChildren),
        width: '1px',
        background: 'rgba(0,0,0,0.2)'
      }
    })
  })
);

const ColoredSquared = styled.div<{ color: string }>(({ color }) => ({
  position: 'relative',
  width: `${PARENT_SQUARE_SIZE}px`,
  height: `${PARENT_SQUARE_SIZE}px`,
  borderRadius: "5px",
  background: color,
  boxShadow: `inset 0 0 0 1px ${darken(0.15, color)}`
}));

const NumberSquare = styled.div<{ color: string }>(({ color }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: "5px",
  position: 'absolute',
  bottom: '-3px',
  right: '-3px',
  width: `${CHILD_SQUARE_SIZE}px`,
  height: `${CHILD_SQUARE_SIZE}px`,
  background: darken(0.1, color)
}));

const SoloNumberSquare = styled.div({
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: "5px",
  width: '15px',
  height: '15px',
  background: 'rgba(0,0,0,0.1)'
});

const NodeTextContainer = styled.div({
  flexGrow: 1,
  position: 'relative',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  paddingRight: '20px',
  '&:hover': {
    paddingRight: '35px',
    '> button': {
      visibility: 'visible'
    }
  }
})

const DeleteButton = styled.button({
  position: 'absolute',
  height: '20px',
  width: '20px',
  top: '50%',
  right: '10px',
  padding: 0,
  border: 'none',
  outline: 'none',
  borderRadius: '6px',
  background: 'transparent',
  transform: 'translateY(-50%)',
  visibility: 'hidden',
  cursor: 'pointer',
  '&:hover': {
    background: 'rgba(0,0,0,0.1)',
  },
  '> svg': {
    width: '100%',
    height: '100%',
    color: 'rgba(0,0,0,0.5)'
  }
})

function TopLevelNode({ item, hasChildren, nTotalSubChildren, onNodeDelete }: TopLevelNodeProps) {
  return (
    <>
      <ColoredSquared color={item.color}>
        {hasChildren && (
          <NumberSquare color={item.color}>
            <Text size={11} b>{nTotalSubChildren}</Text>
          </NumberSquare>
        )}
      </ColoredSquared>
      <NodeTextContainer>
        {hasChildren ? <b>{item.label}</b> : item.label}
        <DeleteButton onClick={onNodeDelete}>
          <FiX />
        </DeleteButton>
      </NodeTextContainer>
    </>
  );
}

function ChildNode({ item, hasChildren, nTotalSubChildren, onNodeDelete }: ChildNodeProps) {
  return (
    <>
      {hasChildren && (
        <SoloNumberSquare>
          <Text size={11} b>{nTotalSubChildren}</Text>
        </SoloNumberSquare>
      )}
      <NodeTextContainer>
        {hasChildren ? <b>{item.label}</b> : item.label}
        <DeleteButton onClick={onNodeDelete}>
          <FiX />
        </DeleteButton>
      </NodeTextContainer>
    </>
  )
}

function Node({ item, toggle, hasChildren, ...props }: NodeProps) {
  const { isSelected, onNodeSelect, onNodeDelete } = useTreeContext();

  const handleClick = () => {
    if (hasChildren) {
      toggle();
    }
    onNodeSelect(item.key);
  };

  const handleDelete = (event: MouseEvent) => {
    event.stopPropagation();
    onNodeDelete(item.key);
  }

  const nTotalSubChildren = useMemo(() => hasChildren ? countChildren(item) : 0, [item, hasChildren]);
  const nDirectSubChildren = item.children ? item.children.length : 0;
  const selected = isSelected(item.key);

  return (
    <Container
      selected={selected}
      onClick={handleClick} >
      <InnerContainer
        hasChildren={hasChildren}
        nDirectSubChildren={nDirectSubChildren}
        {...props}>
        {isTopLevelItem(item) ? (
          <TopLevelNode
            item={item}
            hasChildren={hasChildren}
            nTotalSubChildren={nTotalSubChildren}
            onNodeDelete={handleDelete} />
        ) : (
          <ChildNode
            item={item}
            hasChildren={hasChildren}
            nTotalSubChildren={nTotalSubChildren}
            onNodeDelete={handleDelete} />
        )}
      </InnerContainer>
    </Container>
  );
}

export default Node;
