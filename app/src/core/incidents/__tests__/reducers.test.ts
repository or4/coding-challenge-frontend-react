import createHttpError from 'http-errors';
import { promisify } from 'util';
import { IIncidentRequestOptions, IIncident } from 'types';

import { incidentsReducer, IIncidentsState, selectTotalPages } from '../reducers';
import { IncidentsRequest, IncidentsRequestSuccess, IncidentsRequestFail } from '../actions';
import { defaultOptions, MAX_INCIDENTS_COUNT } from '../contstants';
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
            expect(incidentsReducer(state, new IncidentsRequest(defaultOptions))).toEqual({
                requesting: true,
            });
        });
    });

    describe('IncidentsRequestSuccess', () => {
        it('should return right state with empty incidents', () => {
            const currentPage = 1;
            state = {
                requesting: true,
            };
            const incidents: IIncident[] = [];

            expect(incidentsReducer(state, new IncidentsRequestSuccess(incidents))).toEqual({
                requesting: false,
                incidents: [],
                currentPage,
            });
        });

        it('should return right state with incidents', () => {
            const currentPage = 1;
            state = {
                requesting: true,
            };
            const incidents: IIncident[] = getFakeIncidents(3);

            expect(incidentsReducer(state, new IncidentsRequestSuccess(incidents))).toEqual({
                requesting: false,
                incidents,
                currentPage,
            });
        });

        it('should return right state when currentPage is not defined', () => {
            const currentPage = 1;
            state = {
                requesting: true,
            };
            const incidents: IIncident[] = [];

            expect(incidentsReducer(state, new IncidentsRequestSuccess(incidents))).toEqual({
                requesting: false,
                incidents: [],
                currentPage,
            });
        });

        it('should return state with currentPage equals 3', () => {
            const currentPage = 3;
            state = {
                requesting: true,
            };
            const incidents: IIncident[] = [];

            expect(incidentsReducer(state, new IncidentsRequestSuccess(incidents, { page: currentPage }))).toEqual({
                requesting: false,
                incidents: [],
                currentPage,
            });
        });

        it('should return state with totalIncidents', () => {
            state = {};
            const incidentsCount = 74;
            const incidents = getFakeIncidents(incidentsCount);
            const options = {
                perPage: MAX_INCIDENTS_COUNT,
            };

            expect(incidentsReducer(state, new IncidentsRequestSuccess(incidents, options))).toEqual({
                totalIncidents: incidentsCount,
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

    describe('selectTotalPages', () => {
        it('should return 0 totalPages for 0 incidents', () => {
            const state = {
                incidents: {
                    totalIncidents: 0,
                },
            };

            expect(selectTotalPages(state)).toEqual(0);
        });

        it('should return 1 totalPages for 1 incidents', () => {
            const state = {
                incidents: {
                    totalIncidents: 1,
                },
            };

            expect(selectTotalPages(state)).toEqual(1);
        });

        it('should return 1 totalPages for 9 incidents', () => {
            const state = {
                incidents: {
                    totalIncidents: 9,
                },
            };

            expect(selectTotalPages(state)).toEqual(1);
        });

        it('should return 2 totalPages for 11 incidents', () => {
            const state = {
                incidents: {
                    totalIncidents: 11,
                },
            };

            expect(selectTotalPages(state)).toEqual(2);
        });
    });
});
