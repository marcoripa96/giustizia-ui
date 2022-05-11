
import CardButton from "./CardButton";
import { FaPlus } from '@react-icons/all-files/fa/FaPlus'
import { FaFileAlt } from '@react-icons/all-files/fa/FaFileAlt'
import styled from "@emotion/styled";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row'
})


const ActionBar = () => {
  return (
    <Container>
      <CardButton
        title="Add document"
        description="Upload a new document to annotate"
        contentLeft={<FaFileAlt color="#0D99FF" />}
        contentRight={<FaPlus />} />
    </Container>
  )
}

export default ActionBar;