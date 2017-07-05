import { Mapper } from '../utils/mapper';

export class JWTTokens {
    constructor(tokens: JWTTokens) {
        Mapper.map(tokens, this);
    }

    accessToken: string;
    idToken: string;
}