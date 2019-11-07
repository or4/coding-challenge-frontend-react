import { reducers, ApplicationState } from 'core/reducers';
import { IncidentsRequest, IncidentsRequestSuccess } from 'core/incidents/actions';
import { IIncidentRequestOptions } from 'types';

import { store } from '../store';
import { applyActions } from 'core/utils/applyActions';

describe('Redux App', () => {
    // @ts-ignore
    const initAppState: ApplicationState = {};

    describe('common cases', () => {
        it('should return initial app state', () => {
            expect(store.getState()).toEqual({
                incidents: {},
            });
        });

        it('should return initial app state when action not defined', () => {
            // @ts-ignore
            expect(reducers(initAppState, undefined)).toEqual({
                incidents: {},
            });
        });

        it('should return initial app state when action is empty object', () => {
            // @ts-ignore
            expect(reducers(initAppState, {})).toEqual({
                incidents: {},
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

    describe('IncidentsRequestSuccess', () => {
        it('should work after apply IncidentsRequest', () => {
            expect(reducers(initAppState, new IncidentsRequest({}))).toEqual({
                incidents: {
                    requesting: true,
                },
            });
        });

        it('should return app state when call IncidentsRequest action with options', () => {
            const state = applyActions(reducers, initAppState, [
                new IncidentsRequest({ incidentType: 'theft', proximity: 'Berlin', proximitySquare: 100 }),
                new IncidentsRequestSuccess([{ id: 1 }, { id: 2 }, { id: 3 }]),
            ]);

            expect(state).toEqual({
                incidents: {
                    requesting: false,
                    incidents: [{ id: 1 }, { id: 2 }, { id: 3 }],
                },
            });
        });
    });
});
