import { Action } from 'redux';
import { IIncidentRequestOptions, IIncident } from 'types';

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

export const defaultIncidentRequestOptions: IIncidentRequestOptions = {
    incidentType: 'theft',
    proximity: 'Berlin',
    proximitySquare: 50,
    perPage: 10,
    page: 1,
};

export class IncidentsRequestSuccess implements Action {
    public readonly type = IncidentsActionType.IncidentsRequestSuccess;
    public incidents: IIncident[];

    public constructor(incidents: IIncident[]) {
        this.incidents = incidents;
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
