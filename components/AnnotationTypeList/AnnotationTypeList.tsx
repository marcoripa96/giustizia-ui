import styled from "@emotion/styled";
import { useMemo, useState } from "react";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '10px'
})

const FilterButton = styled.button({
  border: 'none',
  outline: 'none',
  background: '#FFF',
  borderRadius: '16px',
  fontSize: '15px',
  padding: '5px 12px',
  color: 'rgb(0 0 0 / 50%)',
  boxShadow: '0 0 0 1px rgb(0 0 0 / 10%)'
})

type Item = {
  label: string;
  n: number
}

type AnnotationTypeListProps = {
  items: Item[]
}

const AnnotationTypeList = ({ items }: AnnotationTypeListProps) => {
  const total = useMemo(() => {
    return items.reduce((acc, item) => acc + item.n, 0);
  }, [items]);

  return (
    <Container>
      <FilterButton>All - {total}</FilterButton>
      {items.map((item) => (
        <FilterButton key={item.label}>
          {item.label} - {item.n}
        </FilterButton>
      ))}
    </Container>
  )
};

export default AnnotationTypeList;