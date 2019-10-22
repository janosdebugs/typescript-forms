import Validator from "./Validator";

export default class RequiredStringValidator implements Validator<string> {
    validate(value?: string): boolean {
        return value !== undefined && value !== "";
    }

    helpTextKey(): string {
        return "Please fill in this field.";
    }

    key(): string {
        return "required";
    }

    parameters(): any[] {
        return [];
    }
}