import { Mapper } from '../../utils/mapper';

export class Trip {
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