import { logger } from "@/modules/document/DocumentProvider/middlewares";
import produce, { Draft, enablePatches, original, produceWithPatches, setAutoFreeze } from "immer"
import { applyPatches, Patch } from "./patches";

type ImmerReducerFunction<S extends RequiredStateFields, A extends RequiredActionFields> = (state: Draft<S>, action: A['payload']) => void | readonly [Patch[], Patch[]];

type RequiredStateFields = {
  draft: {
    patches: Patch[];
    inversePatches: Patch[];
  };
};

type RequiredActionFields<P = {}> = {
  type: string;
  generatePatches?: boolean;
  payload?: P;
};

type Reducers<S extends RequiredStateFields, A extends RequiredActionFields> = {
  [T in A['type']]: ImmerReducerFunction<S, A & { type: T }>
};

setAutoFreeze(false);
enablePatches();

// export function stateTransition<S extends RequiredStateFields>(
//   state: S,
//   mutationsWithPatches: (draft: S) => void,
//   mutationsWithoutPatches?: (draft: Draft<S>) => void,
// ) {
//   const [nextState, patches, inversePatches] = produceWithPatches(
//     original(state),
//     (draft: S) => {
//       mutationsWithPatches(draft);
//     }
//   );

//   return produce(nextState as S, (draft: Draft<S>) => {
//     if (mutationsWithoutPatches) {
//       mutationsWithoutPatches(draft);
//     }

//     draft.draft.patches.push(...patches);
//     draft.draft.inversePatches.push(...inversePatches);
//   })
// }


export function createImmerReducer<S extends RequiredStateFields, A extends RequiredActionFields<A['payload']>>(reducers: Reducers<S, A>) {
  return (state: S, action: A) => {
    const reducer = reducers[action.type as keyof typeof reducers];

    if (!reducer) {
      throw new Error(`Unhandled action type`);
    }

    const nextState = produce(state, draft => {
      const changes = reducer(draft, action.payload);
      console.log(changes);
      if (!changes) {
        return draft;
      }
      const [patches, inversePatches] = changes;
      draft.draft.patches.unshift(...patches);
      draft.draft.inversePatches.push(...inversePatches);

      return applyPatches(draft, patches);
    })

    // logger(nextState);

    return nextState;
  }
}