import { ChildNodeWithColor } from "@/components/Tree";
import styled from "@emotion/styled";
import { CSS } from "@nextui-org/react";
import { darken } from "polished";

type TagProps = {
  node: ChildNodeWithColor;
  css?: CSS
}

const getAnnotationColor = (node: ChildNodeWithColor) => {
  return node.color;
}

const Container = styled.span<{ node: ChildNodeWithColor; }>(({ node }) => ({
  padding: '2px 5px',
  borderRadius: '6px',
  background: getAnnotationColor(node),
  transition: 'background 250ms ease-out',
  // color: darken(0.70, node.color),
  fontSize: '10px',
  fontWeight: 700,
  textTransform: 'uppercase'
}));

const Tag = ({ node, ...props }: TagProps) => {
  const label = node.label

  return (
    <Container node={node} {...props}>
      {label}
    </Container>
  )
}

export default Tag;