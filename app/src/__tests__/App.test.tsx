import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import { IncidentsRequest, IncidentsCountRequest } from 'core/incidents/actions';
import { store } from 'core/store';

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
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        mount(<AppWithStore />);

        expect(dispatchSpy).toHaveBeenCalledTimes(2);
        expect(dispatchSpy).toHaveBeenNthCalledWith(1, new IncidentsRequest());
        dispatchSpy.mockClear();
    });

    it('should dispatch IncidentsCountRequest', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        mount(<AppWithStore />);

        expect(dispatchSpy).toHaveBeenCalledTimes(2);
        expect(dispatchSpy).toHaveBeenLastCalledWith(new IncidentsCountRequest());
        dispatchSpy.mockClear();
    });
});
