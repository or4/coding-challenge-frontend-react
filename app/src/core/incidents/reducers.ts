import { IIncident, IIncidentsModifiedRequestOptions } from 'types';
import { IAppState } from 'core/reducers';

import { IncidentsActionType, IncidentsActions } from './actions';
import { INCIDENTS_PER_PAGE } from './contstants';

export interface IIncidentsState {
    requesting?: boolean;
    incidents?: IIncident[];
    requestOptions: IIncidentsModifiedRequestOptions;
    totalIncidents?: number;
    error?: object;
}

export const initialState: IIncidentsState = {
    requestOptions: {},
};

export const incidentsReducer = (state: IIncidentsState = initialState, action: IncidentsActions) => {
    switch (action.type) {
        case IncidentsActionType.IncidentsRequest:
            return { ...state, requesting: true };

        case IncidentsActionType.IncidentsRequestSuccess:
            const { page } = action.options;

            return {
                ...state,
                requesting: false,
                incidents: action.incidents,
                requestOptions: { ...state.requestOptions, page },
            };

        case IncidentsActionType.IncidentsRequestFail:
            return { ...state, requesting: false, error: action.error };

        case IncidentsActionType.IncidentsCountRequestSuccess:
            return { ...state, totalIncidents: action.countIncidents };

        default:
            return state;
    }
};

export const selectTotalPages = (state: IAppState) => {
    const { totalIncidents } = state.incidents;

    if (!totalIncidents) {
        return 0;
    }

    return Math.ceil(totalIncidents / INCIDENTS_PER_PAGE);
};
