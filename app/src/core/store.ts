import { createStore, applyMiddleware, Action, Middleware, Dispatch } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Actions } from './actions';
import { reducers, ApplicationState } from './reducers';

const actionToPlainObject: Middleware = () => (next: Dispatch<Action>) => <A extends Action>(action: A) => {
    return next(Object.assign({}, action));
};

const initialAppState = {};

export const store = createStore<ApplicationState, Actions, unknown, unknown>(
    reducers,
    initialAppState,
    composeWithDevTools(applyMiddleware(actionToPlainObject))
);
