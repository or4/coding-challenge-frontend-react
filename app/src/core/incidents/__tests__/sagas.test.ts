import { isFunction } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { api } from 'core/api';
import { IIncidentRequestOptions, IIncident } from 'types';

import { incidents as incidentsSaga } from '../sagas';
import { IncidentsRequest, IncidentsRequestSuccess } from '../actions';

describe('Check saga for IncidentsRequest', () => {
    it('should exists', () => {
        expect(isFunction(incidentsSaga)).toBe(true);
    });

    it('should proccess api call', () => {
        const action = new IncidentsRequest({});
        const generator = cloneableGenerator(incidentsSaga)(action);

        expect(generator.next().value).toEqual(call(api.get, 'incidents', {}));
    });

    it('should return success action with empty data', () => {
        const action = new IncidentsRequest({});
        const generator = cloneableGenerator(incidentsSaga)(action);

        expect(generator.next().value).toEqual(call(api.get, 'incidents', {}));

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

        expect(generator.next().value).toEqual(call(api.get, 'incidents', options));

        const incidents: IIncident[] = [];
        const response = { data: { incidents }, status: 200 };
        // @ts-ignore
        expect(generator.next(response).value).toEqual(put(new IncidentsRequestSuccess(incidents)));
        expect(generator.next().done).toEqual(true);
    });

    it('should return success action with not empty incidents', () => {
        const options: IIncidentRequestOptions = {
            incidentType: 'theft',
            proximity: 'Berlin',
            proximitySquare: 100,
        };
        const action = new IncidentsRequest(options);
        const generator = cloneableGenerator(incidentsSaga)(action);

        expect(generator.next().value).toEqual(call(api.get, 'incidents', options));

        const incidents: IIncident[] = [{ id: 1 }, { id: 2 }, { id: 3 }];
        const response = { data: { incidents }, status: 200 };
        // @ts-ignore
        expect(generator.next(response).value).toEqual(put(new IncidentsRequestSuccess(incidents)));
        expect(generator.next().done).toEqual(true);
    });
});
