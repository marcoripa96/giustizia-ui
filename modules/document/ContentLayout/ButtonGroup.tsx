import { IconButton } from "@/components";
import styled from "@emotion/styled";
import { Tooltip } from "@nextui-org/react";
import { MouseEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { FiNavigation } from '@react-icons/all-files/fi/FiNavigation';
import { FiPlus } from '@react-icons/all-files/fi/FiPlus';
import { FiTrash2 } from '@react-icons/all-files/fi/FiTrash2';
import { FiFilter } from '@react-icons/all-files/fi/FiFilter';
import { useDocumentAction, useDocumentDispatch } from "../DocumentProvider/selectors";
import { UIAction } from "../DocumentProvider/types";


const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px'
});

type ActionItem = {
  Icon: ReactNode;
  action: UIAction;
  label: string;
  active?: boolean;
}

const actionItems: ActionItem[] = [
  { Icon: <FiNavigation />, action: 'select', label: 'Select', },
  { Icon: <FiPlus />, action: 'add', label: 'Add annotation' },
  { Icon: <FiTrash2 />, action: 'delete', label: 'Delete annotation' },
  { Icon: <FiFilter />, action: 'filter', label: 'Filter annotation' }
]

const ButtonGroup = () => {
  const action = useDocumentAction();
  const dispatch = useDocumentDispatch();
  const [tooltipOpen, setTooltipOpen] = useState<number | null>(null);

  const items = useMemo(() => {
    return actionItems.map((item) =>
      (item.action === action.value ? { ...item, active: true } : item)
    );
  }, [action])

  // useEffect(() => {
  //   const onScroll = () => {
  //     // if (!tooltipOpen) return;
  //     setTooltipOpen(null);
  //   }
  //   window.addEventListener('scroll', onScroll);
  //   return () => {
  //     window.removeEventListener('scroll', onScroll);
  //   }
  // }, []);

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    dispatch({
      type: 'changeAction',
      payload: {
        action: {
          value: items[index].action
        }
      }
    })
    // close tooltip on click so that we can show a menu if there is
    setTooltipOpen(null);
  }

  return (
    <Container>
      {items.map((a, index) => (
        <Tooltip key={index} content={a.label} placement="right" color="primary" visible={tooltipOpen === index}>
          <IconButton
            onMouseEnter={() => setTooltipOpen(index)}
            onMouseLeave={() => setTooltipOpen(null)}
            onClick={(e) => handleButtonClick(e, index)}
            active={a.active}>
            {a.Icon}
          </IconButton>
        </Tooltip>
      ))}
    </Container>
  )
};

export default ButtonGroup;