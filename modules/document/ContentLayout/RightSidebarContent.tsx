import styled from "@emotion/styled"
import { AnnotationDetails } from "../SidebarAnnotationDetails";
import { useDocumentCurrentEntity } from "../DocumentProvider/selectors";

const Container = styled.div({
  position: 'fixed',
  top: '48px',
  right: '0',
  bottom: '0px',
  display: 'flex',
  flexDirection: 'column',
  width: '320px',
  borderLeft: '1px solid #F3F3F5',
  background: '#FFF',
});

const SidebarContent = () => {
  const annotation = useDocumentCurrentEntity();

  return (
    <Container id="right-sidebar">
      {annotation && <AnnotationDetails annotation={annotation} />}
    </Container>
  )
}

export default SidebarContent;