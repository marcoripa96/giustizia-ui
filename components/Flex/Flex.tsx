import styled from "@emotion/styled";
import { CSSProperties } from "react";

type FlexProps = {
  direction?: CSSProperties['flexDirection'],
  grow?: CSSProperties['flexGrow'],
  shrink?: CSSProperties['flexShrink'],
  alignItems?: CSSProperties['alignItems'],
  justifyContent?: CSSProperties['justifyContent'],
  gap?: CSSProperties['gap'],
  padding?: CSSProperties['padding'],
  margin?: CSSProperties['margin'],
  marginLeft?: CSSProperties['marginLeft'],
  marginRight?: CSSProperties['marginRight'],
  marginTop?: CSSProperties['marginTop'],
  marginBottom?: CSSProperties['marginBottom'],
}


const Flex = styled.div<FlexProps>(({
  padding,
  margin,
  marginTop,
  marginRight,
  marginLeft,
  marginBottom,
  direction,
  grow,
  shrink,
  alignItems,
  justifyContent,
  gap
}) => {
  return {
    display: 'flex',
    flexDirection: direction || 'column',
    ...(grow != null && { flexGrow: grow }),
    ...(shrink != null && { flexShrink: shrink }),
    ...(alignItems != null && { alignItems }),
    ...(justifyContent != null && { justifyContent }),
    ...(gap != null && { gap }),
    ...(padding !== null && { padding }),
    ...(margin !== null && { margin }),
    ...(marginTop !== null && { marginTop }),
    ...(marginBottom !== null && { marginBottom }),
    ...(marginLeft !== null && { marginLeft }),
    ...(marginRight !== null && { marginRight })
  }
});

export default Flex;