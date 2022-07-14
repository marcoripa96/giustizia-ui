import styled from "@emotion/styled";
import { useSelector, selectCurrentEntity, useDocumentDispatch } from "../DocumentProvider/selectors";
import AnnotationDetailsContent from "./SidebarAnnotationDetailsContent";
import { CSSTransition } from 'react-transition-group';
import { Portal } from "@/components/Portal";
import { MouseEvent, useRef } from "react";
import { FiChevronRight } from '@react-icons/all-files/fi/FiChevronRight';
import { FiChevronLeft } from '@react-icons/all-files/fi/FiChevronLeft';
import { useDocumentEventListener } from "@/hooks";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  position: 'fixed',
  right: 0,
  top: 0,
  height: '100%',
  zIndex: 101
})

const SidebarContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '420px',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
  borderRadius: '4px',
  background: '#FFF'
})


const ActionsContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
  marginTop: 'auto',
  padding: '10px'
})

const ActionButton = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  outline: 'none',
  border: 'none',
  margin: 0,
  padding: '10px',
  borderRadius: '50%',
  background: 'rgba(0,0,0,0.6)',
  transition: 'transform 250ms ease-out',
  cursor: 'pointer',
  '& > svg': {
    color: 'rgba(255,255,255,1)',
  },
  '&:hover': {
    transform: 'scale(1.1)'
  },
  '&:active': {
    transform: 'scale(1)'
  },
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
  const nodeRef = useRef<any | null>(null);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    dispatch({
      type: 'setUI',
      payload: {
        selectedEntity: null
      }
    })
  }

  const selectNextEntity = () => {
    dispatch({
      type: 'nextCurrentEntity'
    })
  }

  const selectPreviousEntity = () => {
    dispatch({
      type: 'previousCurrentEntity'
    })
  }

  return (
    <Portal elementSelector="sidebar-portal">
      <CSSTransition
        ref={nodeRef}
        in={!!annotation}
        timeout={200}
        classNames="backdrop"
        unmountOnExit
      >
        <Backdrop onClick={handleBackdropClick} ref={nodeRef}>
          <Container>
            <ActionsContainer>
              <ActionButton onClick={selectPreviousEntity}>
                <FiChevronLeft />
              </ActionButton>
              <ActionButton onClick={selectNextEntity}>
                <FiChevronRight />
              </ActionButton>
            </ActionsContainer>
            <SidebarContainer>
              {annotation && <AnnotationDetailsContent annotation={annotation} />}
            </SidebarContainer>
          </Container>
        </Backdrop>
      </CSSTransition>
    </Portal>
  )
}

export default AnnotationDetails;