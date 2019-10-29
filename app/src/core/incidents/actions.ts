import { Action } from 'redux';
import { IIncidentRequestOptions } from 'types';

export enum ActionTypes {
    INCIDENTS_REQUEST = 'Incidents/incidents request',
}

export class IncidentsRequest implements Action {
    public readonly type = ActionTypes.INCIDENTS_REQUEST;
    public options: IIncidentRequestOptions;

    public constructor(options: IIncidentRequestOptions) {
        this.options = options;
    }
}

export type ActionsAll = IncidentsRequest;
