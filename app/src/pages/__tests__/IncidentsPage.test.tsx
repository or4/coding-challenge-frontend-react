import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { AxiosInstance } from 'axios';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import { noop } from 'lodash';

import { AppWithStore } from 'App';
import { Error } from 'components/common/Error';
import { Loading } from 'components/common/Loading';
import { EmptyResults } from 'components/incidents/EmptyResults';
import { Pagination } from 'components/incidents/Pagination';
import { Button } from 'components/incidents/Pagination/style';
import { SearchIncidents } from 'components/incidents/SearchIncidents';
import { QueryInput } from 'components/incidents/SearchIncidents/style';
import { TotalIncidents } from 'components/incidents/TotalIncidents';
import { UpperPanel } from 'components/incidents/UpperPanel';
import { api } from 'core/api';
import { moxiosWait } from 'core/utils/moxiosWait';
import { getFakeIncidents } from 'core/incidents/__mocks__/fakeIncidents';
import { IIncident } from 'types';

import { ConnectedIncidentsPage, IncidentsPage, IState } from '../IncidentsPage';
import { delay } from 'utils/test-helpers';

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

            let request = moxios.requests.at(0);
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
        describe('Common', () => {
            it('should rerender when change state', () => {
                const incidents: IIncident[] = getFakeIncidents(3);
                const wrapper = mount<IncidentsPage>(
                    <IncidentsPage
                        incidents={incidents}
                        requestOptions={{ page: 1 }}
                        totalPages={2}
                        makeIncidentsRequest={noop}
                        makeIncidentsCountRequest={noop}
                    />
                );
                const instance = wrapper.instance();
                const fn = jest.spyOn(instance, 'render');
                instance.forceUpdate();

                const query = 'text';
                instance.setState({ query });

                expect(wrapper.state('query')).toBe(query);
                expect(fn).toBeCalledTimes(2);
            });

            it('should rerender when change props', () => {
                const incidents: IIncident[] = getFakeIncidents(3);
                const wrapper = mount<IncidentsPage>(
                    <IncidentsPage
                        incidents={incidents}
                        requestOptions={{ page: 1 }}
                        totalPages={2}
                        makeIncidentsRequest={noop}
                        makeIncidentsCountRequest={noop}
                    />
                );
                const instance = wrapper.instance();
                const fn = jest.spyOn(instance, 'render');
                instance.forceUpdate();

                wrapper.setProps({ error: {} });
                expect(fn).toBeCalledTimes(2);
            });

            it('should have total incidents component', () => {
                const incidents: IIncident[] = getFakeIncidents(3);
                const wrapper = mount(
                    <IncidentsPage
                        incidents={incidents}
                        requestOptions={{ page: 1 }}
                        totalPages={2}
                        makeIncidentsRequest={noop}
                        makeIncidentsCountRequest={noop}
                    />
                );

                expect(wrapper.find(TotalIncidents)).toHaveLength(1);
            });
        });

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
                        requestOptions: {},
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
                const makeIncidentsRequest = jest.fn();
                const makeIncidentsCountRequest = jest.fn();
                const container = mount(
                    <IncidentsPage
                        incidents={incidents}
                        requestOptions={{ page: 1 }}
                        totalPages={2}
                        makeIncidentsRequest={makeIncidentsRequest}
                        makeIncidentsCountRequest={makeIncidentsCountRequest}
                    />
                );

                const wrapper = container.find(Pagination);
                expect(wrapper).toHaveLength(1);

                const buttons = wrapper.find(Button);

                const button = buttons.at(1);

                expect(button.text()).toEqual(String(page));
                button.simulate('click');
                expect(makeIncidentsRequest).toHaveBeenCalledTimes(1);
                expect(makeIncidentsRequest).toHaveBeenCalledWith({ page });

                expect(makeIncidentsCountRequest).toHaveBeenCalledTimes(1);
                expect(makeIncidentsCountRequest).toHaveBeenCalledWith({ page: 1 });
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
                        makeIncidentsRequest={noop}
                        makeIncidentsCountRequest={noop}
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
                        makeIncidentsRequest={noop}
                        makeIncidentsCountRequest={noop}
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
                        makeIncidentsRequest={noop}
                        makeIncidentsCountRequest={noop}
                    />
                );

                const container = wrapper.find(UpperPanel);

                expect(container.find(SearchIncidents)).toHaveLength(1);
            });

            it.skip('should have components in exact order', () => {
                const incidents: IIncident[] = getFakeIncidents(3);
                const wrapper = mount(
                    <IncidentsPage
                        incidents={incidents}
                        requestOptions={{ page: 1 }}
                        totalPages={2}
                        totalIncidents={15}
                        makeIncidentsRequest={noop}
                        makeIncidentsCountRequest={noop}
                    />
                );

                const container = wrapper.find(UpperPanel);

                const html = container.html();

                const searchIncidentsIndex = html.indexOf('data-test-id="search-incidents__query"');
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
                        makeIncidentsRequest={noop}
                        makeIncidentsCountRequest={noop}
                    />
                );

                const container = wrapper.find(TotalIncidents);
                expect(container).toHaveLength(1);
                expect(container.text()).toEqual('Total: 15');
            });

            it('should render when total incidents is not defined', () => {
                const incidents: IIncident[] = getFakeIncidents(3);
                const wrapper = mount(
                    <IncidentsPage
                        incidents={incidents}
                        requestOptions={{ page: 1 }}
                        totalPages={2}
                        makeIncidentsRequest={noop}
                        makeIncidentsCountRequest={noop}
                    />
                );

                const container = wrapper.find(TotalIncidents);

                expect(container).toHaveLength(1);
                expect(container.text()).toEqual('Total: 0');
            });

            it('should render when empty incidents', () => {
                const incidents: IIncident[] = [];
                const wrapper = mount(
                    <IncidentsPage
                        incidents={incidents}
                        requestOptions={{ page: 0 }}
                        totalPages={0}
                        totalIncidents={0}
                        makeIncidentsRequest={noop}
                        makeIncidentsCountRequest={noop}
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
            describe('Common', () => {
                it('should exists', () => {
                    const incidents: IIncident[] = getFakeIncidents(3);
                    const wrapper = mount(
                        <IncidentsPage
                            incidents={incidents}
                            requestOptions={{ page: 1 }}
                            totalPages={2}
                            makeIncidentsRequest={noop}
                            makeIncidentsCountRequest={noop}
                        />
                    );

                    const container = wrapper.find(SearchIncidents);

                    expect(container).toHaveLength(1);
                });
            });

            describe('QueryInput', () => {
                it('should exists', () => {
                    const incidents: IIncident[] = getFakeIncidents(3);
                    const wrapper = mount(
                        <IncidentsPage
                            incidents={incidents}
                            requestOptions={{ page: 1 }}
                            totalPages={2}
                            makeIncidentsRequest={noop}
                            makeIncidentsCountRequest={noop}
                        />
                    );

                    const container = wrapper.find(QueryInput);

                    expect(container).toHaveLength(1);
                });

                it('should change state when input value is changed', () => {
                    const incidents: IIncident[] = getFakeIncidents(3);
                    const query = 'Berlin';
                    const wrapper = mount<IncidentsPage>(
                        <IncidentsPage
                            incidents={incidents}
                            requestOptions={{ page: 1, query }}
                            totalPages={2}
                            makeIncidentsRequest={noop}
                            makeIncidentsCountRequest={noop}
                        />
                    );

                    const fn = jest.spyOn(wrapper.instance(), 'onChangeQuery');
                    wrapper.instance().forceUpdate();

                    const input = wrapper
                        .find(SearchIncidents)
                        .find('[data-test-id="search-incidents__query"]')
                        .hostNodes()
                        .getDOMNode<HTMLInputElement>();

                    const text = 'Hamburg';
                    input.value = text;

                    wrapper
                        .find('[data-test-id="search-incidents__query"]')
                        .hostNodes()
                        .simulate('change');

                    expect(wrapper.state<IState>('query')).toBe(text);
                    expect(fn).toHaveBeenCalledTimes(1);
                });

                it('should call makeRequest when query changed', () => {
                    const incidents: IIncident[] = getFakeIncidents(3);
                    const spyMakeIncidentsRequest = jest.fn();
                    const spyMakeIncidentsCountRequest = jest.fn();

                    const wrapper = mount<IncidentsPage>(
                        <IncidentsPage
                            incidents={incidents}
                            requestOptions={{ page: 1 }}
                            totalPages={2}
                            makeIncidentsRequest={spyMakeIncidentsRequest}
                            makeIncidentsCountRequest={spyMakeIncidentsCountRequest}
                        />
                    );

                    const text = 'Berlin';
                    const spyMakeRequest = jest.spyOn(wrapper.instance(), 'makeRequest');
                    wrapper.instance().forceUpdate();

                    const domNode = wrapper
                        .find(SearchIncidents)
                        .find('[data-test-id="search-incidents__query"]')
                        .hostNodes()
                        .getDOMNode<HTMLInputElement>();
                    domNode.value = text;

                    wrapper
                        .find('[data-test-id="search-incidents__query"]')
                        .hostNodes()
                        .simulate('change');

                    expect(wrapper.state<IState>('query')).toBe(text);
                    expect(spyMakeRequest).toHaveBeenCalledTimes(1);
                    expect(spyMakeIncidentsRequest).toHaveBeenCalledTimes(1);
                    expect(spyMakeIncidentsRequest).toHaveBeenCalledTimes(1);
                });

                it('should work with throttling', async done => {
                    const incidents: IIncident[] = getFakeIncidents(3);
                    const spyMakeIncidentsRequest = jest.fn();
                    const spyMakeIncidentsCountRequest = jest.fn();

                    const wrapper = mount<IncidentsPage>(
                        <IncidentsPage
                            incidents={incidents}
                            requestOptions={{ page: 1 }}
                            totalPages={2}
                            makeIncidentsRequest={spyMakeIncidentsRequest}
                            makeIncidentsCountRequest={spyMakeIncidentsCountRequest}
                        />
                    );

                    const spyMakeRequest = jest.spyOn(wrapper.instance(), 'makeRequest');
                    wrapper.instance().forceUpdate();

                    const domNode = wrapper
                        .find(SearchIncidents)
                        .find('[data-test-id="search-incidents__query"]')
                        .hostNodes()
                        .getDOMNode<HTMLInputElement>();

                    const text = 'Berlin';

                    for (let i = 1; i <= text.length; i++) {
                        domNode.value = text.slice(0, i);
                        wrapper
                            .find('[data-test-id="search-incidents__query"]')
                            .hostNodes()
                            .simulate('change');

                        await delay(100);
                    }

                    expect(wrapper.state<IState>('query')).toBe(text);
                    expect(spyMakeRequest).toHaveBeenCalledTimes(6);
                    expect(spyMakeIncidentsRequest).toHaveBeenCalledTimes(1);
                    expect(spyMakeIncidentsRequest).toHaveBeenCalledTimes(1);

                    done();
                });
            });

            describe('DateFrom', () => {
                it('should exists', () => {
                    const incidents: IIncident[] = getFakeIncidents(3);
                    const wrapper = mount(
                        <IncidentsPage
                            incidents={incidents}
                            requestOptions={{ page: 1 }}
                            totalPages={2}
                            makeIncidentsRequest={noop}
                            makeIncidentsCountRequest={noop}
                        />
                    );

                    const container = wrapper.find('[data-test-id="search-incidents__date-from"]').hostNodes();

                    expect(container).toHaveLength(1);
                });

                it('should call makeIncidentsRequest when call onChangeFrom', () => {
                    const incidents: IIncident[] = getFakeIncidents(3);
                    const spyMakeIncidentsRequest = jest.fn();
                    const spyMakeIncidentsCountRequest = jest.fn();

                    const wrapper = mount<IncidentsPage>(
                        <IncidentsPage
                            incidents={incidents}
                            requestOptions={{ page: 1 }}
                            totalPages={2}
                            makeIncidentsRequest={spyMakeIncidentsRequest}
                            makeIncidentsCountRequest={spyMakeIncidentsCountRequest}
                        />
                    );

                    const instance = wrapper.instance();
                    const spyMakeRequest = jest.spyOn(instance, 'makeRequest');

                    wrapper.instance().forceUpdate();

                    instance.onChangeFrom(new Date());

                    expect(spyMakeRequest).toHaveBeenCalledTimes(1);
                    expect(spyMakeIncidentsRequest).toHaveBeenCalledTimes(1);
                    expect(spyMakeIncidentsCountRequest).toHaveBeenCalledTimes(1);

                    expect(spyMakeIncidentsRequest).toHaveBeenCalledWith({
                        from: expect.any(Date),
                        page: 1,
                    });
                    expect(spyMakeIncidentsCountRequest).toHaveBeenCalledWith({
                        from: expect.any(Date),
                        page: 1,
                    });
                });
            });

            describe('DateTo', () => {
                it('should exists', () => {
                    const incidents: IIncident[] = getFakeIncidents(3);
                    const wrapper = mount(
                        <IncidentsPage
                            incidents={incidents}
                            requestOptions={{ page: 1 }}
                            totalPages={2}
                            makeIncidentsRequest={noop}
                            makeIncidentsCountRequest={noop}
                        />
                    );

                    const container = wrapper.find('[data-test-id="search-incidents__date-to"]').hostNodes();

                    expect(container).toHaveLength(1);
                });

                it('should call makeIncidentsRequest when call onChangeTo', () => {
                    const incidents: IIncident[] = getFakeIncidents(3);
                    const spyMakeIncidentsRequest = jest.fn();
                    const spyMakeIncidentsCountRequest = jest.fn();

                    const wrapper = mount<IncidentsPage>(
                        <IncidentsPage
                            incidents={incidents}
                            requestOptions={{ page: 1 }}
                            totalPages={2}
                            makeIncidentsRequest={spyMakeIncidentsRequest}
                            makeIncidentsCountRequest={spyMakeIncidentsCountRequest}
                        />
                    );

                    const instance = wrapper.instance();
                    const spyMakeRequest = jest.spyOn(instance, 'makeRequest');

                    wrapper.instance().forceUpdate();

                    instance.onChangeTo(new Date());

                    expect(spyMakeRequest).toHaveBeenCalledTimes(1);
                    expect(spyMakeIncidentsRequest).toHaveBeenCalledTimes(1);
                    expect(spyMakeIncidentsCountRequest).toHaveBeenCalledTimes(1);

                    expect(spyMakeIncidentsRequest).toHaveBeenCalledWith({
                        to: expect.any(Date),
                        page: 1,
                    });
                    expect(spyMakeIncidentsCountRequest).toHaveBeenCalledWith({
                        to: expect.any(Date),
                        page: 1,
                    });
                });
            });
        });
    });
});
