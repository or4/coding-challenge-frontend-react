import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import { IncidentsRequest } from 'core/incidents/actions';
import { MAX_INCIDENTS_COUNT } from 'core/incidents/contstants';
import { store } from 'core/store';
import { IIncidentRequestOptions } from 'types';

import { AppWithStore } from '../App';

describe('App', () => {
    let root: HTMLDivElement | null;

    beforeEach(() => {
        root = document.createElement('div');
        document.body.appendChild(root);
    });

    afterEach(() => {
        if (root) {
            document.body.removeChild(root);
            root = null;
        }
    });

    it('renders without crashing', () => {
        act(() => {
            ReactDOM.render(<AppWithStore />, root);
        });

        const container = root && root.querySelectorAll('[data-test-id="layout"]');
        expect(container).toHaveLength(1);
    });

    it('should dispatch IncidentsRequest with default options', () => {
        const options: IIncidentRequestOptions = {
            incidentType: 'theft',
            proximity: 'Berlin',
            proximitySquare: 50,
            perPage: 10,
            page: 1,
        };

        const dispatchSpy = jest.spyOn(store, 'dispatch');
        mount(<AppWithStore />);

        expect(dispatchSpy).toHaveBeenCalledTimes(2);
        expect(dispatchSpy).toHaveBeenNthCalledWith(1, new IncidentsRequest(options));
        dispatchSpy.mockClear();
    });

    it('should dispatch IncidentsRequest with max count incidents options', () => {
        const options: IIncidentRequestOptions = {
            incidentType: 'theft',
            proximity: 'Berlin',
            proximitySquare: 50,
            page: 1,
            perPage: MAX_INCIDENTS_COUNT,
        };

        const dispatchSpy = jest.spyOn(store, 'dispatch');
        mount(<AppWithStore />);

        expect(dispatchSpy).toHaveBeenCalledTimes(2);
        expect(dispatchSpy).toHaveBeenLastCalledWith(new IncidentsRequest(options));
        dispatchSpy.mockClear();
    });
});
