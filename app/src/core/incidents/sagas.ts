import { takeEvery, put, call } from 'redux-saga/effects';
import { api } from 'core/api';

import { IncidentsActionType, IncidentsRequest, IncidentsRequestSuccess } from './actions';

export function* incidents({ options }: IncidentsRequest) {
    const result = yield call(api.get, 'incidents', options);
    const { data } = result;

    yield put(new IncidentsRequestSuccess(data.incidents));
}

export default [takeEvery(IncidentsActionType.IncidentsRequest, incidents)];
