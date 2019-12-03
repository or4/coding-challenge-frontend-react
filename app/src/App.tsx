import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import { store } from 'core/store';
import { IncidentsRequest } from 'core/incidents/actions';
import { ConnectedIncidentsPage } from 'pages/IncidentsPage';

export const AppWithStore: React.FC = () => {
    useEffect(() => {
        // @ts-ignore
        store.dispatch(new IncidentsRequest({ incidentType: 'theft', proximity: 'Berlin', proximitySquare: 100 }));
    });

    return (
        <Provider store={store}>
            <div className="app">
                <ConnectedIncidentsPage />
            </div>
        </Provider>
    );
};
