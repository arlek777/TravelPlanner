import { Mapper } from '../../utils/helpers';

export class TripViewModel {
    constructor(trip?: any) {
        if (trip) {
            Mapper.map(trip, this);
        }
    }

    id: string;
    creatorId: string;
    title: string;
    description: string;
}