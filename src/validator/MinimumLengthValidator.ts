import Validator from "./Validator";

export default class MinimumLengthValidator implements Validator<string> {
    constructor(private readonly minimumLength: number) {

    }
    validate(value?: string): boolean {
        return value === undefined || value === "" || value.length >= this.minimumLength;
    }
    
    helpTextKey(): string {
        return "Please enter at least " + this.minimumLength + " characters.";
    }

    key(): string {
        return "minimum-length";
    }

    parameters(): any[] {
        return [this.minimumLength];
    }
}