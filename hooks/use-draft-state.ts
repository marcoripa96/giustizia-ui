import { useEffect, useState } from "react";

const useDraftState = <T>(useSelector: () => T) => {
  const _state = useSelector();
  const [tmpState, setTempState] = useState<T | undefined>(undefined);

  useEffect(() => {
    setTempState(_state);
  }, [_state]);

  return [tmpState, setTempState] as const;
}

export default useDraftState;