import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { isFunction } from 'lodash';

import { api } from 'core/api';
import { IIncidentsRequestOptions, IIncident } from 'types';

import { incidents as incidentsSaga, transform } from '../sagas';
import { IncidentsRequest, IncidentsRequestSuccess, IncidentsRequestFail } from '../actions';
import { getFakeIncidents } from '../__mocks__/fakeIncidents';
import { MAX_INCIDENTS_COUNT } from '../contstants';

describe('Check saga for IncidentsRequest', () => {
    const defaultOptions: IIncidentsRequestOptions = {
        incidentType: 'theft',
        proximity: 'Berlin',
        proximitySquare: 50,
        perPage: 10,
        page: 1,
    };

    describe('common', () => {
        it('should exists', () => {
            expect(isFunction(incidentsSaga)).toBe(true);
        });

        it('should proccess api call', () => {
            const options = {
                page: 1,
            };
            const action = new IncidentsRequest(options);
            const generator = cloneableGenerator(incidentsSaga)(action);

            expect(generator.next().value).toEqual(call(api.get, '/incidents', { ...defaultOptions, ...options }));
        });
    });

    describe('IncidentsRequestSuccess', () => {
        it('should return success action with empty data', () => {
            const options = {
                page: 1,
            };
            const action = new IncidentsRequest(options);
            const generator = cloneableGenerator(incidentsSaga)(action);

            expect(generator.next().value).toEqual(call(api.get, '/incidents', { ...defaultOptions, ...options }));

            const incidents: IIncident[] = [];
            const response = { data: { incidents }, status: 200 };
            // @ts-ignore
            expect(generator.next(response).value).toEqual(put(new IncidentsRequestSuccess(incidents)));
            expect(generator.next().done).toEqual(true);
        });

        it('should return success action with options', () => {
            const action = new IncidentsRequest(defaultOptions);
            const generator = cloneableGenerator(incidentsSaga)(action);

            expect(generator.next().value).toEqual(call(api.get, '/incidents', defaultOptions));

            const incidents: IIncident[] = [];
            const response = { data: { incidents }, status: 200 };
            // @ts-ignore
            expect(generator.next(response).value).toEqual(
                put(new IncidentsRequestSuccess(transform(incidents), { page: 1, perPage: 10 }))
            );
            expect(generator.next().done).toEqual(true);
        });

        it('should return success action with incidents', () => {
            const action = new IncidentsRequest(defaultOptions);
            const generator = cloneableGenerator(incidentsSaga)(action);

            expect(generator.next().value).toEqual(call(api.get, '/incidents', defaultOptions));

            const incidents: IIncident[] = getFakeIncidents(3);
            const response = { data: { incidents }, status: 200 };
            // @ts-ignore
            expect(generator.next(response).value).toEqual(
                put(new IncidentsRequestSuccess(transform(incidents), { page: 1, perPage: 10 }))
            );
            expect(generator.next().done).toEqual(true);
        });

        it('should return success action with incidents and only need fields', () => {
            const action = new IncidentsRequest(defaultOptions);
            const generator = cloneableGenerator(incidentsSaga)(action);

            expect(generator.next().value).toEqual(call(api.get, '/incidents', defaultOptions));

            const incidents: IIncident[] = getFakeIncidents(3);
            const response = { data: { incidents }, status: 200 };

            const expected = incidents.map(({ id, title, description, address, media, occurredAt }) => ({
                id,
                title,
                description,
                address,
                media,
                occurredAt,
            }));

            // @ts-ignore
            expect(generator.next(response).value).toEqual(
                put(new IncidentsRequestSuccess(expected, { page: 1, perPage: 10 }))
            );
            expect(generator.next().done).toEqual(true);
        });

        it('should return success action with page that equals 3', () => {
            const page = 3;
            const options = {
                page,
            };
            const action = new IncidentsRequest(options);
            const generator = cloneableGenerator(incidentsSaga)(action);

            expect(generator.next().value).toEqual(call(api.get, '/incidents', { ...defaultOptions, ...options }));

            const incidents: IIncident[] = [];
            const response = { data: { incidents }, status: 200 };
            // @ts-ignore
            expect(generator.next(response).value).toEqual(put(new IncidentsRequestSuccess(incidents, { page })));
            expect(generator.next().done).toEqual(true);
        });

        it('should return success action with perPage', () => {
            const page = 1;
            const options = {
                page,
                perPage: MAX_INCIDENTS_COUNT,
            };
            const action = new IncidentsRequest(options);
            const generator = cloneableGenerator(incidentsSaga)(action);

            expect(generator.next().value).toEqual(call(api.get, '/incidents', { ...defaultOptions, ...options }));

            const incidents: IIncident[] = [];
            const response = { data: { incidents }, status: 200 };
            // @ts-ignore
            expect(generator.next(response).value).toEqual(
                put(new IncidentsRequestSuccess(incidents, { page, perPage: MAX_INCIDENTS_COUNT }))
            );
            expect(generator.next().done).toEqual(true);
        });
    });

    describe('IncidentsRequestFail', () => {
        it('should return fail action when status is not 200', () => {
            const action = new IncidentsRequest(defaultOptions);
            const generator = cloneableGenerator(incidentsSaga)(action);

            expect(generator.next().value).toEqual(call(api.get, '/incidents', defaultOptions));

            const response = { data: { error: 'Bad request' }, status: 400 };
            // @ts-ignore
            expect(generator.next(response).value).toEqual(put(new IncidentsRequestFail(response)));
            expect(generator.next().done).toEqual(true);
        });
    });
});
