import { takeEvery, put, call } from 'redux-saga/effects';
import { isArray } from 'lodash';

import { api } from 'core/api';
import { defaultOptions, MAX_INCIDENTS_COUNT } from 'core/incidents/contstants';
import { IIncident, IIncidentDb } from 'types';
import { isE2E } from 'utils/e2e';
import {
    IncidentsActionType,
    IncidentsRequest,
    IncidentsRequestSuccess,
    IncidentsRequestFail,
    IncidentsCountRequestSuccess,
    IncidentsCountRequest,
} from './actions';

export function* incidents({ options }: IncidentsRequest) {
    const result = yield call(api.get, '/incidents', { ...defaultOptions, ...options });
    const { data, status } = result;

    if (status !== 200) {
        // response like { data: {error: "incident_type does not have a valid value"}, status: 400 }
        return yield put(new IncidentsRequestFail({ status, data }));
    }

    if (isE2E()) {
        window.e2e.responses.push(data);
    }

    const { page } = options;

    yield put(new IncidentsRequestSuccess(transform(data.incidents), { page }));
}

// pick only necessary incident props
export const transform: (incidents: IIncidentDb[]) => IIncident[] = incidents =>
    incidents.map(({ id, title, description, address, media, occurredAt }) => ({
        id,
        title,
        description,
        address,
        media,
        occurredAt,
    }));

export function* incidentsCount({ options }: IncidentsCountRequest) {
    const result = yield call(api.get, '/incidents', {
        ...defaultOptions,
        ...options,
        perPage: MAX_INCIDENTS_COUNT,
        page: 1,
    });
    const { data, status } = result;

    if (status === 200) {
        const incidentsCount: number = isArray(data.incidents) ? data.incidents.length : 0;

        yield put(new IncidentsCountRequestSuccess(incidentsCount));
    }
}

export default [
    takeEvery(IncidentsActionType.IncidentsRequest, incidents),
    takeEvery(IncidentsActionType.IncidentsCountRequest, incidentsCount),
];
