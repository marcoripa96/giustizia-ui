import styled from "@emotion/styled";
import { Text, Tooltip } from "@nextui-org/react";
import { darken } from "polished";
import { MouseEvent, useMemo } from "react";
import { ChildTreeItem, TreeItem } from "./Tree";
import { useTreeContext } from "./TreeContext";
import { countChildren } from "./utils";
import { FiX } from '@react-icons/all-files/fi/FiX'
import { FiPlus } from '@react-icons/all-files/fi/FiPlus'
import { FiEdit2 } from '@react-icons/all-files/fi/FiEdit2'
import { FiSearch } from '@react-icons/all-files/fi/FiSearch'
import { FiInfo } from '@react-icons/all-files/fi/FiInfo'
import { CONTAINER_ITEM_SIZE, PARENT_SQUARE_SIZE, PADDING, INDENTATION_OFFSET, CHILD_SQUARE_SIZE } from "./Branch";
import { Flex } from "../Flex";

type NodeProps = {
  item: TreeItem | ChildTreeItem;
  hasChildren: boolean;
  isExpanded: boolean;
  level: number;
  toggle: () => void;
};

export function isTopLevelItem(
  value: TreeItem | ChildTreeItem,
  level: number
): value is TreeItem {
  return level === 0;
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
  borderRadius: '6px',
  cursor: 'pointer',
  '&:hover': {
    background: 'rgba(0,0,0,0.03)',
    'button': {
      visibility: 'visible'
    }
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
  hasChildren: boolean,
  isExpanded: boolean
}>(
  ({ level }) => ({
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
    })
  })
);

const ColoredSquared = styled.div<{ color: string }>(({ color }) => ({
  position: 'relative',
  width: `${PARENT_SQUARE_SIZE}px`,
  height: `${PARENT_SQUARE_SIZE}px`,
  borderRadius: "5px",
  background: color,
  boxShadow: `inset 0 0 0 1px ${darken(0.15, color)}`,
  flexShrink: 0
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
  background: darken(0.1, color),
  flexShrink: 0
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
  display: 'inline-block',
  position: 'relative',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  paddingRight: '32px',
  '&:hover': {
    paddingRight: '57px',
    '> div': {
      transform: 'translateY(-50%) translateX(-25px)'
    }
  },
  '& > svg': {
    width: '15px',
    height: '15px',
    color: '#ff00007d',
    verticalAlign: 'middle',
    marginLeft: '10px'
  }
})

const NodeActionsContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
})

const ActionButton = styled.button({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
  padding: '5px',
  border: 'none',
  outline: 'none',
  borderRadius: '6px',
  background: 'transparent',
  cursor: 'pointer',
  visibility: 'hidden',
  '&:hover': {
    background: 'rgba(0,0,0,0.1)',
  },
  '> svg': {
    width: '100%',
    height: '100%',
    color: 'rgba(0,0,0,0.5)'
  }
})

function Node({ item, toggle, hasChildren, level, ...props }: NodeProps) {
  const { isSelected, onNodeSelect, onNodeDelete, onNodeAdd, onNodeEdit, onNodeGetZeroShotCandidates } = useTreeContext();

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

  const handleAdd = (event: MouseEvent) => {
    event.stopPropagation();
    onNodeAdd(item.key);
  }

  const handleEdit = (event: MouseEvent) => {
    event.stopPropagation();
    onNodeEdit(item.key);
  }

  const handleGetZeroShotCandidates = (event: MouseEvent) => {
    event.stopPropagation();
    onNodeGetZeroShotCandidates(item.key);
  }

  const renderNodeSquare = () => {
    if (isTopLevelItem(item, level)) {
      return (
        <ColoredSquared color={item.color}>
          {hasChildren && (
            <NumberSquare color={item.color}>
              <Text size={11} b>{nTotalSubChildren}</Text>
            </NumberSquare>
          )}
        </ColoredSquared>
      )
    }

    if (hasChildren) {
      return (
        <SoloNumberSquare>
          <Text size={11} b>{nTotalSubChildren}</Text>
        </SoloNumberSquare>
      )
    }

    return null;
  }

  const nTotalSubChildren = useMemo(() => hasChildren ? countChildren(item) : 0, [item, hasChildren]);
  const selected = isSelected(item.key);

  return (
    <Container
      selected={selected}
      onClick={handleClick} >
      <InnerContainer
        level={level}
        hasChildren={hasChildren}
        {...props}>
        {renderNodeSquare()}
        <NodeTextContainer>
          {hasChildren ? <b>{item.label}</b> : item.label}
        </NodeTextContainer>
        <NodeActionsContainer>
          <ActionButton onClick={handleAdd}>
            <FiPlus />
          </ActionButton>
          {!isTopLevelItem(item, level) && (
            <>
              <ActionButton onClick={handleGetZeroShotCandidates}>
                <FiSearch />
              </ActionButton>
              <ActionButton onClick={handleEdit}>
                <FiEdit2 />
              </ActionButton>
              <ActionButton onClick={handleDelete}>
                <FiX />
              </ActionButton>
            </>
          )}
        </NodeActionsContainer>
      </InnerContainer>
    </Container>
  );
}

export default Node;
