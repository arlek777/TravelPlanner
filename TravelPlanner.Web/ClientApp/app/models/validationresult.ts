export class ValidationResult {
    constructor(public succeeded = false, public errors: string[] = null) {
    }
}