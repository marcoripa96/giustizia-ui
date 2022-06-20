import styled from "@emotion/styled";
import { HTMLAttributes } from "react";

export type BaseSelectItemProps = HTMLAttributes<HTMLButtonElement> & {
  value: string;
  label: string;
  selected?: boolean;
}

const BaseSelectItem = styled.button<BaseSelectItemProps>(({ selected }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
  outline: 'none',
  border: 'none',
  background: 'transparent',
  textAlign: 'start',
  padding: '10px 18px',
  cursor: 'pointer',
  '&:hover': {
    background: 'rgba(0,0,0,0.03)'
  },
  '&:active': {
    background: 'rgba(0,0,0,0.08)'
  },
  ...(selected && {
    opacity: 0.5,
    pointerEvents: 'none'
  })
}));

export default BaseSelectItem;