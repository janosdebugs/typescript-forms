import Validator from "./Validator";

export default class RequiredBooleanValidator implements Validator<boolean> {
    validate(value?: boolean): boolean {
        return value !== undefined && value;
    }

    helpTextKey(): string {
        return "Please check this box.";
    }

    key(): string {
        return "required";
    }

    parameters(): any[] {
        return [];
    }
}