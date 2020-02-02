import { takeEvery, put, call } from 'redux-saga/effects';

import { api } from 'core/api';
import { defaultOptions } from 'core/incidents/contstants';
import { IIncident, IIncidentDb } from 'types';
import { isE2E } from 'utils/e2e';
import { IncidentsActionType, IncidentsRequest, IncidentsRequestSuccess, IncidentsRequestFail } from './actions';

export function* incidents({ options }: Partial<IncidentsRequest>) {
    const result = yield call(api.get, '/incidents', { ...defaultOptions, ...options });
    const { data, status } = result;

    if (status !== 200) {
        // response like { data: {error: "incident_type does not have a valid value"}, status: 400 }
        return yield put(new IncidentsRequestFail({ status, data }));
    }

    if (isE2E()) {
        window.e2e.responses.push(data);
    }

    const { page, perPage } = options || {};

    yield put(new IncidentsRequestSuccess(transform(data.incidents), { page, perPage }));
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

// takeEvery is specially chosen for monitoring request count
export default [takeEvery(IncidentsActionType.IncidentsRequest, incidents)];
