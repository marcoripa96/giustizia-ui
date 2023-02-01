import { getTimeFromSeconds } from "@/utils/time";
import styled from "@emotion/styled";
import { Text } from "@nextui-org/react";
import { selectAvgTime, selectProgress, useSelector } from "../ReviewProvider/selectors";
import ProgressBar from "./ProgressBar";
import SourceHeader from "./SourceHeader";

const Container = styled.div({
  position: 'sticky',
  top: 0,
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 0px',
  borderBottom: '1px solid rgba(0,0,0,0.1)',
  // justifyContent: 'space-between',
  // alignItems: 'center'
})

const ProgressContainer = styled.div({
  display: 'flex',
  flexDirection: 'column'
})
const Row = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
})

const ReviewListHeader = () => {
  const document = useSelector((state) => state.currentDocument);
  const avgReviewTime = useSelector(selectAvgTime);

  return (
    <Container>
      <SourceHeader />
      <Row>
        <Text css={{ fontSize: '24px', fontWeight: 600, letterSpacing: '-2px' }}>
          {document && document.name}
        </Text>
        <Text css={{ fontSize: '14px', fontWeight: 600, color: 'rgba(0,0,0,0.5)' }}>
          Avg. review time: {getTimeFromSeconds(avgReviewTime)}
        </Text>
      </Row>

      <ProgressBar />
    </Container>
  )
};

export default ReviewListHeader;