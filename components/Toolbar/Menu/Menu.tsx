import { Children, FC, forwardRef, MouseEventHandler, ReactElement } from "react";
import styled from '@emotion/styled';
import { MenuItemProps } from "./MenuItem";

const MenuContainer = styled.div<{ offset: number }>`
  margin-top: 10px;
  padding: 12px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 1%), 1px 1px 5px rgb(0 0 0 / 15%);
  transform: ${({ offset }: any) => `translateX(${offset}px)`};
  transition: transform 250ms ease-out;
`

type MenuProps = {
  activeIndex: number | null;
  offset: number;
  onClose?: MouseEventHandler<HTMLDivElement> | undefined;
  children?: ReactElement<MenuItemProps> | React.ReactElement<MenuItemProps>[]
}

const Menu = forwardRef<HTMLDivElement, MenuProps>(({ activeIndex, offset, onClose, children }, ref) => {
  if (activeIndex === null) {
    return null;
  }

  // only render the active item
  const activeItem = Children.toArray(children)[activeIndex];

  return (
    <MenuContainer ref={ref} offset={offset} onMouseLeave={onClose}>
      {activeItem}
    </MenuContainer>
  )
});

Menu.displayName = 'Menu';

export default Menu;