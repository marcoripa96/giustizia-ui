import { ChildTreeItem, TreeItem } from "./Tree";
import Node from "./Node";
import { useToggle } from "@/hooks";

type BranchProps = {
  item: TreeItem | ChildTreeItem;
  level: number;
};

function Branch({ item, level }: BranchProps) {
  const [expanded, toggle] = useToggle(false);

  const { children } = item;

  const hasChildren = !!children && children.length > 0;

  const renderBranches = () => {
    if (!hasChildren) return null;

    const nextLevel = level + 1;
    return children.map((child) => (
      <Branch key={child.key} item={child} level={nextLevel} />
    ));
  };

  return (
    <>
      <Node
        item={item}
        hasChildren={hasChildren}
        isExpanded={expanded}
        level={level}
        toggle={toggle}
      />
      {expanded && renderBranches()}
    </>
  );
}

export default Branch;
