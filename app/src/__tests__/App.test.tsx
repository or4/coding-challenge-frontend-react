import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import { App } from '../App';

describe('App', () => {
    let container: HTMLDivElement | null;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        if (container) {
            document.body.removeChild(container);
            container = null;
        }
    });

    it('renders without crashing', () => {
        act(() => {
            ReactDOM.render(<App />, container);
        });

        const app = container && container.getElementsByClassName('app')[0];

        expect(Boolean(app)).toBe(true);
    });
});
