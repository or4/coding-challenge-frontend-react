import { Action } from 'redux';
import { IIncidentRequestOptions, IIncident } from 'types';

export enum IncidentsActionType {
    IncidentsRequest = 'Incidents/incidents request',
    IncidentsRequestSuccess = 'Incidents/incidents request success',
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

    public constructor(incidents: IIncident[]) {
        this.incidents = incidents;
    }
}

export type IncidentsActions = IncidentsRequest | IncidentsRequestSuccess;
