import { isTopLevelItem } from "./Node";
import { TreeItem, ChildTreeItem } from "./Tree";

export type ParentNode = Omit<TreeItem, "children"> & { parent: string | null };
export type ChildNode = Omit<ChildTreeItem, "children"> & { parent: string };
export type ChildNodeWithColor = Omit<ChildNode, 'parent'> & { color: string };
export type FlatTreeNode = ParentNode | ChildNode;
export type FlatTreeObj = Record<string, FlatTreeNode>;

export function isParentNode(
  value: TreeItem | ChildTreeItem,
): value is TreeItem {
  return Object.hasOwn(value, 'color')
}

export const getParents = (obj: FlatTreeObj) => {
  return Object.values(obj).reduce((acc, item) => {
    const { parent, ...rest } = item;
    if (parent === null) {
      acc.push(rest as TreeItem);
    }
    return acc;
  }, [] as TreeItem[]);
};

export const getChildren = (obj: FlatTreeObj, key: string) => {
  return Object.values(obj).reduce((acc, item) => {
    const { parent, ...childProps } = item;
    if (parent === key) {
      const child = {
        ...childProps,
        children: getChildren(obj, childProps.key)
      } as ChildTreeItem;

      acc.push(child);
    }
    return acc;
  }, [] as ChildTreeItem[]);
};

export const buildTreeFromFlattenedObject = (obj: FlatTreeObj) => {
  const tree = getParents(obj).map((parent) => {
    return {
      ...parent,
      children: getChildren(obj, parent.key)
    };
  });
  return tree;
};

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

export const insertNodeFlat = (obj: FlatTreeObj, node: FlatTreeNode) => {
  return {
    ...obj,
    [node.key]: node
  }
}

export const getNode = (obj: FlatTreeObj, key: string): FlatTreeNode => {
  const node = obj[key];
  if (!node) {
    // if there is no node return the 'unknown node'
    return getNode(obj, 'UNK');
    // throw Error(`The key '${key}' doesn't exist in the tree`);
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

export const getAllNodeData = (obj: FlatTreeObj, key: string): ChildNodeWithColor => {
  const node = getNode(obj, key);
  const parentNode = ascend(obj, key) as ParentNode;
  const { parent, ...nodeProps } = node;

  return {
    color: parentNode.color,
    ...nodeProps
  };
};

export const getNodesPath = (
  obj: FlatTreeObj,
  key: string,
  nodes: FlatTreeNode[] = []
): FlatTreeNode[] => {
  const node = getNode(obj, key);

  nodes = [node, ...nodes];

  if (!node.parent) {
    return nodes;
  }
  return getNodesPath(obj, node.parent, nodes);
};

export const getChildrenFromFlatTaxonomy = <T = FlatTreeNode>(
  obj: FlatTreeObj,
  key: string,
  nodes: T[] = [],
  transformFn?: (node: FlatTreeNode) => T
): T[] => {
  if (!(key in obj)) {
    return [];
  }
  return [
    ...nodes,
    ...Object.values(obj).reduce((acc, node) => {
      if (node.parent === key) {
        const value = (transformFn ? transformFn(node) : node) as T;
        acc.push(
          value,
          ...getChildrenFromFlatTaxonomy(obj, node.key, nodes, transformFn)
        );
      }
      return acc;
    }, [] as T[])
  ]
}

export const getNodeAndChildren = <T = FlatTreeNode>(
  obj: FlatTreeObj,
  key: string,
  transformFn?: (node: FlatTreeNode) => T
): T[] => {
  const node = getNode(obj, key);
  const value = (transformFn ? transformFn(node) : node) as T;
  return [value, ...getChildrenFromFlatTaxonomy<T>(obj, node.key, [], transformFn)]
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
