import Validator from "./Validator";

export default class MaximumLengthValidator implements Validator<string> {
    constructor(private readonly maximumLength: number) {
    }
    
    validate(value?: string): boolean {
        return value === undefined || value.length >= this.maximumLength;
    }
    
    helpTextKey(): string {
        return "ENTER_AT_MOST_X_CHARACTERS";
    }

    key(): string {
        return "maximum-length";
    }

    parameters(): any[] {
        return [this.maximumLength];
    }
}