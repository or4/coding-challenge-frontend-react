export type IncidentType = 'crash' | 'hazard' | 'theft' | 'unconfirmed' | 'infrastructure_issue' | 'chop_shop';

export interface IIncidentRequestOptions {
    incidentType?: IncidentType; // Only incidents of specific type
    proximity?: string; // Center of location for proximity search
    proximitySquare?: number; // Size of the proximity search
}
