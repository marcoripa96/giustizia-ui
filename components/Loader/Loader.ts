import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const spin = keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(359deg) }
`

const Loader = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid;
  border-color: #333 rgba(0,0,0,0.1) rgba(0,0,0,0.1);
  animation: ${spin} .6s linear infinite;
`

export default Loader;