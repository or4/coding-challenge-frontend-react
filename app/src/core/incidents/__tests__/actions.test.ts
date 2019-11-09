import createHttpError from 'http-errors';
import { IIncidentRequestOptions } from 'types';

import { IncidentsRequest, IncidentsRequestSuccess, IncidentsRequestFail } from '../actions';
import { getFakeIncidents } from '../__mocks__/fakeIncidents';

describe('Check Incident actions', () => {
    describe('IncidentsRequest', () => {
        it('should create action with empty options', () => {
            const options: IIncidentRequestOptions = {};

            expect(new IncidentsRequest(options)).toEqual({
                options: {},
                type: 'Incidents/incidents request',
            });
        });

        it('should create action for thefts in Berlin', () => {
            const options: IIncidentRequestOptions = {
                incidentType: 'theft',
                proximity: 'Berlin',
                proximitySquare: 100,
            };

            expect(new IncidentsRequest(options)).toEqual({ type: 'Incidents/incidents request', options });
        });

        it('should create action with incidentType option', () => {
            const options: IIncidentRequestOptions = {
                incidentType: 'theft',
            };

            expect(new IncidentsRequest(options)).toEqual({ type: 'Incidents/incidents request', options });
        });

        it('should create action with proximity and proximitySquare options', () => {
            const options: IIncidentRequestOptions = {
                proximity: 'Berlin',
                proximitySquare: 100,
            };

            expect(new IncidentsRequest(options)).toEqual({ type: 'Incidents/incidents request', options });
        });
    });

    describe('IncidentsRequestSuccess', () => {
        it('should return action with empty incidents list', () => {
            expect(new IncidentsRequestSuccess([])).toEqual({
                type: 'Incidents/incidents request success',
                incidents: [],
            });
        });

        it('should return action with one incident', () => {
            const incidents = getFakeIncidents(1);

            expect(new IncidentsRequestSuccess(incidents)).toEqual({
                type: 'Incidents/incidents request success',
                incidents,
            });
        });

        it('should return action with three incidents', () => {
            const incidents = getFakeIncidents(3);

            expect(new IncidentsRequestSuccess(incidents)).toEqual({
                type: 'Incidents/incidents request success',
                incidents,
            });
        });
    });

    describe('IncidentsRequestFail', () => {
        it('should return action with 400 error', () => {
            const error = createHttpError(400, 'Bad request');

            expect(new IncidentsRequestFail(error)).toEqual({ type: 'Incidents/incidents request fail', error });
        });

        it('should return action with empty error', () => {
            // @ts-ignore
            const error: object = undefined;

            expect(new IncidentsRequestFail(error)).toEqual({ type: 'Incidents/incidents request fail', error });
        });
    });
});
