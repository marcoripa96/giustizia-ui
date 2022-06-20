import { ChangeEvent, useState } from "react";

/**
 * Handles an input element
 */
const useInput = (initialValue?: string) => {
  const [value, setValue] = useState<string>(initialValue || '');

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(event.target.value);
  }
  return {
    binds: {
      value,
      onChange
    },
    setValue
  }
  // return [value, onChange] as const;
};

export default useInput;