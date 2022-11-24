import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Progress, Text } from "@nextui-org/react";
import { PropsWithChildren, ReactNode, UIEvent, useEffect, useRef, useState } from "react";

type ContentProps = PropsWithChildren<{
  title: string;
  actionsToolbar?: ReactNode;
  description?: string;
  showLoader?: boolean;
}>

const OuterContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  overflowY: 'auto'
})

const TextInfo = styled.div({
  display: 'flex',
  flexDirection: 'column',
  borderBottom: '1px solid rgba(0,0,0,0.1)',
  padding: '10px 0'
})

const InnerContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '10px',
  maxWidth: '900px',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '24px'
})

const slideDown = keyframes`
  0% {
    transform: translateY(-100%)
  }
  100% {
    transform: translateY(0);
  }
`

const Header = styled.div({
  display: 'flex',
  flexDirection: 'column',
  // alignItems: 'center',
  gap: '5px',
  position: 'sticky',
  width: '100%',
  top: 10,
  left: 0,
  padding: '10px',
  background: '#FFF',
  fontSize: '16px',
  fontWeight: 600,
  boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
  borderRadius: '6px',
  zIndex: 999,
  animation: `${slideDown} 250ms ease-out`
})

const Actions = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px'
})


const Content = ({ title, description, children, showLoader, actionsToolbar }: ContentProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { bottom } = ref.current.getBoundingClientRect();
    setShowPreview(event.currentTarget.scrollTop > bottom + event.currentTarget.scrollTop);
  }

  return (
    <OuterContainer onScroll={handleScroll}>
      <InnerContainer>
        <TextInfo ref={ref}>
          <Text h1 css={{ margin: 0 }}>{title}</Text>
          {description && <Text size="$2xl" css={{ color: 'rgba(0,0,0,0.7)' }}>{description}</Text>}
          {actionsToolbar && (
            <Actions>
              {actionsToolbar}
            </Actions>
          )}
        </TextInfo>
        {showPreview && (
          <Header>
            {title}
            <Text size="$md" css={{ color: 'rgba(0,0,0,0.7)' }}>{description}</Text>
          </Header>
        )}
        {showLoader ? <Progress indeterminated></Progress> : children}
      </InnerContainer>
    </OuterContainer>
  )
};

export default Content;