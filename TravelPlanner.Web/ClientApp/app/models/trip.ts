import { Mapper } from '../utils/helpers';
import { User } from "./user";

export class TripViewModel {
    constructor(trip?: TripViewModel) {
        if (trip) {
            Mapper.map(trip, this);
        }
    }

    id: number;
    creatorId: string;
    title: string;
    description: string;
    users: User[];
}