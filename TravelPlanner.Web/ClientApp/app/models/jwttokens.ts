import { Mapper } from '../utils/helpers';

export class JWTTokens {
    constructor(tokens: JWTTokens) {
        Mapper.map(tokens, this);
    }

    accessToken: string;
    idToken: string;
}