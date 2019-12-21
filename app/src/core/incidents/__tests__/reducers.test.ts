import createHttpError from 'http-errors';
import { promisify } from 'util';
import { IIncidentRequestOptions, IIncident } from 'types';

import { incidentsReducer, IIncidentsState } from '../reducers';
import {
    IncidentsRequest,
    IncidentsRequestSuccess,
    IncidentsRequestFail,
    defaultIncidentRequestOptions,
} from '../actions';
import { getFakeIncidents } from '../__mocks__/fakeIncidents';

describe('Incidents reducer', () => {
    let state: IIncidentsState | undefined;
    const initialState: IIncidentsState = {};

    describe('common', () => {
        it('should return init state', () => {
            state = undefined;

            // @ts-ignore
            const ActionWithoutType: IncidentsRequest = {};

            expect(incidentsReducer(state, ActionWithoutType)).toEqual(initialState);
        });

        it('should not work without action', async () => {
            state = undefined;

            // @ts-ignore
            const ActionWithoutType: IncidentsRequest = undefined;

            await expect(promisify(incidentsReducer)(state, ActionWithoutType)).rejects.toThrow(
                `Cannot read property 'type' of undefined`
            );
        });
    });

    describe('IncidentsRequest', () => {
        it('should return right state with empty options', () => {
            const options: IIncidentRequestOptions = {
                page: 1,
            };
            expect(incidentsReducer(state, new IncidentsRequest(options))).toEqual({
                requesting: true,
            });
        });

        it('should return right state action with options', () => {
            expect(incidentsReducer(state, new IncidentsRequest(defaultIncidentRequestOptions))).toEqual({
                requesting: true,
            });
        });
    });

    describe('IncidentsRequestSuccess', () => {
        it('should return right state with empty incidents', () => {
            state = {
                requesting: true,
            };
            const incidents: IIncident[] = [];

            expect(incidentsReducer(state, new IncidentsRequestSuccess(incidents))).toEqual({
                requesting: false,
                incidents: [],
            });
        });

        it('should return right state with incidents', () => {
            state = {
                requesting: true,
            };
            const incidents: IIncident[] = getFakeIncidents(3);

            expect(incidentsReducer(state, new IncidentsRequestSuccess(incidents))).toEqual({
                requesting: false,
                incidents,
            });
        });
    });

    describe('IncidentsRequestFail', () => {
        it('should return state with error', () => {
            state = {
                requesting: true,
            };
            const error = createHttpError(400, 'BadRequest');

            expect(incidentsReducer(state, new IncidentsRequestFail(error))).toEqual({
                requesting: false,
                error,
            });
        });

        it('should work without error', () => {
            state = {
                requesting: true,
            };
            // @ts-ignore
            const error: object = undefined;

            expect(incidentsReducer(state, new IncidentsRequestFail(error))).toEqual({
                requesting: false,
            });
        });
    });
});
