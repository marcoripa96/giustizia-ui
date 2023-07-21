import { ButtonProps as NextUIButtonProps, Button as NextUIButton, Loading } from '@nextui-org/react';


type ButtonProps = NextUIButtonProps & {
  state: 'searching' | 'generating' | 'idle';
}

const ButtonSend = ({ state, children, ...props }: ButtonProps) => {
  const disabled = state === 'generating' || state === 'searching';

  const renderBtnContent = () => {
    if (state === 'searching') {
      return (
        <span className='flex flex-row items-center gap-2'>
          Searching for relevant documents...
          <Loading color="currentColor" size="sm" />
        </span>
      )
    }

    if (state === 'generating') {
      return (
        <span className='flex flex-row items-center gap-2'>
          Generating...
          <Loading color="currentColor" size="sm" />
        </span>
      )
    }

    return children;
  }


  return (
    <NextUIButton disabled={disabled} {...props}>
      {renderBtnContent()}
    </NextUIButton>
  )
};

export { ButtonSend };