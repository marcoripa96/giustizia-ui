import { SectionsList } from "@/components";
import styled from "@emotion/styled"
import { Text } from "@nextui-org/react";
import { selectCurrentEntity, useSelector } from "../DocumentProvider/selectors";
// import { useDocumentCurrentEntity } from "../DocumentProvider/selectors";

const Container = styled.div({
  position: 'fixed',
  top: '48px',
  right: '0',
  bottom: '0px',
  display: 'flex',
  flexDirection: 'column',
  width: '320px',
  padding: '20px',
  // borderLeft: '1px solid #F3F3F5',
  // background: '#FFF',
  zIndex: 100
});

const sections = [
  { id: 'preambolo', label: 'Preambolo' },
  { id: 'fatto_e_diritto', label: 'Fatto e diritto' },
  { id: 'conclusioni', label: 'Conclusioni' },
  { id: 'dispositivo', label: 'Dispositivo' },
  { id: 'firma_e_data', label: 'Firma e data' }
]

const RightSidebarContent = () => {
  return (
    <Container id="right-sidebar">
      <Text css={{ fontWeight: 500, marginBottom: '15px' }} size={16}>Document sections</Text>
      <SectionsList sections={sections} activeSection="preambolo" />
      {/* {annotation && <AnnotationDetails annotation={annotation} />} */}
    </Container>
  )
}

export default RightSidebarContent;