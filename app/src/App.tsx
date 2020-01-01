import React from 'react';
import { Provider } from 'react-redux';

import { Layout } from 'components/common/Layout';
import { store } from 'core/store';
import { IncidentsRequest } from 'core/incidents/actions';
import { defaultOptions, maxIncidentsCountOptions } from 'core/incidents/contstants';
import { ConnectedIncidentsPage } from 'pages/IncidentsPage';

export class AppWithStore extends React.Component {
    public componentDidMount() {
        store.dispatch(new IncidentsRequest(defaultOptions));
        store.dispatch(new IncidentsRequest(maxIncidentsCountOptions));
    }

    public render() {
        return (
            <Provider store={store}>
                <Layout>
                    <ConnectedIncidentsPage />
                </Layout>
            </Provider>
        );
    }
}
