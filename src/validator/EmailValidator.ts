import Validator from "./Validator";
import DomainNameValidator from "./DomainNameValidator";

export default class EmailValidator implements Validator<string> {
    helpTextKey(): string {
        return "ENTER_VALID_EMAIL";
    }

    key(): string {
        return "email";
    }

    validate(value?: string): boolean {
        const domainValidator = new DomainNameValidator();
        if (value === undefined || value === "") {
            return true;
        }
        const parts = value.split("@", 2);
        const localPart = parts[0];
        const domainName = parts[1];

        const localPartPattern = new RegExp("^[a-zA-Z0-9\\-_+.\u007F-\uFFFF]+$", "gm");

        return localPart !== undefined &&
            domainName !== undefined &&
            localPart.length > 0 &&
            domainName.length > 0 &&
            localPartPattern.test(localPart) &&
            domainValidator.validate(domainName);
    }

    parameters(): any[] {
        return [];
    }
}