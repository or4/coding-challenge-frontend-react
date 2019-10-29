import { IncidentsRequest } from '../actions';
import { IIncidentRequestOptions } from 'types';

describe('Check Incident actions', () => {
    describe('IncidentsRequest', () => {
        it('should return action list of bikes', () => {
            const options: IIncidentRequestOptions = {};

            expect(new IncidentsRequest(options)).toEqual({
                options: {},
                type: 'Incidents/incidents request',
            });
        });

        it('should return action thefts in Berlin', () => {
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

        it('should return action with incidentType', () => {
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

        it('should return action with proximity and proximitySquare', () => {
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
