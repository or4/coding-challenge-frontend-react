import createHttpError from 'http-errors';
import { IIncidentsRequestOptions, IIncident } from 'types';

import {
    IncidentsRequest,
    IncidentsRequestSuccess,
    IncidentsRequestFail,
    IncidentsCountRequest,
    IncidentsCountRequestSuccess,
} from '../actions';
import { defaultOptions } from '../contstants';
import { getFakeIncidents } from '../__mocks__/fakeIncidents';

describe('Check Incident actions', () => {
    describe('IncidentsRequest', () => {
        it('should create action with empty options', () => {
            const options: IIncidentsRequestOptions = {
                page: 1,
            };

            expect(new IncidentsRequest(options)).toEqual({
                options,
                type: 'Incidents/incidents request',
            });
        });

        it('should create action for thefts in Berlin', () => {
            const options: IIncidentsRequestOptions = {
                incidentType: 'theft',
                proximity: 'Berlin',
                proximitySquare: 100,
                page: 1,
            };

            expect(new IncidentsRequest(options)).toEqual({ type: 'Incidents/incidents request', options });
        });

        it('should create action with incidentType option', () => {
            const options: IIncidentsRequestOptions = {
                incidentType: 'theft',
                page: 1,
            };

            expect(new IncidentsRequest(options)).toEqual({ type: 'Incidents/incidents request', options });
        });

        it('should create action with proximity and proximitySquare options', () => {
            const options: IIncidentsRequestOptions = {
                proximity: 'Berlin',
                proximitySquare: 100,
                page: 1,
            };

            expect(new IncidentsRequest(options)).toEqual({ type: 'Incidents/incidents request', options });
        });
    });

    describe('defaultOptions', () => {
        it('should match object', () => {
            expect(defaultOptions).toEqual({
                incidentType: 'theft',
                proximity: 'Berlin',
                proximitySquare: 50,
                perPage: 10,
                page: 1,
            });
        });
    });

    describe('IncidentsRequestSuccess', () => {
        it('should return action with empty incidents list', () => {
            const page = 1;
            const incidents: IIncident[] = [];

            expect(new IncidentsRequestSuccess(incidents)).toEqual({
                type: 'Incidents/incidents request success',
                incidents,
                options: { page },
            });
        });

        it('should return action with one incident', () => {
            const page = 1;
            const incidents = getFakeIncidents(1);

            expect(new IncidentsRequestSuccess(incidents)).toEqual({
                type: 'Incidents/incidents request success',
                incidents,
                options: { page },
            });
        });

        it('should return action with three incidents', () => {
            const page = 1;
            const incidents = getFakeIncidents(3);

            expect(new IncidentsRequestSuccess(incidents)).toEqual({
                type: 'Incidents/incidents request success',
                incidents,
                options: { page },
            });
        });

        it('should return correct action where current page is not defined', () => {
            const page = 1;
            const incidents: IIncident[] = [];

            expect(new IncidentsRequestSuccess(incidents)).toEqual({
                type: 'Incidents/incidents request success',
                incidents,
                options: { page },
            });
        });

        it('should return correct action where current page is 3', () => {
            const page = 3;
            const incidents: IIncident[] = [];

            expect(new IncidentsRequestSuccess(incidents, { page })).toEqual({
                type: 'Incidents/incidents request success',
                incidents,
                options: { page },
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

    describe('IncidentsCountRequest', () => {
        it('should match object', () => {
            const options = {};

            expect(new IncidentsCountRequest(options)).toEqual({
                type: 'Incidents/incidents count request',
                options,
            });
        });
    });

    describe('IncidentsCountRequestSuccess', () => {
        it('should match object', () => {
            const countIncidents = 100;

            expect(new IncidentsCountRequestSuccess(countIncidents)).toEqual({
                type: 'Incidents/incidents count request success',
                countIncidents,
            });
        });
    });
});
