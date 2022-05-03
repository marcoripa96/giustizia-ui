import { ChangeEvent, useState } from "react";

const useInput = (initialValue?: string) => {
  const [value, setValue] = useState<string>(initialValue || '');

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(event.target.value);
  }

  return [value, onChange] as const;
};

export default useInput;