import { ChildTreeItem, TreeItem } from "./Tree";
import Node from "./Node";
import { useToggle } from "@/hooks";
import styled from "@emotion/styled";

type BranchProps = {
  item: TreeItem | ChildTreeItem;
  level: number;
};

// parent square size
export const PARENT_SQUARE_SIZE = 20;
// child square size
export const CHILD_SQUARE_SIZE = 15;
// padding of the container
export const PADDING = 16;
// indentation
export const INDENTATION_OFFSET = 25;
// container item size
export const CONTAINER_ITEM_SIZE = 42;

const getPaddingLeftChildrenArch = (level: number) => {
  if (level === 1) {
    return PARENT_SQUARE_SIZE / 2 + PADDING;
  }
  return PADDING + INDENTATION_OFFSET * (level - 1) + CHILD_SQUARE_SIZE / 2 - 1;
}

const Container = styled.div<{
  level: number, hasChildren: boolean,
  expanded: boolean
}>(({ level, hasChildren, expanded }) => ({
  position: 'relative',
  ...(expanded && hasChildren && {
    '&:before': {
      position: 'absolute',
      top: CONTAINER_ITEM_SIZE,
      bottom: CONTAINER_ITEM_SIZE / 2,
      left: getPaddingLeftChildrenArch(level + 1),
      display: 'block',
      width: 0,
      borderLeft: '1px solid rgba(0,0,0,0.2)',
      content: "''"
    }
  }),
}));

function Branch({ item, level }: BranchProps) {
  const [expanded, toggle] = useToggle(false);

  const { children } = item;

  const nChildren = children ? children.length : 0;
  const hasChildren = !!children && nChildren > 0;

  const renderBranches = () => {
    if (!hasChildren) return null;

    const nextLevel = level + 1;
    return children.map((child) => (
      <Branch key={child.key} item={child} level={nextLevel} />
    ));
  };

  return (
    <Container level={level} hasChildren={hasChildren} expanded={expanded} >
      <Node
        item={item}
        hasChildren={hasChildren}
        isExpanded={expanded}
        level={level}
        toggle={toggle}
      />
      {expanded && renderBranches()}
    </Container>
  );
}

export default Branch;
