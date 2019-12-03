import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Incident } from 'components/Incident/Incident';
import { AppState } from 'core/reducers';
import { IIncident } from 'types';

export const Container = styled.div``;

interface DispatchProps {
    incidents: IIncident[];
}

export class IncidentsPage extends React.Component<DispatchProps> {
    public shouldComponentUpdate(nextProps: DispatchProps) {
        if (nextProps && nextProps.incidents.length === 0 && this.props.incidents.length === 0) {
            return false;
        }

        if (nextProps && nextProps.incidents !== this.props.incidents) {
            return true;
        }

        return false;
    }

    public render() {
        return (
            <Container data-test-id="inicidents-list">
                {(this.props.incidents || []).map((incident, index) => (
                    <Incident key={index} {...incident} />
                ))}
            </Container>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    incidents: state.incidents.incidents || [],
});

export const ConnectedIncidentsPage = connect(mapStateToProps)(IncidentsPage);
