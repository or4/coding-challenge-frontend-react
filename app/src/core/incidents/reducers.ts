import { IIncident } from 'types';
import { IncidentsActionType, IncidentsActions } from './actions';

export interface IIncidentsState {
    requesting?: boolean;
    incidents?: IIncident[];
    error?: object;
}

export const initialState: IIncidentsState = {};

export const incidentsReducer = (state: IIncidentsState = initialState, action: IncidentsActions) => {
    switch (action.type) {
        case IncidentsActionType.IncidentsRequest:
            return { ...state, requesting: true };

        case IncidentsActionType.IncidentsRequestSuccess:
            return { ...state, requesting: false, incidents: action.incidents };

        case IncidentsActionType.IncidentsRequestFail:
            return { ...state, requesting: false, error: action.error };

        default:
            return state;
    }
};
