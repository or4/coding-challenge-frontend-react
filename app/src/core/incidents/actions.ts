import { Action } from 'redux';
import { IIncidentRequestOptions } from 'types';

export enum IncidentsActionType {
    IncidentsRequest = 'Incidents/incidents request',
}

export class IncidentsRequest implements Action {
    public readonly type = IncidentsActionType.IncidentsRequest;
    public options: IIncidentRequestOptions;

    public constructor(options: IIncidentRequestOptions) {
        this.options = options;
    }
}

export type IncidentsActions = IncidentsRequest;
