import { annotationTypes } from "@/hooks/use-ner";
import styled from "@emotion/styled";
import { CSS } from "@nextui-org/react";
import { darken } from "polished";

type TagProps = {
  type: string;
  css?: CSS
}

const getAnnotationColor = (type: string) => {
  return annotationTypes[type] ? annotationTypes[type].color : '#F4F4F4';
}

const Container = styled.span<{ type: string }>(({ type }) => ({
  padding: '2px 5px',
  borderRadius: '6px',
  background: getAnnotationColor(type),
  transition: 'background 250ms ease-out',
  cursor: 'pointer',
  '&:hover': {
    background: darken(0.15, getAnnotationColor(type)),
  },
  fontSize: '10px',
  fontWeight: 700,
  textTransform: 'uppercase'
}));

const Tag = ({ type, ...props }: TagProps) => {
  const label = annotationTypes[type] ? annotationTypes[type].label : 'Unknown';

  return (
    <Container type={type} {...props}>
      {label}
    </Container>
  )
}

export default Tag;