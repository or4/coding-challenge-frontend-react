import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { AxiosInstance } from 'axios';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';

import { AppWithStore } from 'App';
import { Error } from 'components/common/Error';
import { Loading } from 'components/common/Loading';
import { EmptyResults } from 'components/incidents/EmptyResults';
import { Pagination } from 'components/incidents/Pagination';
import { Button } from 'components/incidents/Pagination/style';
import { SearchIncidents } from 'components/incidents/SearchIncidents';
import { TotalIncidents } from 'components/incidents/TotalIncidents';
import { api } from 'core/api';
import { moxiosWait } from 'core/utils/moxiosWait';
import { getFakeIncidents } from 'core/incidents/__mocks__/fakeIncidents';
import { IIncident } from 'types';

import { ConnectedIncidentsPage, IncidentsPage } from '../IncidentsPage';
import { UpperPanel } from 'components/incidents/UpperPanel';

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

                const container = root.querySelectorAll('[data-test-id="incidents-list"]');
                expect(container.length === 1).toBe(true);
                jest.resetAllMocks();
            });
        });

        it('should render list of incidents where count more than zero', async done => {
            act(() => {
                ReactDOM.render(<AppWithStore />, root);
            });

            await moxiosWait();

            const incidents: IIncident[] = getFakeIncidents(3);
            let request = moxios.requests.at(0);
            await request.respondWith({ status: 200, response: { status: 200, incidents } });

            const incidentsMaxCount: IIncident[] = getFakeIncidents(74);
            request = moxios.requests.at(1);
            await request.respondWith({ status: 200, response: { status: 200, incidents: incidentsMaxCount } });

            const container = root.querySelectorAll('[data-test-id="incident"]');
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

            let request = moxios.requests.at(0);
            await request.respondWith({ status: 200, response: { status: 200, incidents } });

            const itemsContainer = root.querySelectorAll('[data-test-id="incident"]');
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
        describe('Loading', () => {
            it('should render', () => {
                const initialState = { incidents: { incidents: [], requestOptions: {}, requesting: true } };
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

            it('should not render', () => {
                const initialState = { incidents: { incidents: [], requestOptions: {}, requesting: false } };
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
        });

        describe('Error', () => {
            it('should render', () => {
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

        describe('Paging', () => {
            it('should render', () => {
                const incidents: IIncident[] = getFakeIncidents(3);
                const initialState = {
                    incidents: { incidents, requesting: false, requestOptions: { page: 1 }, totalIncidents: 1 },
                };
                const mockStore = configureMockStore();
                const store = mockStore(initialState);

                const container = mount(
                    <Provider store={store}>
                        <ConnectedIncidentsPage />
                    </Provider>
                );

                const wrapper = container.find(Pagination);

                expect(wrapper).toHaveLength(1);
                expect(wrapper.text()).toEqual('1');
            });

            it('should not render', () => {
                const incidents: IIncident[] = getFakeIncidents(3);
                const initialState = { incidents: { incidents, requesting: false, requestOptions: {} } };
                const mockStore = configureMockStore();
                const store = mockStore(initialState);

                const container = mount(
                    <Provider store={store}>
                        <ConnectedIncidentsPage />
                    </Provider>
                );

                const wrapper = container.find(Pagination);

                expect(wrapper).toHaveLength(1);
                expect(wrapper.text()).toEqual(null);
            });

            it('should change page when click page button', () => {
                const page = 2;
                const incidents: IIncident[] = getFakeIncidents(3);
                const changePage = jest.fn();
                const container = mount(
                    <IncidentsPage
                        incidents={incidents}
                        requestOptions={{ page: 1 }}
                        totalPages={2}
                        changePage={changePage}
                    />
                );

                const wrapper = container.find(Pagination);
                expect(wrapper).toHaveLength(1);

                const buttons = wrapper.find(Button);

                const button = buttons.at(1);

                expect(button.text()).toEqual(String(page));
                button.simulate('click');
                expect(changePage).toHaveBeenCalledTimes(1);
                expect(changePage).toHaveBeenCalledWith({ page });
            });
        });

        describe('EmptyState', () => {
            it('should render empty state', () => {
                const incidents: IIncident[] = [];
                const wrapper = mount(
                    <IncidentsPage
                        incidents={incidents}
                        requestOptions={{ page: 0 }}
                        totalPages={0}
                        totalIncidents={0}
                        changePage={() => {}}
                    />
                );

                const emptyResultsContainer = wrapper.find(EmptyResults);
                expect(emptyResultsContainer).toHaveLength(1);
                expect(emptyResultsContainer.text()).toEqual('No results');
            });
        });

        describe('UpperPanel', () => {
            it('should exists', () => {
                const incidents: IIncident[] = getFakeIncidents(3);
                const wrapper = mount(
                    <IncidentsPage
                        incidents={incidents}
                        requestOptions={{ page: 1 }}
                        totalPages={2}
                        changePage={() => {}}
                    />
                );

                const container = wrapper.find(UpperPanel);

                expect(container).toHaveLength(1);
            });

            it('should have search incidents component', () => {
                const incidents: IIncident[] = getFakeIncidents(3);
                const wrapper = mount(
                    <IncidentsPage
                        incidents={incidents}
                        requestOptions={{ page: 1 }}
                        totalPages={2}
                        changePage={() => {}}
                    />
                );

                const container = wrapper.find(UpperPanel);

                expect(container.find(SearchIncidents)).toHaveLength(1);
            });

            it('should have total incidents component', () => {
                const incidents: IIncident[] = getFakeIncidents(3);
                const wrapper = mount(
                    <IncidentsPage
                        incidents={incidents}
                        requestOptions={{ page: 1 }}
                        totalPages={2}
                        changePage={() => {}}
                    />
                );

                const container = wrapper.find(UpperPanel);

                expect(container.find(TotalIncidents)).toHaveLength(1);
            });

            it('should have components in exact order', () => {
                const incidents: IIncident[] = getFakeIncidents(3);
                const wrapper = mount(
                    <IncidentsPage
                        incidents={incidents}
                        requestOptions={{ page: 1 }}
                        totalPages={2}
                        totalIncidents={15}
                        changePage={() => {}}
                    />
                );

                const container = wrapper.find(UpperPanel);

                const html = container.html();

                const searchIncidentsIndex = html.indexOf('data-test-id="search-incidents"');
                const totalIncidentsIndex = html.indexOf('data-test-id="total-incidents"');

                expect(searchIncidentsIndex).toBeGreaterThan(-1);
                expect(totalIncidentsIndex).toBeGreaterThan(-1);

                expect(searchIncidentsIndex < totalIncidentsIndex).toBeTruthy();
            });
        });

        describe('TotalIncidents', () => {
            it('should render', () => {
                const incidents: IIncident[] = getFakeIncidents(3);
                const wrapper = mount(
                    <IncidentsPage
                        incidents={incidents}
                        requestOptions={{ page: 1 }}
                        totalPages={2}
                        totalIncidents={15}
                        changePage={() => {}}
                    />
                );

                const container = wrapper.find(TotalIncidents);
                expect(container).toHaveLength(1);
                expect(container.text()).toEqual('Total: 15');
            });

            it('should not render', () => {
                const incidents: IIncident[] = getFakeIncidents(3);
                const wrapper = mount(
                    <IncidentsPage
                        incidents={incidents}
                        requestOptions={{ page: 1 }}
                        totalPages={2}
                        changePage={() => {}}
                    />
                );

                const container = wrapper.find(TotalIncidents);

                expect(container).toHaveLength(1);
                expect(container.html()).toEqual(null);
            });

            it('should render when empty incidents', () => {
                const incidents: IIncident[] = [];
                const wrapper = mount(
                    <IncidentsPage
                        incidents={incidents}
                        requestOptions={{ page: 0 }}
                        totalPages={0}
                        totalIncidents={0}
                        changePage={() => {}}
                    />
                );

                const emptyResultsContainer = wrapper.find(EmptyResults);
                expect(emptyResultsContainer).toHaveLength(1);

                const totalIncidentsContainer = wrapper.find(TotalIncidents);
                expect(totalIncidentsContainer).toHaveLength(1);
                expect(totalIncidentsContainer.text()).toEqual('Total: 0');
            });
        });

        describe('SearchIncidents', () => {
            it('should exists', () => {
                const incidents: IIncident[] = getFakeIncidents(3);
                const wrapper = mount(
                    <IncidentsPage
                        incidents={incidents}
                        requestOptions={{ page: 1 }}
                        totalPages={2}
                        changePage={() => {}}
                    />
                );

                const container = wrapper.find(SearchIncidents);

                expect(container).toHaveLength(1);
            });
        });
    });
});
