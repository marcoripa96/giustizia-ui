import { useParam } from "@/hooks";
import styled from "@emotion/styled";
import { Children, cloneElement, isValidElement, PropsWithChildren, ReactElement } from "react";
// import Content from "./Content";
import Sidebar from "./Sidebar";

type LayoutProps = PropsWithChildren<{}>

export type LayoutContentProps = {
  type: string;
}

const PageContainer = styled.div({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'row'
})

const ContentWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  // overflowY: 'auto'
})

// const Content = styled.div({
//   display: 'flex',
//   flexDirection: 'column',
//   width: '100%',
//   maxWidth: '900px',
//   marginLeft: 'auto',
//   marginRight: 'auto',
//   padding: '24px'
// })


const Layout = ({ children }: LayoutProps) => {
  const [type, isReady] = useParam<string>('type');

  const childrenWithProps = Children.map(children, child => {
    // Checking isValidElement is the safe way and avoids a
    // typescript error too.
    if (isValidElement(child)) {
      const elem = cloneElement(child as ReactElement<LayoutContentProps>, { type: isReady && type ? type.toUpperCase() : undefined });
      return elem;
    }
    return child;
  });



  return (
    <PageContainer>
      <Sidebar />
      <ContentWrapper>
        {isReady && childrenWithProps}
      </ContentWrapper>
    </PageContainer>
  )
};

export default Layout;