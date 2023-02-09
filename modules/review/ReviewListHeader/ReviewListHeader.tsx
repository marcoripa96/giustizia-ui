import { getTimeFromSeconds } from "@/utils/time";
import styled from "@emotion/styled";
import { Text } from "@nextui-org/react";
import { selectAvgTime, selectIsDocDone, selectProgress, useSelector } from "../ReviewProvider/selectors";
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
  justifyContent: 'space-between',
  gap: '10px'
})

const DoneTag = styled.div({
  borderRadius: '6px',
  padding: '0px 2px',
  border: '2px solid rgba(55, 143, 103, 0.8)',
  background: 'rgba(93, 211, 158, 0.3)',
  fontSize: '10px',
  fontWeight: 600
})
const TitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
  minWidth: 0
})

type ReviewListHeaderProps = {
  handleOverwriteDocument: () => void;
}

const ReviewListHeader = ({ handleOverwriteDocument }: ReviewListHeaderProps) => {
  const document = useSelector((state) => state.currentDocument);
  const avgReviewTime = useSelector(selectAvgTime);
  const isDone = useSelector(selectIsDocDone);

  return (
    <Container>
      <SourceHeader handleOverwriteDocument={handleOverwriteDocument} />
      <Row>
        <TitleContainer>
          <Text css={{ fontSize: '24px', fontWeight: 600, letterSpacing: '-2px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
            {document && document.name}
          </Text>
          {isDone && <DoneTag>DONE</DoneTag>}
        </TitleContainer>

        <Text css={{ fontSize: '14px', fontWeight: 600, color: 'rgba(0,0,0,0.5)', whiteSpace: 'nowrap' }}>
          Avg. review time: {getTimeFromSeconds(avgReviewTime)}
        </Text>
      </Row>

      <ProgressBar />
    </Container>
  )
};

export default ReviewListHeader;