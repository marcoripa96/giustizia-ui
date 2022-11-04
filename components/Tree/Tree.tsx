import styled from "@emotion/styled";
import { useCallback } from "react";
import { TreeContext } from "./TreeContext";
import Branch from "./Branch";

type TreeProps = {
  items: TreeItem[];
  selected?: string;
  onNodeSelect?: (key: string) => void;
  onNodeDelete?: (key: string) => void;
};

export type TreeItem = {
  // key of the type e.g., PER, DATE..., each key should be unique
  key: string;
  label: string;
  color: string;
  // if it can be recognized by the algorithm
  recognizable?: boolean;
  children?: ChildTreeItem[];
};

export type ChildTreeItem = Omit<TreeItem, "color">;

const Container = styled.div({
  display: "flex",
  flexDirection: "column"
});

function Tree(props: TreeProps) {
  const {
    items,
    selected,
    onNodeSelect: onNodeSelectProp,
    onNodeDelete: onNodeDeleteProp
  } = props;

  const onNodeSelect = useCallback(
    (key: string) => {
      if (onNodeSelectProp) {
        onNodeSelectProp(key);
      }
    },
    [onNodeSelectProp]
  );

  const onNodeDelete = useCallback(
    (key: string) => {
      if (onNodeDeleteProp) {
        onNodeDeleteProp(key);
      }
    },
    [onNodeDeleteProp]
  );

  const isSelected = useCallback((key: string) => key === selected, [selected]);

  return (
    <TreeContext.Provider
      value={{
        onNodeSelect,
        onNodeDelete,
        isSelected
      }}
    >
      <Container>
        {items.map((item) => (
          <Branch key={item.key} item={item} level={0} />
        ))}
      </Container>
    </TreeContext.Provider>
  );
}

export default Tree;
