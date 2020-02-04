import React from 'react';
import ReactDOM from 'react-dom';

import { isE2E } from 'utils/e2e';
import { AppWithStore } from './App';

import './reset.css';
import './app.css';

function renderApp() {
    ReactDOM.render(<AppWithStore />, document.getElementById('root'));
}

if (isE2E()) {
    const interval = setInterval(() => {
        if (typeof window !== 'undefined' && window.mockResolved === true) {
            renderApp();

            clearInterval(interval);
        }
    }, 500);
} else {
    renderApp();
}
