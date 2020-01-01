import { AxiosInstance } from 'axios';
import moxios from 'moxios';
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import { api } from 'core/api';
import { moxiosWait } from 'core/utils/moxiosWait';
import { getFakeIncidents } from 'core/incidents/__mocks__/fakeIncidents';
import { IncidentsPage } from 'pages/IncidentsPage';
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
        jest.clearAllMocks();

        if (root) {
            document.body.removeChild(root);
        }
    });

    it('should render a few times', async () => {
        const renderSpy = jest.spyOn(IncidentsPage.prototype, 'render');

        act(() => {
            ReactDOM.render(<AppWithStore />, root);
        });

        const incidents: IIncident[] = getFakeIncidents(3);
        const incidentsTotal: IIncident[] = getFakeIncidents(74);

        await moxiosWait();

        let request = moxios.requests.at(0);
        await request.respondWith({ status: 200, response: { status: 200, incidents } });

        request = moxios.requests.at(1);
        await request.respondWith({ status: 200, response: { status: 200, incidents: incidentsTotal } });

        // 1 - empty incidents
        // 2 - loading..
        // 3 - actual incidents list
        // 4 - changed totalPages
        expect(renderSpy).toHaveBeenCalledTimes(4);

        renderSpy.mockClear();
    });
});
