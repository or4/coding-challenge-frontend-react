import { reducers, ApplicationState } from 'core/reducers';
import { IncidentsRequest } from 'core/incidents/actions';
import { IIncidentRequestOptions } from 'types';

import { store } from '../store';

describe('Redux App', () => {
    // @ts-ignore
    const initAppState: ApplicationState = {};

    describe('common cases', () => {
        it('should return initial app state', () => {
            expect(store.getState()).toEqual({
                incidents: {
                    requesting: false,
                },
            });
        });

        it('should return initial app state when action not defined', () => {
            // @ts-ignore
            expect(reducers(initAppState, undefined)).toEqual({
                incidents: {
                    requesting: false,
                },
            });
        });

        it('should return initial app state when action is empty object', () => {
            // @ts-ignore
            expect(reducers(initAppState, {})).toEqual({
                incidents: {
                    requesting: false,
                },
            });
        });
    });

    describe('IncidentsRequest', () => {
        it('should return app state when call IncidentsRequest action', () => {
            expect(reducers(initAppState, new IncidentsRequest({}))).toEqual({
                incidents: {
                    requesting: true,
                },
            });
        });

        it('should return app state when call IncidentsRequest action with options', () => {
            const options: IIncidentRequestOptions = {
                incidentType: 'theft',
                proximity: 'Berlin',
                proximitySquare: 100,
            };

            expect(reducers(initAppState, new IncidentsRequest(options))).toEqual({
                incidents: {
                    requesting: true,
                },
            });
        });
    });
});
