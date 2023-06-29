import React, { useRef, useEffect, TextareaHTMLAttributes, forwardRef } from 'react';

interface AutoResizeTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  // You can add extra properties here if needed
}

const AutoResizeTextArea: React.FC<AutoResizeTextAreaProps> = forwardRef((props, ref) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const update = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'inherit';
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = `${scrollHeight}px`;
    }
  }

  useEffect(() => {
    if (textAreaRef.current) {
      update()
    }

    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('resize', update);
    }
  }, []);



  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    update();
    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <textarea
      {...props}
      ref={textAreaRef}
      onChange={onChangeHandler}
      style={{ overflow: 'hidden', resize: 'none', ...props.style }}
    />
  );
});

AutoResizeTextArea.displayName = "AutoResizeTextArea";

export default AutoResizeTextArea;
