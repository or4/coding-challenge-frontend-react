export type IncidentType = 'crash' | 'hazard' | 'theft' | 'unconfirmed' | 'infrastructure_issue' | 'chop_shop';

export interface IIncidentRequestOptions {
    incidentType?: IncidentType; // Only incidents of specific type
    proximity?: string; // Center of location for proximity search
    proximitySquare?: number; // Size of the proximity search
}

export interface IIncident {
    id: number;
    title?: string;
    description?: string;
    address?: string;
    media?: {
        imageUrl?: string;
        imageUrlThumb?: string;
    };
    occurredAt?: number;
}

export interface IIncidentDb {
    id: number;
    title?: string;
    description?: string;
    address?: string;
    media?: {
        imageUrl?: string;
        imageUrlThumb?: string;
    };
    occurredAt?: number;

    locationDescription?: string;
    locationType?: string;
    source?: {
        name?: string;
        htmlUrl?: string;
        apiUrl?: string;
    };
    type?: IncidentType;
    typeProperties?: string;
    updatedAt?: number;
    url?: string;
}
