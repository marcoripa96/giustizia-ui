import { useClickOutside } from "@/hooks";
import styled from "@emotion/styled";
import { Card, Checkbox, FormElement, Input, InputProps } from "@nextui-org/react";
import { FiChevronDown } from "@react-icons/all-files/fi/FiChevronDown";
import { ChangeEvent, Children, cloneElement, isValidElement, MouseEvent, PropsWithChildren, ReactElement, useRef, useState } from "react";
import { BaseSelectItem } from ".";
import { Portal } from "../Portal";
import { BaseSelectItemProps } from "./BaseSelectItem";

type BaseSelectProps = {
  value: string | string[];
  onChange?: (event: MouseEvent, value: string | string[]) => void;
  renderValue?: (value: string) => string;
  selectableInput?: boolean;
  multiple?: boolean;
  inputProps?: Partial<InputProps>;
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
  zIndex: 999999,
  ...anchor,
  '> div': {
    padding: 0
  }
}));

const BaseSelect = ({
  value,
  onChange,
  inputProps,
  multiple,
  selectableInput,
  children
}: PropsWithChildren<BaseSelectProps>) => {
  const [anchor, setAnchor] = useState<Anchor>();

  const inputRef = useRef<HTMLDivElement>(null);
  const containerRef = useClickOutside(() => {
    setAnchor(undefined);
  })

  const getAnchorCoords = () => {
    if (!inputRef.current) return;
    const bbox = inputRef.current.getBoundingClientRect();
    return {
      top: bbox.top + bbox.height,
      left: bbox.left,
      width: bbox.width
    }
  }

  const handleClick = () => {
    if (!inputProps?.disabled) {
      setAnchor(getAnchorCoords());
    }
  }

  const handleInputChange = (event: ChangeEvent<FormElement>) => {
    if (!selectableInput) {
      event.stopPropagation();
      return;
    }
    if (inputProps?.onChange) {
      inputProps.onChange(event);
    }
  }

  const handleAllClick = (event: MouseEvent) => {
    if (!Array.isArray(value)) {
      return;
    }
    if (!items) {
      return;
    }

    let newValue: string[] = [];

    if (value.length !== items.length) {
      newValue = items.map((item) => item.props.value);
    }
    if (onChange) {
      onChange(event, newValue);
    }
  }

  const handleItemClick = (child: ReactElement<BaseSelectItemProps>) => (event: MouseEvent) => {
    let newValue;

    if (multiple) {
      newValue = Array.isArray(value) ? value.slice() : [];
      const itemIndex = value.indexOf(child.props.value);
      if (itemIndex === -1) {
        newValue.push(child.props.value);
      } else {
        newValue.splice(itemIndex, 1);
      }
    } else {
      newValue = child.props.value;
    }
    if (value !== newValue) {
      if (onChange) {
        onChange(event, newValue);
      }
    }

    if (!multiple) {
      setAnchor(undefined);
    }
  };


  const items = Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return null;
    }
    return cloneElement(child, {
      onClick: handleItemClick(child)
    })
  });

  const renderValue = () => {
    if (!items) {
      return '';
    }
    if (multiple && Array.isArray(value)) {
      if (value.length === 0) {
        return 'None'
      }
      if (value.length === items.length) {
        return 'All'
      }
      let val = [];
      for (const item of items) {
        if (value.indexOf(item.props.value) !== -1) {
          val.push(item.props.label);
        }
      }
      return val.join(', ');
    }
    const item = items.find((item) => item.props.value === value);
    return item ? item.props.label : '';
  }

  const getAllCheckProps = () => {
    if (!items) {
      return {
        isSelected: false,
        isIndeterminate: false
      }
    }
    return {
      isSelected: items.length === value.length,
      isIndeterminate: value.length < items.length && value.length > 0
    }
  }

  return (
    <>
      <Container ref={inputRef} onClick={handleClick}>
        <Input
          {...inputProps}
          contentRight={<FiChevronDown />}
          value={renderValue()}
          onChange={handleInputChange} />
      </Container>
      {anchor && (
        <Portal elementSelector="select-popup">
          <ItemContainer anchor={anchor} ref={containerRef}>
            {multiple && (
              <BaseSelectItem label="All" value="all" onClick={handleAllClick}>
                <Checkbox {...getAllCheckProps()} />
                All
              </BaseSelectItem>
            )}
            {items}
          </ItemContainer>
        </Portal>
      )}
    </>
  )
};

export default BaseSelect;