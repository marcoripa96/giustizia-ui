import { ComponentPropsWithoutRef, HTMLAttributes } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const TextField = styled.input`
  outline: none;
  border: 1px solid #b1b1b1;
  border-radius: 6px;
  padding: 12px;
  font-size: 16px;
  &:focus {
    border-color: #000;
  }
`

const InputError = styled.span`
  font-size: 14px;
  color: rgb(240, 62, 62);
`

type InputTextProps = ComponentPropsWithoutRef<"input"> & {
  error?: string;
};

function InputText({ error, ...props }: InputTextProps) {
  return (
    <Wrapper>
      <TextField {...props} />
      {error && <InputError>{error}</InputError>}
    </Wrapper>
  )
}

export default InputText;