import styled from "@emotion/styled";
import { useSelector, selectCurrentEntity, useDocumentDispatch } from "../DocumentProvider/selectors";
import AnnotationDetailsContent from "./SidebarAnnotationDetailsContent";
import { CSSTransition } from 'react-transition-group';
import { useClickOutside } from "@/hooks";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  top: '110px',
  right: '0',
  bottom: '20px',
  width: '320px',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
  borderRadius: '4px',
  background: '#FFF',
  transform: 'translateX(-20px)',
  zIndex: 101,
  '&.alert-enter': {
    transform: 'translateX(100%)'
  },
  '&.alert-enter-active': {
    transform: 'translateX(-20px)',
    transition: 'transform 0.2s cubic-bezier(0.4,0,0.2,1)'
  },
  '&.alert-exit': {
    transform: 'translateX(-20px)'
  },
  '&.alert-exit-active': {
    transform: 'translateX(100%)',
    transition: 'transform 0.2s cubic-bezier(0.4,0,0.2,1)'
  }
})

const AnnotationDetails = () => {
  const annotation = useSelector(selectCurrentEntity);


  return (
    <CSSTransition
      in={!!annotation}
      timeout={200}
      classNames="alert"
      unmountOnExit
    >
      <Container id="annotation-details-sidebar">
        {annotation && <AnnotationDetailsContent annotation={annotation} />}
      </Container>
    </CSSTransition>
  )
}

export default AnnotationDetails;