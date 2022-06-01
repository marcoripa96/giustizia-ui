import { useState } from "react";

/**
 * A useState hook which toggles between a true and false state.
 */
const useToggle = (initialValue: boolean) => {
  const [state, setState] = useState(initialValue);
  const toggle = () => setState((s) => !s);
  return [state, toggle] as const;
};

export default useToggle;
