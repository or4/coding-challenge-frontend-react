import { IncidentsRequest } from '../actions';
import { IIncidentRequestOptions } from 'types';

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
});
