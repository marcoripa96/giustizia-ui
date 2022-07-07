
import CardButton from "./CardButton";
import { FaPlus } from '@react-icons/all-files/fa/FaPlus'
import { FaFileAlt } from '@react-icons/all-files/fa/FaFileAlt'
import styled from "@emotion/styled";
import { useText } from "@/components";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row'
})


const ActionBar = () => {
  const t = useText('documents');

  return (
    <Container>
      <CardButton
        title={t('addCard.title')}
        description={t('addCard.subTitle')}
        contentLeft={<FaFileAlt color="#0D99FF" />}
        contentRight={<FaPlus />} />
    </Container>
  )
}

export default ActionBar;