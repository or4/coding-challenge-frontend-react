import { createReducer } from 'core/utils/createReducer';

import { IncidentsActionType, IncidentsActions, IncidentsRequestSuccess } from './actions';
import { IIncident } from 'types';

export interface IIncidentsState {
    requesting?: boolean;
    incidents?: IIncident[];
}

export const initialState: IIncidentsState = {};

const handlers = {
    [IncidentsActionType.IncidentsRequest]: (state: IIncidentsState = initialState) => {
        return { ...state, requesting: true };
    },
    [IncidentsActionType.IncidentsRequestSuccess]: (
        state: IIncidentsState = initialState,
        action: IncidentsRequestSuccess
    ) => {
        return { ...state, requesting: false, incidents: action.incidents };
    },
};

// @ts-ignore
export const incidentsReducer = createReducer<IIncidentsState, IncidentsActions>(initialState, handlers);
