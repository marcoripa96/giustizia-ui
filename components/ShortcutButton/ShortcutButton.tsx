import styled from "@emotion/styled";
import { HTMLAttributes } from "react";

type ShortcutButtonProps = HTMLAttributes<HTMLButtonElement> & {
  shortcut: string | string[];
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '3px'
})

const StyledButton = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '20px',
  height: '20px',
  borderRadius: '4px',
  padding: '3px 5px',
  background: 'rgba(0,0,0,0.1)',
  color: 'rgba(0,0,0,0.7)',
  fontSize: '12px',
  fontWeight: 600,
  opacity: '0.7'
});


const ShortcutButton = ({ shortcut }: ShortcutButtonProps) => {
  const btns = Array.isArray(shortcut) ? shortcut.map((btn) => (
    <StyledButton key={btn}>{btn}</StyledButton>
  )) : <StyledButton>{shortcut}</StyledButton>

  return (
    <Container>
      {btns}
    </Container>
  )
};

export default ShortcutButton;