import React, { useEffect } from 'react';
import { store } from 'core/store';
import { IncidentsRequest } from 'core/incidents/actions';

export const App: React.FC = () => {
    useEffect(() => {
        // @ts-ignore
        store.dispatch(new IncidentsRequest({ incident_type: 'th``eft', proximity: 'Be``rlin', proximitySquare: 100 }));
    });

    return (
        <div className="app">
            <header className="App-header">Hello world!</header>
        </div>
    );
};
