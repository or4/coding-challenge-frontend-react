import { combineReducers } from 'redux';

import { IIncidentsState, incidentsReducer } from './incidents/reducers';
import { IncidentsActions } from './incidents/actions';

export const reducers = combineReducers<AppState, IncidentsActions>({
    incidents: incidentsReducer,
});

export interface AppState {
    incidents: IIncidentsState;
}
