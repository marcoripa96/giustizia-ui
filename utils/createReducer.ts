type ReducerFunction<S, A extends RequiredActionFields> = (state: S, action: A['payload']) => S;

type RequiredActionFields<P = {}> = {
  type: string;
  payload?: P;
};

type Reducers<S, A extends RequiredActionFields> = {
  [T in A['type']]: ReducerFunction<S, A & { type: T }>
};

export function createReducer<S, A extends RequiredActionFields<A['payload']>>(reducers: Reducers<S, A>) {
  return (state: S, action: A) => {
    const reducer = reducers[action.type as keyof typeof reducers];

    if (!reducer) {
      throw new Error(`Unhandled action type`);
    }

    const nextState = reducer(state, action.payload);

    return nextState;
  }
}