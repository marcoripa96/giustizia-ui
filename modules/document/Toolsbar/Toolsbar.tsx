import { SelectWithChecks } from "@/components";
import { BaseSelect, BaseSelectItem } from "@/components/BaseSelect";
import { EntityAnnotation } from "@/server/routers/document";
import styled from "@emotion/styled";
import { Checkbox, Switch } from "@nextui-org/react";
import { MouseEvent, useMemo, useState } from "react";
import { useSelector, selectDocumentTaxonomy, selectDocumentAnnotationSets, selectAllEntityAnnotationSets, selectActiveEntityAnnotations, selectDocumentActiveAnnotationSet, useDocumentDispatch } from "../DocumentProvider/selectors";
import { FlattenedTaxonomy } from "../DocumentProvider/types";
import TypeFilter from "./TypeFilter";

const Container = styled.div({
  position: 'sticky',
  top: '48px',
  display: 'flex',
  flexDirection: 'row',
  alignitems: 'center',
  padding: '5px',
  background: '#FFF',
  borderBottom: '1px solid #F3F3F5',
  zIndex: 10
})


const Toolsbar = () => {
  const activeAnnotationSet = useSelector(selectDocumentActiveAnnotationSet);
  const annotationSets = useSelector(selectAllEntityAnnotationSets);
  const dispatch = useDocumentDispatch();

  const handleChange = (event: MouseEvent, value: string | string[]) => {
    if (Array.isArray(value)) {
      return;
    }
    dispatch({
      type: 'changeAnnotationSet',
      payload: {
        annotationSet: value
      }
    })
  }

  return (
    <Container>
      <BaseSelect
        onChange={handleChange}
        value={activeAnnotationSet}
        backdrop
        inputProps={{
          'aria-label': 'select annotation set'
        }}>
        {annotationSets.map((item) => (
          <BaseSelectItem key={item.name} value={item.name} label={item.name}>
            {item.name}
          </BaseSelectItem>
        ))}
      </BaseSelect>
      <TypeFilter />
    </Container>
  )
};

export default Toolsbar;