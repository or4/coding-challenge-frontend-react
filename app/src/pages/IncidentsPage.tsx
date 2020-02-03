import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import styled from 'styled-components';

import { Loading } from 'components/common/Loading';
import { Incident } from 'components/incidents/Incident';
import { Error } from 'components/common/Error';
import { EmptyResults } from 'components/incidents/EmptyResults';
import { Pagination } from 'components/incidents/Pagination';
import { selectTotalPages } from 'core/incidents/reducers';
import { IAppState } from 'core/reducers';
import { IIncident, IIncidentsModifiedRequestOptions } from 'types';
import { IncidentsRequest, IncidentsCountRequest } from 'core/incidents/actions';
import { TotalIncidents } from 'components/incidents/TotalIncidents';
import { SearchIncidents } from 'components/incidents/SearchIncidents';
import { UpperPanel } from 'components/incidents/UpperPanel';

export const Container = styled.div``;

interface IDispatchProps {
    makeIncidentsRequest: (options: IIncidentsModifiedRequestOptions) => void;
    makeIncidentsCountRequest: (options: IIncidentsModifiedRequestOptions) => void;
}

interface IProps {
    incidents: IIncident[];
    requesting?: boolean;
    requestOptions: IIncidentsModifiedRequestOptions;
    totalPages: number;
    totalIncidents?: number;
    error?: object;
}

export class IncidentsPage extends React.Component<IProps & IDispatchProps> {
    public shouldComponentUpdate(nextProps: IProps) {
        if (nextProps) {
            if (nextProps.requesting !== this.props.requesting) {
                return true;
            }

            if (nextProps.incidents.length === 0 && this.props.incidents.length === 0) {
                return false;
            }

            if (nextProps.incidents !== this.props.incidents) {
                return true;
            }

            if (nextProps.totalPages !== this.props.totalPages) {
                return true;
            }
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

        const incidents = this.props.incidents || [];
        const { requestOptions, totalPages, totalIncidents } = this.props;

        return (
            <>
                <UpperPanel>
                    <SearchIncidents onChange={() => {}} text={''} />
                    <TotalIncidents value={totalIncidents} />
                </UpperPanel>
                <Container data-test-id="incidents-list">
                    {incidents.length === 0 ? (
                        <EmptyResults />
                    ) : (
                        incidents.map((incident, index) => <Incident key={index} {...incident} />)
                    )}
                    <Pagination
                        currentPage={requestOptions.page || 0}
                        totalPages={totalPages}
                        onChange={this.onChangePage}
                    />
                </Container>
            </>
        );
    }

    private onChangePage = (page: number) => {
        const { makeIncidentsRequest, makeIncidentsCountRequest, requestOptions } = this.props;

        makeIncidentsRequest({ ...requestOptions, page });
        makeIncidentsCountRequest({ ...requestOptions });
    };
}

const mapStateToProps = (state: IAppState) => {
    const {
        incidents: { incidents = [], requesting, error, requestOptions, totalIncidents },
    } = state;

    const totalPages = selectTotalPages(state);

    return {
        incidents,
        requesting,
        error,
        requestOptions,
        totalPages,
        totalIncidents,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    makeIncidentsRequest: (options: IIncidentsModifiedRequestOptions) => {
        dispatch(new IncidentsRequest({ ...options }));
    },
    makeIncidentsCountRequest: (options: IIncidentsModifiedRequestOptions) => {
        dispatch(new IncidentsCountRequest({ ...options }));
    },
});

export const ConnectedIncidentsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(IncidentsPage);
