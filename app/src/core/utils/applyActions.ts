import { Reducer, Action } from 'redux';

export function applyActions<S, A extends Action>(reducer: Reducer<S, A>, initialState: S, actions: A[]) {
    if (!initialState) {
        return undefined;
    }

    return actions.reduce((state, action) => {
        return reducer(state, action);
    }, initialState);
}
