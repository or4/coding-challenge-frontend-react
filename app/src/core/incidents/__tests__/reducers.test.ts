import createHttpError from 'http-errors';
import { promisify } from 'util';
import { IIncidentsRequestOptions, IIncident } from 'types';

import { incidentsReducer, IIncidentsState, selectTotalPages } from '../reducers';
import {
    IncidentsRequest,
    IncidentsRequestSuccess,
    IncidentsRequestFail,
    IncidentsCountRequest,
    IncidentsCountRequestSuccess,
} from '../actions';
import { defaultOptions } from '../contstants';
import { getFakeIncidents } from '../__mocks__/fakeIncidents';

describe('Incidents reducer', () => {
    let state: IIncidentsState | undefined;
    const initialState: IIncidentsState = { requestOptions: {} };

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
            const options: IIncidentsRequestOptions = {
                page: 1,
            };
            expect(incidentsReducer(state, new IncidentsRequest(options))).toEqual({
                ...initialState,
                requesting: true,
            });
        });

        it('should return right state action with options', () => {
            expect(incidentsReducer(state, new IncidentsRequest(defaultOptions))).toEqual({
                ...initialState,
                requesting: true,
            });
        });
    });

    describe('IncidentsRequestSuccess', () => {
        it('should return right state with empty incidents', () => {
            state = {
                ...initialState,
                requesting: true,
            };
            const page = 1;
            const incidents: IIncident[] = [];

            expect(incidentsReducer(state, new IncidentsRequestSuccess(incidents))).toEqual({
                ...state,
                requesting: false,
                incidents: [],
                requestOptions: {
                    page,
                },
            });
        });

        it('should return right state with incidents', () => {
            state = {
                ...initialState,
                requesting: true,
            };
            const page = 1;
            const incidents: IIncident[] = getFakeIncidents(3);

            expect(incidentsReducer(state, new IncidentsRequestSuccess(incidents))).toEqual({
                ...state,
                requesting: false,
                incidents,
                requestOptions: {
                    page,
                },
            });
        });

        it('should return right state when currentPage is not defined', () => {
            state = {
                ...initialState,
                requesting: true,
            };
            const page = 1;
            const incidents: IIncident[] = [];

            expect(incidentsReducer(state, new IncidentsRequestSuccess(incidents))).toEqual({
                ...state,
                requesting: false,
                incidents: [],
                requestOptions: {
                    page,
                },
            });
        });

        it('should return state with currentPage equals 3', () => {
            state = {
                ...initialState,
                requesting: true,
            };
            const page = 3;
            const incidents: IIncident[] = [];

            expect(incidentsReducer(state, new IncidentsRequestSuccess(incidents, { page }))).toEqual({
                ...state,
                requesting: false,
                incidents: [],
                requestOptions: {
                    page,
                },
            });
        });
    });

    describe('IncidentsRequestFail', () => {
        it('should return state with error', () => {
            state = {
                ...initialState,
                requesting: true,
            };
            const error = createHttpError(400, 'BadRequest');

            expect(incidentsReducer(state, new IncidentsRequestFail(error))).toEqual({
                ...state,
                requesting: false,
                error,
            });
        });

        it('should work without error', () => {
            state = {
                ...initialState,
                requesting: true,
            };
            // @ts-ignore
            const error: object = undefined;

            expect(incidentsReducer(state, new IncidentsRequestFail(error))).toEqual({
                ...state,
                requesting: false,
            });
        });
    });

    describe('IncidentsCountRequest', () => {
        it('should return state without changes', () => {
            const options = {};
            expect(incidentsReducer(state, new IncidentsCountRequest(options))).toEqual(state);
        });
    });

    describe('IncidentsCountRequestSuccess', () => {
        it('should return right state with empty incidents', () => {
            state = {
                ...initialState,
            };
            const incidents: IIncident[] = [];

            expect(incidentsReducer(state, new IncidentsCountRequestSuccess(incidents.length))).toEqual({
                ...state,
                totalIncidents: incidents.length,
            });
        });

        it('should return right state with incidents', () => {
            state = {
                ...initialState,
            };
            const incidents: IIncident[] = getFakeIncidents(31);

            expect(incidentsReducer(state, new IncidentsCountRequestSuccess(incidents.length))).toEqual({
                ...state,
                totalIncidents: incidents.length,
            });
        });
    });

    describe('selectTotalPages', () => {
        it('should return 0 totalPages for 0 incidents', () => {
            const state = {
                incidents: {
                    ...initialState,
                    totalIncidents: 0,
                },
            };

            expect(selectTotalPages(state)).toEqual(0);
        });

        it('should return 1 totalPages for 1 incidents', () => {
            const state = {
                incidents: {
                    ...initialState,
                    totalIncidents: 1,
                },
            };

            expect(selectTotalPages(state)).toEqual(1);
        });

        it('should return 1 totalPages for 9 incidents', () => {
            const state = {
                incidents: {
                    ...initialState,
                    totalIncidents: 9,
                },
            };

            expect(selectTotalPages(state)).toEqual(1);
        });

        it('should return 2 totalPages for 11 incidents', () => {
            const state = {
                incidents: {
                    ...initialState,
                    totalIncidents: 11,
                },
            };

            expect(selectTotalPages(state)).toEqual(2);
        });
    });
});
