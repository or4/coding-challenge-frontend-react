import { isEqual, throttle } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import styled from 'styled-components';

import { Error } from 'components/common/Error';
import { Loading } from 'components/common/Loading';
import { EmptyResults } from 'components/incidents/EmptyResults';
import { Incident } from 'components/incidents/Incident';
import { Pagination } from 'components/incidents/Pagination';
import { SearchIncidents } from 'components/incidents/SearchIncidents';
import { TotalIncidents } from 'components/incidents/TotalIncidents';
import { IncidentsCountRequest, IncidentsRequest } from 'core/incidents/actions';
import { selectTotalPages } from 'core/incidents/reducers';
import { IAppState } from 'core/reducers';
import { IIncident, IIncidentsModifiedRequestOptions } from 'types';
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

export interface IState {
    query?: string;
}

export class IncidentsPage extends React.Component<IProps & IDispatchProps, IState> {
    public state: IState = {};

    public shouldComponentUpdate(nextProps: IProps, nextState: IState) {
        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    public render() {
        const { totalIncidents } = this.props;
        return (
            <>
                <UpperPanel>
                    <SearchIncidents onChange={this.onChangeQuery} text={this.state.query || ''} />
                </UpperPanel>
                <TotalIncidents value={totalIncidents} />
                {this.renderContent()}
            </>
        );
    }

    public renderContent() {
        if (this.props.error) {
            return <Error />;
        }

        if (this.props.requesting) {
            return <Loading />;
        }

        const incidents = this.props.incidents || [];
        const { requestOptions, totalPages } = this.props;

        return (
            <>
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

    public onChangeQuery = (query: string) => {
        this.setState({ query }, this.changeQueryRequest);
    };

    public changeQueryRequest = throttle(() => {
        const { makeIncidentsRequest, makeIncidentsCountRequest, requestOptions } = this.props;
        const { query } = this.state;

        makeIncidentsRequest({ ...requestOptions, page: 1, query });
        makeIncidentsCountRequest({ ...requestOptions, query });
    }, 1000);
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
