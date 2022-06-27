import styled from "@emotion/styled";
import { useSelector, selectCurrentEntity, useDocumentDispatch } from "../DocumentProvider/selectors";
import AnnotationDetailsContent from "./SidebarAnnotationDetailsContent";
import { CSSTransition } from 'react-transition-group';
import { Portal } from "@/components/Portal";
import { MouseEvent } from "react";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '420px',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
  borderRadius: '4px',
  background: '#FFF',
  marginLeft: 'auto',
  zIndex: 101
})

const Backdrop = styled.div({
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.1)',
  zIndex: 1000,
  '&.backdrop-enter': {
    opacity: 0
  },
  '&.backdrop-enter-active': {
    opacity: 1,
    transition: 'opacity 0.2s cubic-bezier(0.4,0,0.2,1)'
  },
  '&.backdrop-exit': {
    opacity: 1
  },
  '&.backdrop-exit-active': {
    opacity: 0,
    transition: 'opacity 0.2s cubic-bezier(0.4,0,0.2,1)'
  }
})

const AnnotationDetails = () => {
  const annotation = useSelector(selectCurrentEntity);
  const dispatch = useDocumentDispatch();

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    dispatch({
      type: 'setUI',
      payload: {
        selectedEntityId: null
      }
    })
  }

  return (
    <Portal elementSelector="sidebar-portal">
      <CSSTransition
        in={!!annotation}
        timeout={200}
        classNames="backdrop"
        unmountOnExit
      >
        <Backdrop onClick={handleBackdropClick}>
          <Container id="annotation-details-sidebar">
            {annotation && <AnnotationDetailsContent annotation={annotation} />}
          </Container>
        </Backdrop>
      </CSSTransition>
    </Portal>
  )
}

export default AnnotationDetails;