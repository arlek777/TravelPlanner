import { Mapper } from '../../utils/mapper';

export class Trip {
    constructor(trip?: Trip) {
        if (trip) {
            Mapper.map(trip, this);
        }
    }

    id: string;
    creatorId: string;
    title: string;
    description: string;
}