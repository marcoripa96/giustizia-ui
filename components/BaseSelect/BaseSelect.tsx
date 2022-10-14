import { useClickOutside, useInput, useWindowEventListener } from "@/hooks";
import { removeStopScroll, stopScroll } from "@/utils/shared";
import styled from "@emotion/styled";
import { Card, Checkbox, FormElement, Input, InputProps } from "@nextui-org/react";
import { FiChevronDown } from "@react-icons/all-files/fi/FiChevronDown";
import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import { ChangeEvent, Children, cloneElement, CSSProperties, isValidElement, MouseEvent, PropsWithChildren, ReactElement, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Portal } from "../Portal";
import Option, { OptionProps } from "./Option";


type BaseSelectProps = {
  value: string | string[];
  onChange?: (event: MouseEvent, value: string | string[]) => void;
  renderValue?: (value: string) => string;
  multiple?: boolean;
  inputProps?: Partial<InputProps>;
  backdrop?: boolean;
  nonOptionNode?: ReactNode;
  onTop?: boolean
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

const PopoverContainer = styled(Card)<{ anchor: Anchor, onTop?: boolean }>(({ anchor, onTop }) => ({
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '300px',
  overflow: 'hidden',
  paddingBottom: '5px',
  zIndex: onTop ? 999999 : 999,
  ...anchor,
}));

const PopoverContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  '::-webkit-scrollbar': {
    height: '4px',
    width: '4px'
  },
  '::-webkit-scrollbar-thumb': {
    background: 'rgba(0,0,0,0.1)'
  }
})

const ContainerSearch = styled.div({
  position: 'sticky',
  top: 0,
  padding: '8px',
  background: '#FFF',
  borderBottom: '1px solid rgba(0,0,0,0.1)',
  zIndex: 101
})

const EmptyItem = styled.div({
  padding: '10px 18px',
})

const Backdrop = styled.div<{ onTop?: boolean }>(({ onTop }) => ({
  position: 'fixed',
  inset: 0,
  zIndex: onTop ? 999998 : 998
}));

const BaseSelect = ({
  value,
  onChange,
  inputProps,
  multiple,
  backdrop = true,
  renderValue,
  nonOptionNode,
  onTop = false,
  children
}: PropsWithChildren<BaseSelectProps>) => {
  const { binds: searchBinds, setValue: setSearchValue } = useInput('');
  const [popoverAnchor, setPopoverAncho] = useState<Anchor | undefined>();
  const containerRef = useRef<HTMLDivElement>(null);

  const updateAnchor = (active = true) => {
    if (!active) {
      setPopoverAncho(undefined);
      setSearchValue('');
      return;
    }
    const getAnchorCoords = () => {
      if (!containerRef.current) return;
      const bbox = containerRef.current.getBoundingClientRect();
      return {
        top: bbox.top + bbox.height,
        left: bbox.left,
        width: bbox.width
      }
    }
    setPopoverAncho(getAnchorCoords());
  }

  useWindowEventListener('resize', () => {
    if (popoverAnchor) {
      setTimeout(() => {
        updateAnchor()
      }, 0);
    }
  })

  const popoverRef = useClickOutside(() => {
    if (!backdrop) {
      updateAnchor(false)
    }
  })


  const handleClick = () => {
    if (!inputProps?.disabled) {
      updateAnchor();
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

  const handleItemClick = (child: ReactElement<OptionProps>) => (event: MouseEvent) => {
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
      updateAnchor(false);
    }
  };

  const prerenderValue = () => {
    if (!children) {
      return '';
    }
    const childrenItems = Children.toArray(children) as ReactElement<OptionProps>[];

    if (multiple && Array.isArray(childrenItems)) {
      if (value.length === 0) {
        return 'None'
      }
      if (value.length === childrenItems.length) {
        return 'All'
      }
      let val = [];
      for (const item of childrenItems) {
        if (value.indexOf(item.props.value) !== -1) {
          val.push(item.props.label);
        }
      }
      if (renderValue) {
        return renderValue(val.join(', '));
      }
      return val.join(', ');
    }
    const item = childrenItems.find((item) => item.props.value === value);
    if (renderValue) {
      return renderValue(item ? item.props.label : '');
    }
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

  const renderItems = () => {
    if (!filteredItems || filteredItems.length === 0) {
      return <EmptyItem>No items</EmptyItem>;
    }
    return filteredItems;
  }

  const items = useMemo(() => {
    return Children.map(children, (child) => {
      if (!isValidElement(child)) {
        return null;
      }
      return cloneElement(child, {
        onClick: handleItemClick(child),
        selected: !multiple && value === child.props.value
      })
    })
  }, [children]);

  const filteredItems = useMemo(() => {
    if (!items) {
      return null;
    }
    const regex = new RegExp(searchBinds.value, 'i');
    return items.filter((child) => child.props.label.match(regex))
  }, [searchBinds.value, items])

  return (
    <>
      <Container ref={containerRef} onClick={handleClick}>
        <Input
          {...inputProps}
          autoComplete="off"
          spellCheck="false"
          contentRight={<FiChevronDown />}
          value={prerenderValue()}
          css={{
            caretColor: 'transparent'
          }} />
      </Container>
      {popoverAnchor && (
        <Portal elementSelector="select-popup">
          <PopoverContainer anchor={popoverAnchor} onTop={!!onTop} ref={popoverRef}>
            <PopoverContent>
              <ContainerSearch>
                <Input
                  autoFocus
                  aria-label="Filter select items"
                  bordered
                  placeholder="Filter items"
                  fullWidth
                  shadow={false}
                  animated={false}
                  contentRight={<FiSearch />}
                  {...searchBinds}
                />
              </ContainerSearch>
              {multiple && (
                <Option label="All" value="all" onClick={handleAllClick}>
                  <Checkbox aria-label="Select all items" {...getAllCheckProps()} />
                  All
                </Option>
              )}
              {renderItems()}
              {nonOptionNode && nonOptionNode}
            </PopoverContent>
          </PopoverContainer>
          {backdrop && <Backdrop onClick={() => updateAnchor(false)} onTop={onTop} />}
        </Portal>
      )}
    </>
  )
};

export default BaseSelect;