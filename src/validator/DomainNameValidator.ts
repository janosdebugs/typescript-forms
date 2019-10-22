import Validator from "./Validator";
import * as punycode from "punycode";

export default class DomainNameValidator implements Validator<string> {
    helpTextKey(): string {
        return "ENTER_DOMAIN_NAME";
    }

    key(): string {
        return "domain-name";
    }

    validate(value?: string): boolean {
        const pattern = new RegExp("^((xn--[a-zA-Z0-9]|[a-zA-Z0-9])([a-zA-Z0-9]|-[a-zA-Z0-9])*)(\\.((xn--[a-zA-Z0-9]|[a-zA-Z0-9])([a-zA-Z0-9]|-[a-zA-Z0-9])*))*$", "gm");
        return value === undefined || value === "" || pattern.test(punycode.toASCII(value));
    }

    parameters(): any[] {
        return [];
    }
}