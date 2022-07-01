import { IconButton } from "@/components";
import styled from "@emotion/styled";
import { FiGitPullRequest } from '@react-icons/all-files/fi/FiGitPullRequest';
import { selectViews, useDocumentDispatch, useSelector } from "../DocumentProvider/selectors";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
})

const FixedItems = () => {
  const views = useSelector(selectViews);
  const dispatch = useDocumentDispatch();

  const toggleCompareView = () => {
    if (views.length === 1) {
      dispatch({
        type: 'addView'
      })
    } else {
      dispatch({
        type: 'removeView'
      })
    }
  }

  return (
    <Container>
      <IconButton onClick={toggleCompareView}>
        <FiGitPullRequest />
      </IconButton>
    </Container>
  )
};

export default FixedItems;