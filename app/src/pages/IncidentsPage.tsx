import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Loading } from 'components/common/Loading';
import { Incident } from 'components/incidents/Incident';
import { AppState } from 'core/reducers';
import { IIncident } from 'types';
import { Error } from 'components/common/Error';

export const Container = styled.div``;

interface DispatchProps {
    incidents: IIncident[];
    requesting?: boolean;
    error?: object;
}

export class IncidentsPage extends React.Component<DispatchProps> {
    public shouldComponentUpdate(nextProps: DispatchProps) {
        if (nextProps && nextProps.requesting !== this.props.requesting) {
            return true;
        }

        if (nextProps && nextProps.incidents.length === 0 && this.props.incidents.length === 0) {
            return false;
        }

        if (nextProps && nextProps.incidents !== this.props.incidents) {
            return true;
        }

        return false;
    }

    public render() {
        if (this.props.error) {
            return <Error />;
        }

        if (this.props.requesting) {
            return <Loading />;
        }

        return (
            <Container data-test-id="inicidents-list">
                {(this.props.incidents || []).map((incident, index) => (
                    <Incident key={index} {...incident} />
                ))}
            </Container>
        );
    }
}

const mapStateToProps = ({ incidents: { incidents = [], requesting, error } }: AppState) => ({
    incidents,
    requesting,
    error,
});

export const ConnectedIncidentsPage = connect(mapStateToProps)(IncidentsPage);
