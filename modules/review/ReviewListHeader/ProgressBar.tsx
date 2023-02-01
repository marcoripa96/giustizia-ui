import { useParam } from "@/hooks";
import useTrackTime from "@/hooks/use-track-time";
import { getTimeFromSeconds } from "@/utils/time";
import styled from "@emotion/styled";
import { Text } from "@nextui-org/react";
import { FaRegClock } from '@react-icons/all-files/fa/FaRegClock';
import { useEffect, useMemo, useRef } from "react";
import { useSelector, selectProgress, selectCurrentAnnotation, useReviewDispatch } from "../ReviewProvider/selectors";

const ProgressBarContainer = styled.div({
  width: '100%',
  height: '4px',
  background: 'rgba(0,0,0,0.1)',
  borderRadius: '30px',
  overflow: 'hidden'
});

const Tracker = styled.div({
  width: '100%',
  height: '100%',
  background: '#02A53E',
  transition: 'transform 250ms ease-in-out'
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

const ContainerTimeAndStatus = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '5px'
})

const CircleSeparator = styled.div({
  width: '5px',
  height: '5px',
  background: 'rgba(0,0,0,0.2)',
  borderRadius: '50%'
})

const Timer = () => {
  const ann = useSelector(selectCurrentAnnotation);
  const cursor = useSelector((state) => state.ui.currentItemCursor);
  const dispatch = useReviewDispatch();
  const docId = useSelector((state) => state.docId);

  const { elapsedTime } = useTrackTime({
    seconds: ann && ann.features.review_time || 0,
    isRunning: false,
    resetWhenChanges: [cursor, docId]
  });

  const prevCursor = useRef<number>(0);

  useEffect(() => {
    if (prevCursor.current != null) {
      dispatch({
        type: 'updateTime',
        payload: {
          time: elapsedTime,
          cursor: prevCursor.current
        }
      });
      prevCursor.current = cursor;
    }
  }, [cursor]);

  return (
    <Text css={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', fontWeight: 600, color: 'rgba(0,0,0,0.5)' }}>
      {getTimeFromSeconds(elapsedTime)} <FaRegClock />
    </Text>
  )
}


const ProgressBar = () => {
  const { completion, cursor, total } = useSelector(selectProgress);
  const trackValue = -100 + completion;

  return (
    <ProgressContainer>
      <Row>
        <Text css={{ fontSize: '16px', fontWeight: 500 }}>{`${completion.toFixed(0)}% complete`}</Text>
        <ContainerTimeAndStatus>
          <Timer />
          <CircleSeparator />
          <Text css={{ fontSize: '14px', fontWeight: 600, color: 'rgba(0,0,0,0.5)' }}>
            {`${cursor + 1}/${total}`}
          </Text>
        </ContainerTimeAndStatus>
      </Row>
      <ProgressBarContainer>
        <Tracker style={{ transform: `translateX(${trackValue}%)` }} />
      </ProgressBarContainer>
    </ProgressContainer>
  )
};

export default ProgressBar;