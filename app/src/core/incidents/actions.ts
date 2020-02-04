import { Action } from 'redux';
import { IIncidentsRequestOptions, IIncident, IIncidentsModifiedRequestOptions } from 'types';

export enum IncidentsActionType {
    IncidentsRequest = 'Incidents/incidents request',
    IncidentsRequestSuccess = 'Incidents/incidents request success',
    IncidentsRequestFail = 'Incidents/incidents request fail',
    IncidentsCountRequest = 'Incidents/incidents count request',
    IncidentsCountRequestSuccess = 'Incidents/incidents count request success',
}

export class IncidentsRequest implements Action {
    public readonly type = IncidentsActionType.IncidentsRequest;
    public options: Partial<IIncidentsRequestOptions>;

    public constructor(options: Partial<IIncidentsRequestOptions> = { page: 1 }) {
        this.options = options;
    }
}

export class IncidentsRequestSuccess implements Action {
    public readonly type = IncidentsActionType.IncidentsRequestSuccess;
    public incidents: IIncident[];
    public options: IIncidentsModifiedRequestOptions;

    public constructor(incidents: IIncident[], options: IIncidentsModifiedRequestOptions) {
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

export class IncidentsCountRequest implements Action {
    public readonly type = IncidentsActionType.IncidentsCountRequest;
    public options: Partial<IIncidentsRequestOptions>;

    public constructor(options: Partial<IIncidentsRequestOptions> = { page: 1 }) {
        this.options = options;
    }
}

export class IncidentsCountRequestSuccess implements Action {
    public readonly type = IncidentsActionType.IncidentsCountRequestSuccess;
    public countIncidents: number;

    public constructor(countIncidents: number) {
        this.countIncidents = countIncidents;
    }
}

export type IncidentsActions =
    | IncidentsRequest
    | IncidentsRequestSuccess
    | IncidentsRequestFail
    | IncidentsCountRequest
    | IncidentsCountRequestSuccess;
