import useMediaQuery from "@/hooks/use-media-query";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { selectDocumentLeftSidebarOpen, useDocumentDispatch, useSelector } from "../../DocumentProvider/selectors";
import ActionSidebar from "./ActionSidebar";
import ActionSidebarContent from "./ActionSidebarContent";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  // position: 'fixed',
  // top: '48px',
  // left: 0,
  // bottom: 0,
  background: '#FFF',
  // zIndex: 100
})


const LeftSidebar = () => {
  const open = useSelector(selectDocumentLeftSidebarOpen);
  const dispatch = useDocumentDispatch();
  const matches = useMediaQuery('(max-width: 1250px)');

  useEffect(() => {
    dispatch({
      type: 'setUI',
      payload: {
        leftActionBarOpen: !matches
      }
    })
  }, [matches])

  return (
    <Container>
      <ActionSidebar />
      {open && <ActionSidebarContent />}
    </Container>
  )
}

export default LeftSidebar;
