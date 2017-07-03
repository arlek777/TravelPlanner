export class RequestResult {
    constructor(public succeeded = false, public errors: string[] = null) {
    }
}