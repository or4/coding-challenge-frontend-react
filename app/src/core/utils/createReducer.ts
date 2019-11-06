import { Action } from 'redux';

export function createReducer<S, A extends Action>(
    initialState: S,
    handlers: { [key: string]: (state: S, action: A) => S }
) {
    return function(state: S = initialState, action: A): S {
        if (state) {
            return action && action.type && handlers && handlers[action.type]
                ? handlers[action.type](state, action)
                : state;
        }

        return state;
    };
}
