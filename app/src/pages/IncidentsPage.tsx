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
import { IIncident } from 'types';
import { IncidentsRequest } from 'core/incidents/actions';
import { defaultOptions } from 'core/incidents/contstants';
import { TotalIncidents } from 'components/incidents/TotalIncidents';

export const Container = styled.div``;

interface IDispatchProps {
    changePage: (page: number) => void;
}

interface IProps {
    incidents: IIncident[];
    requesting?: boolean;
    currentPage: number;
    totalPages: number;
    totalIncidents?: number;
    error?: object;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IState {}

export class IncidentsPage extends React.Component<IProps & IDispatchProps, IState> {
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
        const { currentPage, totalPages, totalIncidents, changePage } = this.props;

        return (
            <>
                <TotalIncidents value={totalIncidents} />
                <Container data-test-id="incidents-list">
                    {incidents.length === 0 ? (
                        <EmptyResults />
                    ) : (
                        incidents.map((incident, index) => <Incident key={index} {...incident} />)
                    )}
                    <Pagination currentPage={currentPage} totalPages={totalPages} onChange={changePage} />
                </Container>
            </>
        );
    }
}

const mapStateToProps = (state: IAppState) => {
    const {
        incidents: { incidents = [], requesting, error, currentPage, totalIncidents },
    } = state;

    const totalPages = selectTotalPages(state);

    return {
        incidents,
        requesting,
        error,
        currentPage: currentPage || 0,
        totalPages,
        totalIncidents,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    changePage: (page: number) => {
        dispatch(new IncidentsRequest({ ...defaultOptions, page }));
    },
});

export const ConnectedIncidentsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(IncidentsPage);
