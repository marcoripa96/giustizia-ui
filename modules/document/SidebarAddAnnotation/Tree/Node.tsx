import styled from "@emotion/styled";
import { Text } from "@nextui-org/react";
import { darken, rgba } from "polished";
import { useMemo } from "react";
import { ChildTreeItem, TreeItem } from "./Tree";
import { useTreeContext } from "./TreeContext";
import { countChildren } from "./utils";

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
};

type ChildNodeProps = {
  item: ChildTreeItem;
  hasChildren: boolean;
  nTotalSubChildren: number;
};

const SQUARE_SIZE = 20;
const PADDING = SQUARE_SIZE + 10;
const OFFSET = 10;

const getPaddingLeft = (level: number, hasChildren: boolean) => {
  if (level === 0) {
    return 5 + level * OFFSET;
  }
  if (level === 1) {
    return hasChildren ? PADDING : PADDING + OFFSET;
  }
  return hasChildren ? PADDING + (15 * level) + 10 : PADDING + OFFSET * level
}

const Container = styled.div<{
  level: number;
  nDirectSubChildren: number;
  selected: boolean,
  hasChildren: boolean,
  isExpanded: boolean
}>(
  ({ level, nDirectSubChildren, selected, hasChildren, isExpanded }) => ({
    position: 'relative',
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    alignItems: "center",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: getPaddingLeft(level, hasChildren),
    transition: 'background 150ms ease-out',
    cursor: 'pointer',
    '&:hover': {
      background: 'rgba(0,0,0,0.03)'
    },
    '&:active': {
      background: 'rgba(0,0,0,0.08)'
    },
    ...(level > 0 && {
      '&:before': {
        content: "''",
        position: 'absolute',
        left: 5 + (SQUARE_SIZE / 2) + ((SQUARE_SIZE / 2) + OFFSET) * (level - 1),
        top: '50%',
        height: '1px',
        width: '5px',
        background: 'rgba(0,0,0,0.2)'
      }
    }),
    ...(isExpanded && {
      '&:after': {
        content: "''",
        position: 'absolute',
        left: 5 + (SQUARE_SIZE / 2) + ((SQUARE_SIZE / 2) + OFFSET) * level,
        top: '100%',
        height: nDirectSubChildren === 1 ? 17 : 17 + 17 * nDirectSubChildren,
        width: '1px',
        background: 'rgba(0,0,0,0.2)'
      }
    }),
    ...(selected && {
      background: "rgba(0,0,0,0.05)"
    })
  })
);

const ColoredSquared = styled.div<{ color: string }>(({ color }) => ({
  position: 'relative',
  width: `${SQUARE_SIZE}px`,
  height: `${SQUARE_SIZE}px`,
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
  width: '15px',
  height: '15px',
  background: darken(0.1, color)
}));

const SoloNumberSquare = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: "5px",
  width: '15px',
  height: '15px',
  background: 'rgba(0,0,0,0.1)'
});

function TopLevelNode({ item, hasChildren, nTotalSubChildren }: TopLevelNodeProps) {
  return (
    <>
      <ColoredSquared color={item.color}>
        {hasChildren && (
          <NumberSquare color={item.color}>
            <Text size={11} b>{nTotalSubChildren}</Text>
          </NumberSquare>
        )}
      </ColoredSquared>
      {hasChildren ? <b>{item.label}</b> : item.label}
    </>
  );
}

function ChildNode({ item, hasChildren, nTotalSubChildren }: ChildNodeProps) {
  return (
    <>
      {hasChildren && (
        <SoloNumberSquare>
          <Text size={11} b>{nTotalSubChildren}</Text>
        </SoloNumberSquare>
      )}

      {hasChildren ? <b>{item.label}</b> : item.label}
    </>
  )
}

function Node({ item, toggle, hasChildren, ...props }: NodeProps) {
  const { isSelected, onNodeSelect } = useTreeContext();

  const handleClick = () => {
    if (hasChildren) {
      toggle();
    }
    onNodeSelect(item.key);
  };

  const nTotalSubChildren = useMemo(() => hasChildren ? countChildren(item) : 0, [item, hasChildren]);
  const nDirectSubChildren = item.children ? item.children.length : 0;
  const selected = isSelected(item.key);

  return (
    <Container
      selected={selected}
      hasChildren={hasChildren}
      onClick={handleClick}
      nDirectSubChildren={nDirectSubChildren}
      {...props}>
      {isTopLevelItem(item) ? (
        <TopLevelNode
          item={item}
          hasChildren={hasChildren}
          nTotalSubChildren={nTotalSubChildren} />
      ) : (
        <ChildNode
          item={item}
          hasChildren={hasChildren}
          nTotalSubChildren={nTotalSubChildren} />
      )}
    </Container>
  );
}

export default Node;
