import { IconButton, useText } from "@/components";
import styled from "@emotion/styled";
import { Tooltip } from "@nextui-org/react";
import { MouseEvent, ReactNode, useMemo, useState } from "react";
import { FiNavigation } from '@react-icons/all-files/fi/FiNavigation';
import { FiPlus } from '@react-icons/all-files/fi/FiPlus';
import { FiTrash2 } from '@react-icons/all-files/fi/FiTrash2';
import { FiSettings } from '@react-icons/all-files/fi/FiSettings';
import { FiServer } from '@react-icons/all-files/fi/FiServer';
import { selectDocumentAction, useDocumentDispatch, useSelector } from "../../DocumentProvider/selectors";
import { UIAction } from "../../DocumentProvider/types";
import { Leaves } from "@/components/TranslationProvider/types";
import { Translation } from "@/translation/type";




const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  '& > div:last-of-type': {
    marginTop: 'auto'
  }
});

const GroupContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  padding: '16px 12px',
  // height: '100%',
  '&:not(last-of-type)': {
    borderBottom: '1px solid #F3F3F5'
  }
})

type ActionGroups = ActionItem[]

type ActionItem = {
  Icon: ReactNode;
  action: UIAction;
  label: Leaves<Translation['document']>;
  active?: boolean;
}

const actionGroups: ActionGroups[] = [
  [
    { Icon: <FiNavigation />, action: 'select', label: 'leftSidebar.actionsTooltips.select', },
    { Icon: <FiPlus />, action: 'add', label: 'leftSidebar.actionsTooltips.add' },
    { Icon: <FiTrash2 />, action: 'delete', label: 'leftSidebar.actionsTooltips.delete' },
  ],
  [
    { Icon: <FiServer />, action: 'clusters', label: 'leftSidebar.actionsTooltips.clusters' }
  ],
  [
    { Icon: <FiSettings />, action: 'settings', label: 'leftSidebar.actionsTooltips.settings' }
  ]
]

const ButtonGroup = () => {
  const t = useText('document');
  const action = useSelector(selectDocumentAction);
  const dispatch = useDocumentDispatch();
  const [tooltipOpen, setTooltipOpen] = useState<string | null>(null);;

  const groups = useMemo(() => {
    return actionGroups.map((group) => {
      return group.map((item) => (item.action === action.value ? { ...item, active: true } : item))
    })
  }, [action])

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>, group: number, item: number) => {
    dispatch({
      type: 'changeAction',
      payload: {
        action: groups[group][item].action
      }
    })

    // close tooltip on click so that we can show a menu if there is
    setTooltipOpen(null);
  }

  const handleToolTipOpen = (group: number, item: number) => {
    setTooltipOpen(`${group}.${item}`);
  }

  return (
    <Container>
      {groups.map((group, i) => (
        <GroupContainer key={i}>
          {group.map((item, j) => (
            <Tooltip key={j} content={t(item.label)} placement="right" color="invert" visible={tooltipOpen === `${i}.${j}`}>
              <IconButton
                onMouseEnter={() => handleToolTipOpen(i, j)}
                onMouseLeave={() => setTooltipOpen(null)}
                onClick={(e) => handleButtonClick(e, i, j)}
                active={item.active}>
                {item.Icon}
              </IconButton>
            </Tooltip>
          ))}
        </GroupContainer>
      ))}
    </Container>
  )
};

export default ButtonGroup;