import { ComponentType, FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { darken } from "polished";
import { ActionKey, mainActions } from "./actions";
import { useEventListener } from "@/hooks";
import { Menu, MenuItem } from "./Menu";
import { EntityType } from "../DocumentViewer/types";
import { MENTION_TYPES } from "../DocumentViewer/MentionTag/mention-tag-colors";
import { FaCheck } from '@react-icons/all-files/fa/FaCheck';

const Container = styled.div`
  position: fixed;
  top: 2px;
  left: 2px;
  right: 2px;
`

const TopMenu = styled.div`
  display: grid;
  grid-template-columns: auto max-content auto;
  grid-gap: 4px;
  align-items: flex-start;
`

const MainActionsWrapper = styled.div``

const MainActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
  border-radius: 4px;
  padding: 2px;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 1%), 1px 1px 5px rgb(0 0 0 / 15%);
  background: hsla(0,0%,100%,0.96);
`

const IconButton = styled.button<{ selected: boolean }>`
  position: relative;
  border: none;
  outline: none;
  padding: 12px;
  border-radius: 4px;
  color: #000;
  > svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: #e2e2e2;
  }

  ${({ selected }) => selected && `
    background: #1778F2;
    color: #FFF;
    > svg {
      fill: #FFF;
    }

    &:hover {
      background: ${darken(0.05, '#1778F2')};
    }
  `}
`
const ShortcutLabel = styled.span`
  position: absolute;
  top: 60%;
  left: 65%;
  z-index: 1;
  color: inherit;
  font-size: 10px;
`

const MenuPortal = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  display: flex;
  width: 100%;
  justify-content: center;
`

const AddActionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
`
const AddActionItemContainer = styled.button<{ selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 6px;
  padding: 10px;
  outline: none;
  border: none;
  background: #FFF;
  text-align: start;
  cursor: pointer;
  ${({ selected }) => selected && { background: 'rgb(244, 242, 244)' }}
  &:hover {
    background: rgb(244, 242, 244);
  }
`
const MentionTagColorBox = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: ${({ color }) => color};
  border-radius: 6px;
  > svg {
    fill: rgb(244, 242, 244);
  }
`
const MentionDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const MentionTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
`
const MentionSubtitle = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: rgb(111, 110, 119);
  margin: 0;
`

const AddActionItem = (
  { selected, color, type, label, onClick }:
    {
      selected: boolean, color: string,
      type: EntityType, label: string,
      onClick: () => void;
    }
) => {
  return (
    <AddActionItemContainer onClick={onClick} selected={selected}>
      <MentionTagColorBox color={color}>
        {selected ? <FaCheck /> : null}
      </MentionTagColorBox>
      <MentionDescriptionContainer>
        <MentionTitle>{type}</MentionTitle>
        <MentionSubtitle>{label}</MentionSubtitle>
      </MentionDescriptionContainer>
    </AddActionItemContainer>
  )
}

const setInitialState = () => {
  const types = Object.keys(MENTION_TYPES);
  return [true, ...new Array(types.length - 1).fill(false)];
}

const AddActionMenu = ({ onAnnotationTypeChange }: { onAnnotationTypeChange: (type: EntityType) => void }) => {
  const [state, setState] = useState<boolean[]>(setInitialState);

  const types = Object.keys(MENTION_TYPES);

  const onSelect = (i: number) => {
    setState((s) => s.map((_, index) => index === i ? true : false));
    onAnnotationTypeChange(types[i] as EntityType);
  }

  return (
    <AddActionContainer>
      {types.map((type, index) => (
        <AddActionItem
          key={type}
          type={type as EntityType}
          selected={state[index]}
          onClick={() => onSelect(index)}
          {...MENTION_TYPES[type as EntityType]} />
      ))}
    </AddActionContainer>
  )
}

const ACTIONS_DISTANCE = 42;

type MainActionsProps = {
  onSelect: (id: ActionKey, payload: any) => void;
}

const MainActions: FC<MainActionsProps> = ({ onSelect: onSelectProp }) => {
  // keep state of the current selected action index
  const [actionIndex, setActionIndex] = useState<number>(0);
  // hovered actionIndex
  const [hoveredActionIndex, setHoveredActionIndex] = useState<number | null>(null);

  const actionContainerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const setAction = (i: number) => {
    setActionIndex(i);
    const payload = mainActions[i].id === 'add' ? { type: Object.keys(MENTION_TYPES)[0] } : {};

    onSelectProp(mainActions[i].id, payload);
  }

  const onAnnotationTypeChange = (type: EntityType) => {
    onSelectProp('add', { type });
  }

  // change action
  const onActionClick = (i: number) => {
    setAction(i);
  }

  // select an action with keydown
  const cb = useCallback((event: KeyboardEvent) => {
    const i = mainActions.findIndex((action) => action.shortcut === event.key);
    if (i === -1) {
      return;
    }
    setAction(i);
  }, []);
  // listen for keydown event
  useEventListener('keydown', cb);

  const onMouseEnterAction = (i: number) => {
    setHoveredActionIndex(i);
  }


  const onMouseLeaveMenu = () => {
    setHoveredActionIndex(null);
  }

  const offset = (hoveredActionIndex === null ? 0 : hoveredActionIndex) * ACTIONS_DISTANCE;

  return (
    <MainActionsWrapper>
      <MainActionsContainer ref={actionContainerRef} onMouseLeave={onMouseLeaveMenu}>
        {mainActions.map(({ id, shortcut, Icon }, i) => (
          <IconButton
            key={id}
            selected={i === actionIndex}
            onMouseEnter={() => onMouseEnterAction(i)}
            onClick={() => onActionClick(i)}>
            {<Icon />}
            <ShortcutLabel>{shortcut}</ShortcutLabel>
          </IconButton>
        ))}
        <MenuPortal>
          <Menu ref={menuRef} activeIndex={hoveredActionIndex} offset={offset} onClose={onMouseLeaveMenu}>
            <MenuItem title="Select" description="Text selection" />
            <MenuItem title="Add annotation" description="Add a new annotaiton by selecting a span of text">
              <AddActionMenu onAnnotationTypeChange={onAnnotationTypeChange} />
            </MenuItem>
            <MenuItem title="Delete annotation" description="Click on an annotation to delete it" />
          </Menu>
        </MenuPortal>
      </MainActionsContainer>
    </MainActionsWrapper>
  )
}

type ToolbarProps = {
  onSelect: (id: ActionKey, payload: any) => void;
}

const Toolbar: FC<ToolbarProps> = ({ onSelect }) => {
  return (
    <Container>
      <TopMenu>
        {/* Menu top left */}
        <div />
        {/* Menu center */}
        <MainActions onSelect={onSelect} />
        {/* Menu top left */}
        <div />
      </TopMenu>
    </Container>
  )
};

export default Toolbar;