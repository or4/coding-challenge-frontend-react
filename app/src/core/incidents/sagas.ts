import { takeEvery, put, call } from 'redux-saga/effects';
import { api } from 'core/api';

import { IncidentsActionType, IncidentsRequest, IncidentsRequestSuccess, IncidentsRequestFail } from './actions';

export function* incidents({ options }: IncidentsRequest) {
    const result = yield call(api.get, '/incidents', options);
    const { data, status } = result;

    if (status !== 200) {
        // response like { data: {error: "incident_type does not have a valid value"}, status: 400 }
        return yield put(new IncidentsRequestFail({ status, data }));
    }

    yield put(new IncidentsRequestSuccess(data.incidents));
}

// takeEvery is specially chosen for monitoring request count
export default [takeEvery(IncidentsActionType.IncidentsRequest, incidents)];
