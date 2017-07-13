import { Mapper } from "../utils/helpers";

export class User {
    constructor(user?: any) {
        Mapper.map(user, this);
    }

    id: string;
    userName: string;
    email: string;
    phone: string;
}