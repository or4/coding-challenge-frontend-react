import { Action } from 'redux';
import { IIncidentRequestOptions, IIncident, IIncidentSuccessRequestOptions } from 'types';

export enum IncidentsActionType {
    IncidentsRequest = 'Incidents/incidents request',
    IncidentsRequestSuccess = 'Incidents/incidents request success',
    IncidentsRequestFail = 'Incidents/incidents request fail',
}

export class IncidentsRequest implements Action {
    public readonly type = IncidentsActionType.IncidentsRequest;
    public options: IIncidentRequestOptions;

    public constructor(options: IIncidentRequestOptions) {
        this.options = options;
    }
}

export class IncidentsRequestSuccess implements Action {
    public readonly type = IncidentsActionType.IncidentsRequestSuccess;
    public incidents: IIncident[];
    public options: IIncidentSuccessRequestOptions;

    public constructor(incidents: IIncident[], options: IIncidentSuccessRequestOptions = { page: 1 }) {
        this.incidents = incidents;
        this.options = options;
    }
}

export class IncidentsRequestFail implements Action {
    public readonly type = IncidentsActionType.IncidentsRequestFail;
    public error: object;

    public constructor(error: object) {
        this.error = error;
    }
}

export type IncidentsActions = IncidentsRequest | IncidentsRequestSuccess | IncidentsRequestFail;
