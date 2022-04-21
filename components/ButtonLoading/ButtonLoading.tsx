
import styled from "@emotion/styled";
import { ComponentProps, HTMLAttributes, PropsWithChildren } from "react"
import Button, { ButtonProps } from "../Button/Button";
import { Loader } from "../Loader";

type ButtonLoadingProps = ButtonProps & {
  loading?: boolean;
}

const SmallLoader = styled(Loader)`
  width: 20px;
  height: 20px;
  border-color: rgba(0, 0, 0, 0.26) #464646 #464646;
`


const ButtonLoading = ({ loading, children, ...props }: PropsWithChildren<ButtonLoadingProps>) => {
  return (
    <Button {...props}>
      {loading ? <SmallLoader /> : children}
    </Button>
  )
}

export default ButtonLoading;