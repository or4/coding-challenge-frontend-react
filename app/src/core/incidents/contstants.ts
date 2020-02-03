import { IIncidentsRequestOptions } from 'types';

export const INCIDENTS_PER_PAGE = 10;

export const defaultOptions: IIncidentsRequestOptions = {
    incidentType: 'theft',
    proximity: 'Berlin',
    proximitySquare: 50,
    perPage: INCIDENTS_PER_PAGE,
    page: 1,
};

export const MAX_INCIDENTS_COUNT = 10000;
export const maxIncidentsCountOptions: IIncidentsRequestOptions = {
    ...defaultOptions,
    perPage: MAX_INCIDENTS_COUNT,
};
