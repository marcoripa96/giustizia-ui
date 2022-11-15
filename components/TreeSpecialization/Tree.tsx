import styled from "@emotion/styled";
import { useCallback } from "react";
import { TreeContext } from "./TreeContext";
import Branch from "./Branch";

type TreeProps = {
  items: TreeItem[];
  selected?: string;
  onNodeSelect?: (key: string) => void;
  onNodeDelete?: (key: string) => void;
  onNodeAdd?: (key: string) => void;
  onNodeEdit?: (key: string) => void;
  onNodeGetZeroShotCandidates?: (key: string) => void;
};

export type TreeItem = {
  // key of the type e.g., PER, DATE..., each key should be unique
  key: string;
  label: string;
  color: string;
  terms?: string[];
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
    onNodeDelete: onNodeDeleteProp,
    onNodeAdd: onNodeAddProp,
    onNodeEdit: onNodeEditProp,
    onNodeGetZeroShotCandidates: onNodeGetZeroShotCandidatesProp,
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

  const onNodeAdd = useCallback(
    (key: string) => {
      if (onNodeAddProp) {
        onNodeAddProp(key);
      }
    },
    [onNodeAddProp]
  );

  const onNodeEdit = useCallback(
    (key: string) => {
      if (onNodeEditProp) {
        onNodeEditProp(key);
      }
    },
    [onNodeEditProp]
  );

  const onNodeGetZeroShotCandidates = useCallback(
    (key: string) => {
      if (onNodeGetZeroShotCandidatesProp) {
        onNodeGetZeroShotCandidatesProp(key);
      }
    },
    [onNodeGetZeroShotCandidatesProp]
  );

  const isSelected = useCallback((key: string) => key === selected, [selected]);

  return (
    <TreeContext.Provider
      value={{
        onNodeSelect,
        onNodeDelete,
        onNodeAdd,
        onNodeEdit,
        onNodeGetZeroShotCandidates,
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
