import { ComponentType, FC, useEffect, useState } from "react";
import styled from "styled-components";
import { darken } from "polished";
import { ActionKey, mainActions } from "./actions";

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
  border: none;
  outline: none;
  padding: 12px;
  border-radius: 4px;
  > svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: #e2e2e2;
  }

  ${({ selected }) => selected && `
    background: #1778F2;
    > svg {
      fill: #FFF;
    }

    &:hover {
      background: ${darken(0.05, '#1778F2')};
    }
  `}
`

type MainActionsProps = {
  onSelect: (id: ActionKey) => void;
}

const MainActions: FC<MainActionsProps> = ({ onSelect: onSelectProp }) => {
  // keep state of the current action
  const [selected, setSelected] = useState<ActionKey>('select');

  // change action
  const onSelect = (id: ActionKey) => {
    setSelected(id);
    onSelectProp(id);
  }

  return (
    <MainActionsContainer>
      {mainActions.map(({ id, Icon }) => (
        <IconButton key={id} selected={id === selected} onClick={() => onSelect(id)}>{<Icon />}</IconButton>
      ))}
    </MainActionsContainer>
  )
}

type ToolbarProps = {
  onSelect: (id: ActionKey) => void;
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