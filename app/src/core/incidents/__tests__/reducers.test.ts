import { AnyAction } from 'redux';
import { IIncidentRequestOptions } from 'types';

import { incidentsReducer } from '../reducers';
import { IncidentsRequest } from '../actions';

describe('Incidents reducer', () => {
    const initialState = undefined;

    it('should return init state', () => {
        // @ts-ignore
        const EmptyAction: AnyAction = {};

        // @ts-ignore
        expect(incidentsReducer(initialState, EmptyAction)).toEqual({
            requesting: false,
        });
    });

    it('should return state after apply IncidentsRequest action', () => {
        expect(incidentsReducer(initialState, new IncidentsRequest({}))).toEqual({
            requesting: true,
        });
    });

    it('should return state after apply IncidentsRequest action with options', () => {
        const options: IIncidentRequestOptions = {
            incidentType: 'theft',
            proximity: 'Berlin',
            proximitySquare: 100,
        };

        expect(incidentsReducer(initialState, new IncidentsRequest(options))).toEqual({
            requesting: true,
        });
    });
});
