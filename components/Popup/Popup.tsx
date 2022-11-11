import styled from "@emotion/styled";
import { PropsWithChildren } from "react";
import { Portal } from "../Portal";

type PopupProps = PropsWithChildren<{
  position: PopupPosition
}>;

type PopupPosition = {
  x: number,
  y: number
}

const Container = styled.div<PopupPosition>(({ x, y }) => ({
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '6px',
  left: x,
  top: y,
  background: '#FFF',
  boxShadow: 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px'
}));

const Popup = ({ position, children }: PopupProps) => {
  return (
    <Portal elementSelector="popup-portal">
      <Container {...position}>
        {children}
      </Container>
    </Portal>
  )
};

export default Popup;