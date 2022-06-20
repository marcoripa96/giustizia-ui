import { FlattenedTaxonomy, Taxonomy } from "@/modules/document/DocumentProvider/types";
import { getAnnotationTypes } from "@/modules/document/DocumentProvider/utils";
import { EntityAnnotation } from "@/server/routers/document";
import styled from "@emotion/styled";
import { Checkbox } from "@nextui-org/react";
import { useMemo, useState } from "react";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
  padding: '5px',
  overflowX: 'auto',
  '::-webkit-scrollbar': {
    height: '0px',
    width: '0px'
  },
})

const FilterButton = styled.button({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
  flexShrink: 0,
  border: 'none',
  outline: 'none',
  background: '#FFF',
  borderRadius: '16px',
  fontSize: '13px',
  padding: '3px 10px',
  color: 'rgb(0 0 0 / 50%)',
  boxShadow: '0 0 0 1px rgb(0 0 0 / 10%)',
  fontWeight: 600,
  cursor: 'pointer',
  '&:hover': {
    background: 'rgba(0,0,0,0.05)',
  }
  // ...(selected && {
  //   background: 'rgba(0, 112, 243, 0.05)',
  //   color: 'rgb(0, 112, 243)',
  //   boxShadow: '0 0 0 1px #0070F3',
  // })
});

type AnnotationTypeListProps = {
  annotations: EntityAnnotation[],
  taxonomy: FlattenedTaxonomy,
  value: string[];
  onChange: (types: string[]) => void;
}

type Item = {
  key: string,
  label: string,
  n: number;
}

const AnnotationTypeFilter = ({ taxonomy, annotations, value, onChange }: AnnotationTypeListProps) => {
  const items = useMemo(() => {
    return getAnnotationTypes(taxonomy, annotations);
  }, [taxonomy, annotations]);

  const total = useMemo(() => {
    return items.reduce((acc, item) => acc + item.n, 0);
  }, [items]);

  const handleAllClick = () => {
    let newValue: string[] = [];
    if (value.length !== items.length) {
      newValue = items.map((item) => item.key);
    }

    onChange(newValue);
  }

  const handleItemClick = (key: string) => {
    let newValue = Array.isArray(value) ? value.slice() : [];
    const itemIndex = value.indexOf(key);

    if (itemIndex === -1) {
      newValue.push(key);
    } else {
      newValue.splice(itemIndex, 1);
    }
    onChange(newValue);
  }

  const isAllSelected = value.length === items.length;
  const isAllIndeterminate = value.length < items.length && value.length > 0;

  return (
    <Container>
      <FilterButton
        onClick={handleAllClick}>
        <Checkbox aria-label="select all" isSelected={isAllSelected} isIndeterminate={isAllIndeterminate} />
        All - {total}
      </FilterButton>
      {items.map((item) => (
        <FilterButton
          key={item.key}
          onClick={() => handleItemClick(item.key)}>
          <Checkbox aria-label="item" size="sm" isSelected={value.indexOf(item.key) !== -1} />
          {item.label} - {item.n}
        </FilterButton>
      ))}
    </Container>
  )
};

export default AnnotationTypeFilter;