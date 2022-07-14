import { ChildNodeWithColor } from "@/modules/document/SidebarAddAnnotation/Tree";
import styled from "@emotion/styled";
import { darken } from "polished";
import { PropsWithChildren, useMemo } from "react";

type NERTagBaseProps = {
  types: string[];
  getTaxonomyNode: (key: string) => ChildNodeWithColor;
}

const Tag = styled.span<{ color: string }>(({ color }) => ({
  position: 'relative',
  padding: `3px 5px`,
  borderRadius: '6px',
  background: color,
  color: darken(0.70, color),
  cursor: 'pointer',
}));

const TagLabel = styled.span<{ color: string }>(({ color }) => ({
  fontSize: '11px',
  fontWeight: 600,
  textTransform: 'uppercase',
  marginLeft: '6px',
  padding: '0 3px',
  borderRadius: '4px',
  pointerEvents: 'none',
  background: darken(0.35, color),
  color: color,
  verticalAlign: 'middle'
}));

const NERTagBase = ({ types, getTaxonomyNode, children }: PropsWithChildren<NERTagBaseProps>) => {
  const getTypesText = () => {
    const nMoreTypes = types.length - 1;
    if (nMoreTypes === 0) {
      return types[0];
    }
    return `${types[0]} +${nMoreTypes}`
  }

  const node = useMemo(() => getTaxonomyNode(types[0]), [types]);

  return (
    <Tag color={node.color}>
      {children}
      <TagLabel color={node.color}>{getTypesText()}</TagLabel>
    </Tag>
  )
};

export default NERTagBase;