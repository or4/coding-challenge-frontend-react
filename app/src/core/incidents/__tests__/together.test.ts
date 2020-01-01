import { AxiosInstance } from 'axios';
import moxios from 'moxios';
import createSagaMiddleware from 'redux-saga';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';

import { api } from 'core/api';
import { reducers, IAppState } from 'core/reducers';
import { sagas } from 'core/sagas';
import { actionToPlainObject } from 'core/store';
import { applyActions } from 'core/utils/applyActions';
import { moxiosWait } from 'core/utils/moxiosWait';
import { IIncident, IIncidentRequestOptions } from 'types';

import { IncidentsRequestSuccess, IncidentsRequest, IncidentsRequestFail } from '../actions';
import { defaultOptions, MAX_INCIDENTS_COUNT } from '../contstants';
import { getFakeIncidents } from '../__mocks__/fakeIncidents';
import { transform } from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, actionToPlainObject];
const mockStore = configureMockStore(middlewares);

describe('Incidents redux tests', () => {
    beforeEach(function() {
        moxios.install(api.axiosInstance as AxiosInstance);
    });

    afterEach(function() {
        moxios.uninstall(api.axiosInstance as AxiosInstance);
    });

    describe('Check InicdentsRequest', () => {
        let state: IAppState;
        let store: MockStoreEnhanced<unknown, {}>;

        beforeEach(() => {
            state = { incidents: {} };
            store = mockStore(state);
            sagaMiddleware.run(sagas);
        });

        it('should work correctly with empty incidents and empty options', async () => {
            const incidents: IIncident[] = [];
            const currentPage = 1;

            const options: IIncidentRequestOptions = { page: currentPage };
            store.dispatch(new IncidentsRequest(options));

            await moxiosWait();

            let request = moxios.requests.mostRecent();
            await request.respondWith({ status: 200, response: { status: 200, incidents } });

            const actions = store.getActions();
            const incidentsExpected = transform(incidents);

            expect(actions).toEqual([new IncidentsRequest(options), new IncidentsRequestSuccess(incidentsExpected)]);

            const localState = applyActions(reducers, state, actions);

            expect(localState).toEqual({
                incidents: {
                    incidents: incidentsExpected,
                    requesting: false,
                    currentPage,
                },
            });
        });

        it('should work correctly with a few incidents', async () => {
            const action = new IncidentsRequest(defaultOptions);
            const incidents: IIncident[] = getFakeIncidents(3);
            const currentPage = 1;

            store.dispatch(action);

            await moxiosWait();

            let request = moxios.requests.mostRecent();
            await request.respondWith({ status: 200, response: { incidents } });

            const actions = store.getActions();
            const incidentsExpected = transform(incidents);

            expect(actions).toEqual([
                new IncidentsRequest(defaultOptions),
                new IncidentsRequestSuccess(incidentsExpected, { page: currentPage, perPage: 10 }),
            ]);

            const localState = applyActions(reducers, state, actions);

            expect(localState).toEqual({
                incidents: {
                    incidents: incidentsExpected,
                    requesting: false,
                    currentPage,
                },
            });
        });

        it('should return state where currentPage is 3', async () => {
            const incidents: IIncident[] = [];
            const currentPage = 3;

            const options: IIncidentRequestOptions = { page: currentPage };
            store.dispatch(new IncidentsRequest(options));

            await moxiosWait();

            let request = moxios.requests.mostRecent();
            await request.respondWith({ status: 200, response: { status: 200, incidents } });

            const actions = store.getActions();
            const incidentsExpected = transform(incidents);

            expect(actions).toEqual([
                new IncidentsRequest(options),
                new IncidentsRequestSuccess(incidentsExpected, { page: currentPage }),
            ]);

            const localState = applyActions(reducers, state, actions);

            expect(localState).toEqual({
                incidents: {
                    incidents: incidentsExpected,
                    requesting: false,
                    currentPage,
                },
            });
        });

        it('should return state with totalIncidents', async () => {
            const totalIncidents = 74;
            const incidents: IIncident[] = getFakeIncidents(totalIncidents);
            const currentPage = 1;

            const options: IIncidentRequestOptions = {
                incidentType: 'theft',
                proximity: 'Berlin',
                proximitySquare: 50,
                page: currentPage,
                perPage: MAX_INCIDENTS_COUNT,
            };
            store.dispatch(new IncidentsRequest(options));

            await moxiosWait();

            let request = moxios.requests.mostRecent();
            await request.respondWith({ status: 200, response: { status: 200, incidents } });

            const actions = store.getActions();
            const incidentsExpected = transform(incidents);

            expect(actions).toEqual([
                new IncidentsRequest(options),
                new IncidentsRequestSuccess(incidentsExpected, { page: currentPage, perPage: MAX_INCIDENTS_COUNT }),
            ]);

            const localState = applyActions(reducers, state, actions);

            expect(localState).toEqual({
                incidents: {
                    totalIncidents,
                },
            });
        });

        it('should changePage', async () => {
            const totalIncidents = 74;
            const incidents: IIncident[] = getFakeIncidents(totalIncidents);
            const newPage = 2;

            const options: IIncidentRequestOptions = {
                incidentType: 'theft',
                proximity: 'Berlin',
                proximitySquare: 50,
                page: newPage,
                perPage: 10,
            };
            store.dispatch(new IncidentsRequest(options));

            await moxiosWait();

            let request = moxios.requests.mostRecent();
            await request.respondWith({ status: 200, response: { status: 200, incidents } });

            const actions = store.getActions();
            const incidentsExpected = transform(incidents);

            expect(actions).toEqual([
                new IncidentsRequest(options),
                new IncidentsRequestSuccess(incidentsExpected, { page: newPage, perPage: 10 }),
            ]);

            const localState = applyActions(reducers, state, actions);

            expect(localState).toEqual({
                incidents: {
                    incidents: incidentsExpected,
                    requesting: false,
                    currentPage: newPage,
                },
            });
        });

        it('should not work with error', async () => {
            const options: IIncidentRequestOptions = {
                proximity: 'unexpected_proximity',
                page: 1,
            };
            const action = new IncidentsRequest(options);
            store.dispatch(action);

            await moxiosWait();

            let request = moxios.requests.mostRecent();
            await request.respondWith({ status: 400, responseText: 'Request failed with status code 400' });

            const actions = store.getActions();
            expect(actions).toEqual([
                new IncidentsRequest(options),
                new IncidentsRequestFail({ status: 400, data: 'Request failed with status code 400' }),
            ]);

            const localState = applyActions(reducers, state, actions);

            expect(localState).toEqual({
                incidents: {
                    error: { data: 'Request failed with status code 400', status: 400 },
                    requesting: false,
                },
            });
        });
    });
});
