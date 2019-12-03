import { times } from 'lodash';
import { IIncident } from 'types';

export const getFakeIncidents: (amount: number) => IIncident[] = amount => {
    return times(amount, index => ({
        id: index + 1,
        address: 'Berlin, 10963, DE',
        description: "Stolen during nighttime from the house's closed yard.",
        locationDescription: null,
        locationType: null,
        media: {
            imageUrl: 'https://files.bikeindex.org/uploads/Pu/196548/large_Bike01.png',
            imageUrlThumb: 'https://files.bikeindex.org/uploads/Pu/196548/small_Bike01.png',
        },
        occurredAt: 1571918301,
        source: {
            name: 'BikeIndex.org',
            htmlUrl: 'https://bikeindex.org/bikes/669448',
            apiUrl: 'https://bikeindex.org/api/v1/bikes/669448',
        },
        title: 'Stolen 2017 State Bicycle Co. Matte Black 5 - 59 Core Line: Fixed Gear(black)',
        type: 'Theft',
        typeProperties: null,
        updatedAt: 1573322470,
        url: 'https://bikewise.org/api/v1/incidents/109462',
    }));
};
