import { AnyAction } from 'redux';
import { IIncidentRequestOptions, IIncident } from 'types';

import { incidentsReducer, IIncidentsState } from '../reducers';
import { IncidentsRequest, IncidentsRequestSuccess } from '../actions';

describe('Incidents reducer', () => {
    let initialState: IIncidentsState | undefined;

    beforeEach(() => {
        initialState = undefined;
    });

    describe('common', () => {
        it('should return init state', () => {
            // @ts-ignore
            const EmptyAction: AnyAction = {};

            // @ts-ignore
            expect(incidentsReducer(initialState, EmptyAction)).toEqual({});
        });
    });

    describe('IncidentsRequest', () => {
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

    describe('IncidentsRequestSuccess', () => {
        it('should return state without requesting flag', () => {
            initialState = {
                requesting: true,
            };
            const incidents: IIncident[] = [];

            expect(incidentsReducer(initialState, new IncidentsRequestSuccess(incidents))).toEqual({
                requesting: false,
                incidents: [],
            });
        });

        it('should return state with incidents', () => {
            initialState = {
                requesting: true,
            };
            const incidents: IIncident[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

            expect(incidentsReducer(initialState, new IncidentsRequestSuccess(incidents))).toEqual({
                requesting: false,
                incidents: [{ id: 1 }, { id: 2 }, { id: 3 }],
            });
        });
    });
});
