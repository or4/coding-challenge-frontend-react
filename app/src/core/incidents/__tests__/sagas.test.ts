import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { isFunction } from 'lodash';

import { api } from 'core/api';
import { IIncidentRequestOptions, IIncident } from 'types';

import { incidents as incidentsSaga } from '../sagas';
import { IncidentsRequest, IncidentsRequestSuccess, IncidentsRequestFail } from '../actions';
import { getFakeIncidents } from '../__mocks__/fakeIncidents';

describe('Check saga for IncidentsRequest', () => {
    it('should exists', () => {
        expect(isFunction(incidentsSaga)).toBe(true);
    });

    it('should proccess api call', () => {
        const emptyOptions = {};
        const action = new IncidentsRequest(emptyOptions);
        const generator = cloneableGenerator(incidentsSaga)(action);

        expect(generator.next().value).toEqual(call(api.get, '/incidents', {}));
    });

    it('should return success action with empty data', () => {
        const emptyOptions = {};
        const action = new IncidentsRequest(emptyOptions);
        const generator = cloneableGenerator(incidentsSaga)(action);

        expect(generator.next().value).toEqual(call(api.get, '/incidents', emptyOptions));

        const incidents: IIncident[] = [];
        const response = { data: { incidents }, status: 200 };
        // @ts-ignore
        expect(generator.next(response).value).toEqual(put(new IncidentsRequestSuccess(incidents)));
        expect(generator.next().done).toEqual(true);
    });

    it('should return success action with options', () => {
        const options: IIncidentRequestOptions = {
            incidentType: 'theft',
            proximity: 'Berlin',
            proximitySquare: 100,
        };
        const action = new IncidentsRequest(options);
        const generator = cloneableGenerator(incidentsSaga)(action);

        expect(generator.next().value).toEqual(call(api.get, '/incidents', options));

        const incidents: IIncident[] = [];
        const response = { data: { incidents }, status: 200 };
        // @ts-ignore
        expect(generator.next(response).value).toEqual(put(new IncidentsRequestSuccess(incidents)));
        expect(generator.next().done).toEqual(true);
    });

    it('should return success action with incidents', () => {
        const options: IIncidentRequestOptions = {
            incidentType: 'theft',
            proximity: 'Berlin',
            proximitySquare: 100,
        };
        const action = new IncidentsRequest(options);
        const generator = cloneableGenerator(incidentsSaga)(action);

        expect(generator.next().value).toEqual(call(api.get, '/incidents', options));

        const incidents: IIncident[] = getFakeIncidents(3);
        const response = { data: { incidents }, status: 200 };
        // @ts-ignore
        expect(generator.next(response).value).toEqual(put(new IncidentsRequestSuccess(incidents)));
        expect(generator.next().done).toEqual(true);
    });

    it('should return fail action when status is not 200', () => {
        const options: IIncidentRequestOptions = {
            incidentType: 'theft',
            proximity: 'Berlin',
            proximitySquare: 100,
        };
        const action = new IncidentsRequest(options);
        const generator = cloneableGenerator(incidentsSaga)(action);

        expect(generator.next().value).toEqual(call(api.get, '/incidents', options));

        const response = { data: { error: 'Bad request' }, status: 400 };
        // @ts-ignore
        expect(generator.next(response).value).toEqual(put(new IncidentsRequestFail(response)));
        expect(generator.next().done).toEqual(true);
    });
});
