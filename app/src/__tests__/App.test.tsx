import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

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

        const app = root && root.getElementsByClassName('app')[0];

        expect(Boolean(app)).toBe(true);
    });
});
