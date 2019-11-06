import { createStore, applyMiddleware, Action, Middleware, Dispatch } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { Actions } from './actions';
import { reducers, ApplicationState } from './reducers';
import { sagas } from './sagas';

const sagaMiddleware = createSagaMiddleware();

const actionToPlainObject: Middleware = () => (next: Dispatch<Action>) => <A extends Action>(action: A) => {
    return next(Object.assign({}, action));
};

const initialAppState = {};

export const store = createStore<ApplicationState, Actions, unknown, unknown>(
    reducers,
    initialAppState,
    composeWithDevTools(applyMiddleware(sagaMiddleware, actionToPlainObject))
);

sagaMiddleware.run(sagas);
