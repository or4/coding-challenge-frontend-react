import { times } from 'lodash';
import { IIncident } from 'types';

export const getFakeIncidents: (amount: number) => IIncident[] = amount => times(amount, index => ({ id: index + 1 }));
