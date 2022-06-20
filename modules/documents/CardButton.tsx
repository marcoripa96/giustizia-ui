import styled from "@emotion/styled";
import { Card, Text } from "@nextui-org/react";
import { ReactNode } from "react";

type CardButtonProps = {
  contentLeft: ReactNode;
  contentRight: ReactNode;
  title: string;
  description: string;
}

const Content = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
})

const TextContent = styled.div({
  display: 'flex',
  flexDirection: 'column'
})

const CardButton = ({ contentLeft, contentRight, title, description }: CardButtonProps) => {
  return (
    <Card
      variant="bordered"
      isPressable
      isHoverable
      disableRipple
      css={{ borderWidth: '1px', width: 'auto', boxShadow: 'none !important', padding: '10px' }}>
      <Content>
        {contentLeft}
        <TextContent>
          <Text h6>{title}</Text>
          <Text css={{ color: 'rgba(0, 0, 0, .5)', fontSize: '14px' }}>{description}</Text>
        </TextContent>
        {contentRight}
      </Content>
    </Card>
  )
}

export default CardButton;