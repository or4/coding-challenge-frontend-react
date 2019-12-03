import { AxiosInstance } from 'axios';
import moxios from 'moxios';
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import { api } from 'core/api';
import { moxiosWait } from 'core/utils/moxiosWait';
import { getFakeIncidents } from 'core/incidents/__mocks__/fakeIncidents';
import { IIncident } from 'types';

import { AppWithStore } from '../../App';

describe('IncidentsPage', () => {
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
        expect(container.length > 0).toBe(true);

        jest.resetAllMocks();
        done();
    });
});
