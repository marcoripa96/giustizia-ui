import produce, { Draft, setAutoFreeze } from "immer"

type ImmerReducerFunction<S, A extends RequiredActionFields> = (state: Draft<S>, action: A['payload']) => void;

type RequiredActionFields<P = {}> = {
  type: string;
  payload?: P;
};

type Reducers<S, A extends RequiredActionFields> = {
  [T in A['type']]: ImmerReducerFunction<S, A & { type: T }>
};

setAutoFreeze(false);

export function createImmerReducer<S, A extends RequiredActionFields<A['payload']>>(reducers: Reducers<S, A>) {
  return (state: S, action: A) => {
    const reducer = reducers[action.type as keyof typeof reducers];

    if (!reducer) {
      throw new Error(`Unhandled action type`);
    }

    const nextState = produce(state, draft => {
      reducer(draft, action.payload);
    })

    return nextState;
  }
}