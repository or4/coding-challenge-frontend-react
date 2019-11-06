import { createReducer } from 'core/utils/createReducer';

import { IncidentsActionType, IncidentsActions } from './actions';

export interface IIncidentsState {
    requesting: boolean;
}

export const initialState: IIncidentsState = {
    requesting: false,
};

const handlers = {
    [IncidentsActionType.IncidentsRequest]: (state: IIncidentsState = initialState) => {
        return { ...state, requesting: true };
    },
};

export const incidentsReducer = createReducer<IIncidentsState, IncidentsActions>(initialState, handlers);
