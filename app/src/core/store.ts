import { createStore, applyMiddleware, Action, Middleware, Dispatch, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducers, appInitialState } from 'core';
import { ApplicationState } from 'core/reducers';

const actionToPlainObject: Middleware = () => (next: Dispatch<AnyAction>) => <A extends Action>(action: A) => {
    return next(Object.assign({}, action));
};

export const store = createStore<ApplicationState, AnyAction, unknown, unknown>(
    reducers,
    appInitialState,
    composeWithDevTools(applyMiddleware(actionToPlainObject))
);
