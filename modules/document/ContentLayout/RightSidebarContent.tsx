import { SectionsList } from "@/components";
import styled from "@emotion/styled"
import { Text } from "@nextui-org/react";
import { selectCurrentEntity, selectSectionsSidebar, useDocumentDispatch, useSelector } from "../DocumentProvider/selectors";
// import { useDocumentCurrentEntity } from "../DocumentProvider/selectors";

const Container = styled.div({
  // position: 'fixed',
  // top: '90px',
  // right: '0',
  // bottom: '0px',
  position: 'sticky',
  top: 0,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  width: '320px',
  padding: '20px',
  marginLeft: 'auto'
  // borderLeft: '1px solid #F3F3F5',
  // background: '#FFF',
  // zIndex: 100
});


const RightSidebarContent = () => {
  const sections = useSelector(selectSectionsSidebar);
  // const activeSection = useSelector(selectDocumentActiveSection);
  const dispatch = useDocumentDispatch();

  const handleSectionChange = (sectionId: string) => {
    // dispatch({
    //   type: 'setUI',
    //   payload: {
    //     activeSection: sectionId
    //   }
    // })
  }

  return sections.length > 0 ? (
    <Container id="right-sidebar">
      <Text css={{ fontWeight: 500, marginBottom: '15px', textTransform: 'uppercase' }} size={16}>Document sections</Text>
      {/* <SectionsList sections={sections} activeSection={activeSection} onChange={handleSectionChange} /> */}
    </Container>
  ) : null
}

export default RightSidebarContent;