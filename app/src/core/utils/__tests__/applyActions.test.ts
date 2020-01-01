import { Action, Reducer } from 'redux';
import { isFunction } from 'lodash';
import { applyActions } from '../applyActions';

describe('Check applyActions', () => {
    let actions: Action[];
    let initialState: IState;
    let reducer: Reducer<IState, Action>;

    interface IState {
        action1?: string;
        action2?: string;
        initialValue?: string;
    }

    beforeEach(() => {
        actions = [{ type: 'Type Action 1' }, { type: 'Type Action 2' }];

        initialState = {};

        reducer = (state: IState = initialState, action: Action) => {
            if (action.type === 'Type Action 1') {
                return { ...state, action1: 'done' };
            }
            if (action.type === 'Type Action 2') {
                return { ...state, action2: 'done' };
            }

            return state;
        };
    });

    it('should exists', () => {
        expect(isFunction(applyActions)).toBe(true);
    });

    it('should return right state for one action', () => {
        const state = applyActions(reducer, initialState, [actions[1]]);

        expect(state).toEqual({ action2: 'done' });
    });

    it('should return right state for 2 actions', () => {
        const state = applyActions(reducer, initialState, actions);

        expect(state).toEqual({ action1: 'done', action2: 'done' });
    });

    it('should return right state when set initialState', () => {
        const state = applyActions(reducer, { initialValue: 'has set' }, actions);

        expect(state).toEqual({ initialValue: 'has set', action1: 'done', action2: 'done' });
    });

    it('should return right state with empty actions', () => {
        const state = applyActions(reducer, { initialValue: 'has set' }, []);

        expect(state).toEqual({ initialValue: 'has set' });
    });

    it('should return undefined when app inital state is undefined', () => {
        // @ts-ignore
        const initialState: IState = undefined;
        const state = applyActions(reducer, initialState, actions);

        expect(state).toEqual(undefined);
    });
});
