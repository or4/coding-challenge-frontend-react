import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import { Layout } from 'components/common/Layout';
import { store } from 'core/store';
import { IncidentsRequest, defaultIncidentRequestOptions } from 'core/incidents/actions';
import { ConnectedIncidentsPage } from 'pages/IncidentsPage';

export const AppWithStore: React.FC = () => {
    useEffect(() => {
        store.dispatch(new IncidentsRequest(defaultIncidentRequestOptions));
    });

    return (
        <Provider store={store}>
            <Layout>
                <ConnectedIncidentsPage />
            </Layout>
        </Provider>
    );
};
