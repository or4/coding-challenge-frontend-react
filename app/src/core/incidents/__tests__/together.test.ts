import { AxiosInstance } from 'axios';
import moxios from 'moxios';
import createSagaMiddleware from 'redux-saga';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';

import { api } from 'core/api';
import { reducers, AppState } from 'core/reducers';
import { sagas } from 'core/sagas';
import { actionToPlainObject } from 'core/store';
import { applyActions } from 'core/utils/applyActions';
import { moxiosWait } from 'core/utils/moxiosWait';
import { IIncident, IIncidentRequestOptions } from 'types';

import {
    IncidentsRequestSuccess,
    IncidentsRequest,
    IncidentsRequestFail,
    defaultIncidentRequestOptions,
} from '../actions';
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
        let state: AppState;
        let store: MockStoreEnhanced<unknown, {}>;

        beforeEach(() => {
            state = { incidents: {} };
            store = mockStore(state);
            sagaMiddleware.run(sagas);
        });

        it('should work correctly with empty incidents and empty options', async done => {
            const incidents: IIncident[] = [];

            const options: IIncidentRequestOptions = { page: 1 };
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
                },
            });

            done();
        });

        it('should work correctly with a few incidents', async done => {
            const action = new IncidentsRequest(defaultIncidentRequestOptions);
            const incidents: IIncident[] = getFakeIncidents(3);

            store.dispatch(action);

            await moxiosWait();

            let request = moxios.requests.mostRecent();
            await request.respondWith({ status: 200, response: { incidents } });

            const actions = store.getActions();
            const incidentsExpected = transform(incidents);

            expect(actions).toEqual([
                new IncidentsRequest(defaultIncidentRequestOptions),
                new IncidentsRequestSuccess(incidentsExpected),
            ]);

            const localState = applyActions(reducers, state, actions);

            expect(localState).toEqual({
                incidents: {
                    incidents: incidentsExpected,
                    requesting: false,
                },
            });

            done();
        });

        it('should not work with error', async done => {
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

            done();
        });
    });
});
