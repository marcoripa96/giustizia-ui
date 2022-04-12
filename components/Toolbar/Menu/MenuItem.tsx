import { FC } from "react"
import styled from '@emotion/styled';

const MenuItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const MenuDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const MenuTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
`
const MenuDescription = styled.p`
  font-size: 14px;
  color: rgb(111, 110, 119);
  margin: 0;
`

export type MenuItemProps = {
  title: string;
  description: string;
}

const MenuItem: FC<MenuItemProps> = ({ children, title, description }) => {
  return (
    <MenuItemContainer>
      <MenuDescriptionContainer>
        <MenuTitle>{title}</MenuTitle>
        <MenuDescription>{description}</MenuDescription>
      </MenuDescriptionContainer>
      {children}
    </MenuItemContainer>
  )
}

export default MenuItem;