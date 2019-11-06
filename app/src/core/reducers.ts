import { combineReducers } from 'redux';

import { IIncidentsState, incidentsReducer } from './incidents/reducers';
import { IncidentsActions } from './incidents/actions';

export const reducers = combineReducers<ApplicationState, IncidentsActions>({
    incidents: incidentsReducer,
});

export interface ApplicationState {
    incidents: IIncidentsState;
}
