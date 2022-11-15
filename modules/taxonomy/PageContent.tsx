import styled from "@emotion/styled";
import { Text } from "@nextui-org/react";
import { ReactNode } from "react";

type PageContentProps = {
  title: string;
  content: ReactNode;
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  overflowY: 'auto'
})

const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '900px',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '24px'
})

const PageContent = ({ title, content }: PageContentProps) => {
  return (
    <Container>
      <Content>
        <Text h1>{title}</Text>
        {content}
      </Content>
    </Container>
  )
};

export default PageContent;