import { useState } from "react";

const useToggle = (initialValue: boolean) => {
  const [state, setState] = useState(initialValue);
  const toggle = () => setState((s) => !s);
  return [state, toggle] as const;
};

export default useToggle;
