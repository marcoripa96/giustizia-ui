import styled from "styled-components";


const Button = styled.button`
  padding: 10px 20px;
  outline: none;
  border: 2px solid #000;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  background-color: #000;
  color: #FFF;
  &:hover {
    background-color: #2e2e2e;
  };
  &:active {
    background-color: #3b3b3b;
  };
  cursor: pointer;
`

export default Button;