import React from 'react';
import { Provider } from 'react-redux';

import { Layout } from 'components/common/Layout';
import { store } from 'core/store';
import { IncidentsRequest, IncidentsCountRequest } from 'core/incidents/actions';
import { ConnectedIncidentsPage } from 'pages/IncidentsPage';

export class AppWithStore extends React.Component {
    public componentDidMount() {
        store.dispatch(new IncidentsRequest());
        store.dispatch(new IncidentsCountRequest());
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
