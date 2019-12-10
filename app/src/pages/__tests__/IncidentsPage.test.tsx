import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { AxiosInstance } from 'axios';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';

import { Error } from 'components/common/Error';
import { Loading } from 'components/common/Loading';
import { api } from 'core/api';
import { moxiosWait } from 'core/utils/moxiosWait';
import { getFakeIncidents } from 'core/incidents/__mocks__/fakeIncidents';
import { ConnectedIncidentsPage } from 'pages/IncidentsPage';
import { IIncident } from 'types';

import { AppWithStore } from 'App';

describe('IncidentsPage', () => {
    describe('Check componennt with real store', () => {
        let root: HTMLDivElement;

        beforeEach(() => {
            moxios.install(api.axiosInstance as AxiosInstance);

            root = document.createElement('div');
            document.body.appendChild(root);
        });

        afterEach(() => {
            moxios.uninstall(api.axiosInstance as AxiosInstance);

            if (root) {
                document.body.removeChild(root);
            }
        });

        it('should render inicidents-list container', () => {
            act(() => {
                ReactDOM.render(<AppWithStore />, root);

                const container = root.querySelectorAll('[data-test-id="inicidents-list"]');
                expect(container.length === 1).toBe(true);
                jest.resetAllMocks();
            });
        });

        it('should render list of incidents where count more than zero', async done => {
            act(() => {
                ReactDOM.render(<AppWithStore />, root);
            });

            const incidents: IIncident[] = getFakeIncidents(3);

            await moxiosWait();

            let request = moxios.requests.mostRecent();
            await request.respondWith({ status: 200, response: { status: 200, incidents } });

            const container = root.querySelectorAll('[data-test-id="inicidents-list__item"]');
            expect(container).toHaveLength(3);

            jest.resetAllMocks();
            done();
        });

        it('should render loading', async done => {
            act(() => {
                ReactDOM.render(<AppWithStore />, root);
            });

            const incidents: IIncident[] = getFakeIncidents(3);

            await moxiosWait();

            const loadingContainer = root.querySelectorAll('[data-test-id="loading"]');
            expect(loadingContainer).toHaveLength(1);

            let request = moxios.requests.mostRecent();
            await request.respondWith({ status: 200, response: { status: 200, incidents } });

            const itemsContainer = root.querySelectorAll('[data-test-id="inicidents-list__item"]');
            expect(itemsContainer).toHaveLength(3);

            jest.resetAllMocks();
            done();
        });

        it('should render error', async done => {
            act(() => {
                ReactDOM.render(<AppWithStore />, root);
            });

            await moxiosWait();

            const loadingContainer = root.querySelectorAll('[data-test-id="loading"]');
            expect(loadingContainer).toHaveLength(1);

            let request = moxios.requests.mostRecent();
            await request.respondWith({
                status: 400,
                response: {
                    status: 400,
                    data: { error: 'incident_type does not have a valid value' },
                },
            });

            const errorContainer = root.querySelectorAll('[data-test-id="error"]');
            expect(errorContainer).toHaveLength(1);

            jest.resetAllMocks();
            done();
        });
    });

    describe('Check connected component', () => {
        it('should render loading', () => {
            const initialState = { incidents: { incidents: [], requesting: true } };
            const mockStore = configureMockStore();
            const store = mockStore(initialState);

            const container = mount(
                <Provider store={store}>
                    <ConnectedIncidentsPage />
                </Provider>
            );

            const wrapper = container.find(Loading);

            expect(wrapper).toHaveLength(1);
            expect(wrapper.text()).toEqual('Loading ...');
        });

        it('should not render loading', () => {
            const initialState = { incidents: { incidents: [], requesting: false } };
            const mockStore = configureMockStore();
            const store = mockStore(initialState);

            const container = mount(
                <Provider store={store}>
                    <ConnectedIncidentsPage />
                </Provider>
            );

            const wrapper = container.find(Loading);

            expect(wrapper.find(Loading)).toHaveLength(0);
        });

        it('should render error', () => {
            const initialState = {
                incidents: {
                    incidents: [],
                    requesting: false,
                    error: {
                        status: 400,
                        data: { error: 'incident_type does not have a valid value' },
                    },
                },
            };
            const mockStore = configureMockStore();
            const store = mockStore(initialState);

            const container = mount(
                <Provider store={store}>
                    <ConnectedIncidentsPage />
                </Provider>
            );

            const wrapper = container.find(Error);

            expect(wrapper).toHaveLength(1);
            expect(wrapper.text()).toEqual('Ooops, something went wrong');
        });
    });
});
