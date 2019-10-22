export default interface Validator<T> {
    key(): string
    helpTextKey(): string;
    parameters(): any[];
    validate(value?: T):boolean;
}