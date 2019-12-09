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

        if (root) {
            document.body.removeChild(root);
        }
    });

    it('should render two times', async done => {
        const renderSpy = jest.spyOn(IncidentsPage.prototype, 'render');

        act(() => {
            ReactDOM.render(<AppWithStore />, root);
        });

        const incidents: IIncident[] = getFakeIncidents(3);

        await moxiosWait();

        let request = moxios.requests.mostRecent();
        await request.respondWith({ status: 200, response: { status: 200, incidents } });

        // 1 - empty incidents
        // 2 - loading..
        // 3 - actual incidents list
        expect(renderSpy).toHaveBeenCalledTimes(3);

        renderSpy.mockClear();

        done();
    });
});
