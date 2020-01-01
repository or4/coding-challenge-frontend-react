import { combineReducers } from 'redux';

import { IIncidentsState, incidentsReducer } from './incidents/reducers';
import { IncidentsActions } from './incidents/actions';

export const reducers = combineReducers<IAppState, IncidentsActions>({
    incidents: incidentsReducer,
});

export interface IAppState {
    incidents: IIncidentsState;
}
