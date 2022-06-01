import { useSelector } from "@/modules/document/DocumentProvider/selectors";
import { State } from "@/modules/document/DocumentProvider/types";
import { useEffect, useState } from "react";

const useDraftState = <T>(selector: (state: State) => T) => {
  const _state = useSelector(selector);
  const [tmpState, setTempState] = useState<T | undefined>(undefined);

  useEffect(() => {
    setTempState(_state);
  }, [_state]);

  return [tmpState, setTempState] as const;
}

export default useDraftState;