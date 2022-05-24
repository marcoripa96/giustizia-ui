import { FlattenedTaxonomy, Taxonomy } from "@/modules/document/DocumentProvider/types";
import { NERAnnotation } from "@/server/routers/document";
import styled from "@emotion/styled";
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

const FilterButton = styled.button<{ selected: boolean }>(({ selected }) => ({
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
  ...(!selected && {
    '&:hover': {
      background: 'rgba(0,0,0,0.05)',
    }
  }),
  ...(selected && {
    background: '#bfd8fc',
    color: '#0070F3',
    boxShadow: '0 0 0 1px #0070F3',
  })
}));

type AnnotationTypeListProps = {
  taxonomy: FlattenedTaxonomy,
  annotations: NERAnnotation[],
  value: string;
  onChange: (key: string) => void;
}

const getAnnotationTypes = (taxonomy: FlattenedTaxonomy, annotations: NERAnnotation[]) => {
  const items = annotations.reduce((acc, ann) => {
    if (!acc[ann.ner_type]) {
      acc[ann.ner_type] = 1;
    } else {
      acc[ann.ner_type] = acc[ann.ner_type] + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  return Object.keys(items).map((key) => ({
    key,
    label: taxonomy[key].label,
    n: items[key as keyof typeof items]
  }))
}

const AnnotationTypeFilter = ({ value, taxonomy, annotations, onChange }: AnnotationTypeListProps) => {
  const items = useMemo(() => {
    return getAnnotationTypes(taxonomy, annotations).sort((a, b) => b.n - a.n);
  }, [annotations]);

  const total = useMemo(() => {
    return items.reduce((acc, item) => acc + item.n, 0);
  }, [items]);

  return (
    <Container>
      <FilterButton
        selected={value === 'all'}
        onClick={() => onChange('all')}>
        All - {total}
      </FilterButton>
      {items.map((item) => (
        <FilterButton
          key={item.key}
          selected={value === item.key}
          onClick={() => onChange(item.key)}>
          {item.label} - {item.n}
        </FilterButton>
      ))}
    </Container>
  )
};

export default AnnotationTypeFilter;