import { IIncidentRequestOptions } from 'types';

import { IncidentsRequest, IncidentsRequestSuccess } from '../actions';

describe('Check Incident actions', () => {
    describe('IncidentsRequest', () => {
        it('should create action for all cases', () => {
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

            expect(new IncidentsRequest(options)).toEqual({
                options: {
                    incidentType: 'theft',
                    proximity: 'Berlin',
                    proximitySquare: 100,
                },
                type: 'Incidents/incidents request',
            });
        });

        it('should create action with incidentType option', () => {
            const options: IIncidentRequestOptions = {
                incidentType: 'theft',
            };

            expect(new IncidentsRequest(options)).toEqual({
                options: {
                    incidentType: 'theft',
                },
                type: 'Incidents/incidents request',
            });
        });

        it('should create action with proximity and proximitySquare options', () => {
            const options: IIncidentRequestOptions = {
                proximity: 'Berlin',
                proximitySquare: 100,
            };

            expect(new IncidentsRequest(options)).toEqual({
                options: {
                    proximity: 'Berlin',
                    proximitySquare: 100,
                },
                type: 'Incidents/incidents request',
            });
        });
    });

    describe('IncidentsRequestSuccess', () => {
        it('should return action of empty incidents list', () => {
            expect(new IncidentsRequestSuccess([])).toEqual({
                type: 'Incidents/incidents request success',
                incidents: [],
            });
        });

        it('should return action with one incident', () => {
            expect(new IncidentsRequestSuccess([{ id: 1 }])).toEqual({
                type: 'Incidents/incidents request success',
                incidents: [{ id: 1 }],
            });
        });

        it('should return action with three incidents', () => {
            expect(new IncidentsRequestSuccess([{ id: 1 }, { id: 2 }, { id: 3 }])).toEqual({
                type: 'Incidents/incidents request success',
                incidents: [{ id: 1 }, { id: 2 }, { id: 3 }],
            });
        });
    });
});
