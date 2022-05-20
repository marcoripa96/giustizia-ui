import styled from "@emotion/styled";
import { useCallback } from "react";
import { TreeContext } from "./TreeContext";
import Branch from "./Branch";

type TreeProps = {
  items: TreeItem[];
  selected?: string;
  onNodeSelect?: (key: string) => void;
};

export type TreeItem = {
  // key of the type e.g., PER, DATE..., each key should be unique
  key: string;
  label: string;
  color: string;
  children?: ChildTreeItem[];
};

export type ChildTreeItem = Omit<TreeItem, "color">;

const Container = styled.div({
  display: "flex",
  flexDirection: "column"
});

function Tree(props: TreeProps) {
  const { items, selected, onNodeSelect: onNodeSelectProp } = props;

  const onNodeSelect = useCallback(
    (key: string) => {
      if (onNodeSelectProp) {
        onNodeSelectProp(key);
      }
    },
    [onNodeSelectProp]
  );

  const isSelected = useCallback((key: string) => key === selected, [selected]);

  return (
    <TreeContext.Provider
      value={{
        onNodeSelect,
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
