import { useClickOutside } from "@/hooks";
import styled from "@emotion/styled";
import { Card, FormElement, Input, InputProps, Popover, Text } from "@nextui-org/react";
import { FiChevronDown } from "@react-icons/all-files/fi/FiChevronDown";
import { ChangeEvent, MouseEvent, PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Portal } from "../Portal";

export type Item = {
  label: string;
  value: string;
}

export type SelectProps = {
  items: Item[];
  value: string;
  onChange: (value: string) => void;
  inputProps?: Partial<InputProps>;
  // disabled?: boolean;
}

type Anchor = {
  top: number;
  left: number;
  width: number;
}

const Container = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column'
})

const ItemContainer = styled(Card)<{ anchor: Anchor }>(({ anchor }) => ({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '250px',
  overflowY: 'auto',
  paddingTop: '5px',
  paddingBottom: '5px',
  ...anchor,
  '> div': {
    padding: 0
  }
}));

const ListItem = styled.button({
  outline: 'none',
  border: 'none',
  background: 'transparent',
  textAlign: 'start',
  padding: '10px 18px',
  cursor: 'pointer',
  '&:hover': {
    background: 'rgba(0,0,0,0.03)'
  },
  '&:active': {
    background: 'rgba(0,0,0,0.08)'
  },
})

const Backdrop = styled.div({
  position: 'fixed',
  inset: 0,
  zIndex: 999999
});

const BackdropContent = styled.div({
  position: 'relative',
  width: '100%',
  height: '100%'
})


const SelectContent = ({ onClose, children }: PropsWithChildren<{ onClose: () => void }>) => {
  return (
    <Portal elementSelector="select-popup">
      <Backdrop onClick={onClose}>
        <BackdropContent>
          {children}
        </BackdropContent>
      </Backdrop>
    </Portal>
  )
}



const Select = ({ items, value, onChange, inputProps }: SelectProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [anchor, setAnchor] = useState<Anchor>();
  const inputRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: ChangeEvent<FormElement>) => {
    setInputValue(event.target.value);
  }

  useEffect(() => {
    const item = items.find((item) => item.value === value);
    if (!item) {
      setInputValue('')
    } else {
      setInputValue(item.label)
    }
  }, [items, value])

  const handleClick = () => {
    if (!inputRef.current) return;
    const bbox = inputRef.current.getBoundingClientRect();
    const anchorCoords = {
      top: bbox.top + bbox.height,
      left: bbox.left,
      width: bbox.width
    }
    setAnchor(anchorCoords);
  }

  const handleBackdropClick = () => {
    setAnchor(undefined);
  }

  const handleItemClick = (event: MouseEvent, item: Item) => {
    event.stopPropagation();
    onChange(item.value)
    setAnchor(undefined);
  }

  const filteredItems = useMemo(() => {
    const regex = new RegExp(inputValue, 'i')
    return items.filter((item) => item.label.match(regex))
  }, [inputValue, items]);

  return (
    <Container ref={inputRef}>
      <Input
        {...inputProps}
        onClick={handleClick}
        onChange={handleChange}
        contentRight={<FiChevronDown />}
        value={inputValue} />
      {anchor && (
        <SelectContent onClose={handleBackdropClick}>
          <ItemContainer anchor={anchor}>
            {filteredItems.map((item) => (
              <ListItem key={item.value} onClick={(e) => handleItemClick(e, item)}>
                {item.label}
              </ListItem>
            ))}
          </ItemContainer>
        </SelectContent>
      )}
    </Container>
  )
};

export default Select;