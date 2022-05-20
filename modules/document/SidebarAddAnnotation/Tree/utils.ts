import { isTopLevelItem } from "./Node";
import { TreeItem, ChildTreeItem } from "./Tree";

export type ParentNode = Omit<TreeItem, "children"> & { parent: string | null };
export type ChildNode = Omit<ChildTreeItem, "children"> & { parent: string };

export type FlatTreeNode = ParentNode | ChildNode;

export type FlatTreeObj = Record<string, FlatTreeNode>;

export const transformChildrenToFlatObject = (
  objAccumulator: FlatTreeObj,
  parent: string,
  children: ChildTreeItem[] | undefined
): FlatTreeObj => {
  if (!children) {
    return objAccumulator;
  }
  return children.reduce((acc, child) => {
    const { children, ...childProps } = child;
    acc[childProps.key] = {
      ...childProps,
      parent
    };
    return transformChildrenToFlatObject(acc, childProps.key, children);
  }, objAccumulator);
};

export const flattenTree = (items: TreeItem[]): FlatTreeObj => {
  return items.reduce((acc, item) => {
    const { children, ...itemProps } = item;
    acc[itemProps.key] = {
      ...itemProps,
      parent: null
    };
    return transformChildrenToFlatObject(acc, itemProps.key, children);
  }, {} as FlatTreeObj);
};

export const getNode = (obj: FlatTreeObj, key: string) => {
  const node = obj[key];
  if (!node) {
    throw Error("The key doesn't exist in the tree");
  }
  return node;
};

export const ascend = (obj: FlatTreeObj, key: string): FlatTreeNode => {
  const node = getNode(obj, key);
  if (!node.parent) {
    return node;
  }
  return ascend(obj, node.parent);
};

export const getAllNodeData = (obj: FlatTreeObj, key: string) => {
  const node = getNode(obj, key);
  const parentNode = ascend(obj, key) as ParentNode;
  const { parent, ...nodeProps } = node;
  return {
    ...nodeProps,
    color: parentNode.color
  };
};

export const getPathToNode = (
  obj: FlatTreeObj,
  key: string,
  path = ""
): string => {
  const node = getNode(obj, key);

  path = path === "" ? key : `${key}.${path}`;

  if (!node.parent) {
    return path;
  }
  return getPathToNode(obj, node.parent, path);
};

export const addSubNode = (
  children: ChildTreeItem[] | undefined,
  splittedPath: string[],
  node: ChildTreeItem
): ChildTreeItem[] => {
  if (splittedPath.length === 0) {
    if (!children) {
      return [node];
    }
    return [...children, node];
  }
  const key = splittedPath.shift() as string;

  return children!.map((child) => {
    if (child.key === key) {
      return {
        ...child,
        children: addSubNode(child.children, splittedPath, node)
      };
    }
    return child;
  });
};

export const addNode = (
  items: TreeItem[],
  path: string,
  node: TreeItem | ChildTreeItem
): TreeItem[] => {
  if (path === "") {
    if (!isTopLevelItem(node)) {
      throw Error("You are trying to add a child node as parent node.");
    }
    return [...items, node];
  }

  const splittedPath = path.split(".");

  const key = splittedPath.shift() as string;

  return items.map((item) => {
    if (item.key === key) {
      return {
        ...item,
        children: addSubNode(item.children, splittedPath, node)
      };
    }
    return item;
  });
};

export const countChildren = (item: TreeItem | ChildTreeItem, accumulator: number = 0) => {
  if (!item.children || item.children.length === 0) {
    return accumulator;
  }
  return item.children.reduce((acc, child) => {
    acc = 1 + countChildren(child, acc);
    return acc;
  }, accumulator);
}
