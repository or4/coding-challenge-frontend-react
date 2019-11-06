import { Action } from 'redux';
import { isFunction } from 'lodash';

import { createReducer } from '../createReducer';

describe('Check createReducer', () => {
    const initialState = {};
    const state = {};
    const resultOfAction = { done: true };
    const handlers: { [key: string]: (state: unknown, action: Action) => unknown } = { action: () => resultOfAction };
    const action = { type: 'action' };

    it('should return function', () => {
        expect(isFunction(createReducer({}, {}))).toBe(true);
    });

    it('should return right result with right arguments', () => {
        const reducer = createReducer(initialState, handlers);

        expect(reducer(state, action)).toEqual(resultOfAction);
    });

    it('should return undefined if initialState and state are not defined', () => {
        const initialState = undefined;
        const state = undefined;
        const reducer = createReducer(initialState, handlers);

        expect(reducer(state, action)).toEqual(undefined);
    });

    it('should return right result if state is not defined but initialState is defined', () => {
        const state = undefined;
        const reducer = createReducer(initialState, handlers);

        expect(reducer(state, action)).toEqual(resultOfAction);
    });

    it('should return right result if initialState is not defined but state is defined', () => {
        const initialState = undefined;
        const reducer = createReducer(initialState, handlers);

        expect(reducer(state, action)).toEqual(resultOfAction);
    });

    it('should return empty object if not defined handlers', () => {
        // @ts-ignore
        const handlers: { [key: string]: (state: unknown, action: Action) => unknown } = undefined;

        const reducer = createReducer(initialState, handlers);

        expect(reducer(undefined, action)).toEqual({});
    });

    it('should return empty object if not defined action', () => {
        // @ts-ignore
        const action: Action = undefined;
        const reducer = createReducer(initialState, handlers);

        expect(reducer(undefined, action)).toEqual({});
    });

    it('should return empty object with empty action', () => {
        // @ts-ignore
        const action: Action = {};
        const reducer = createReducer(initialState, handlers);

        expect(reducer(undefined, action)).toEqual({});
    });
});
