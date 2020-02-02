import { IIncident, IIncidentsModifiedRequestOptions } from 'types';
import { IAppState } from 'core/reducers';

import { IncidentsActionType, IncidentsActions } from './actions';
import { INCIDENTS_PER_PAGE, MAX_INCIDENTS_COUNT } from './contstants';

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
            if (action.options.perPage === MAX_INCIDENTS_COUNT) {
                return state;
            }

            return { ...state, requesting: true };

        case IncidentsActionType.IncidentsRequestSuccess:
            const { page, perPage } = action.options;

            if (perPage === MAX_INCIDENTS_COUNT) {
                return { ...state, totalIncidents: action.incidents.length };
            }

            return {
                ...state,
                requesting: false,
                incidents: action.incidents,
                requestOptions: { ...state.requestOptions, page },
            };

        case IncidentsActionType.IncidentsRequestFail:
            return { ...state, requesting: false, error: action.error };

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
