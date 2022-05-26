import { ButtonProps as NextUIButtonProps, Button as NextUIButton, Loading } from '@nextui-org/react';

type ButtonProps = NextUIButtonProps & {
  loading?: boolean;
}

const Button = ({
  loading,
  children,
  disabled,
  ...props
}: ButtonProps) => {

  const isDisabled = loading ? true : disabled;
  return (
    <NextUIButton disabled={isDisabled} {...props}>
      {loading ? <Loading color="currentColor" size="sm" /> : children}
    </NextUIButton>
  )
}
export default Button;