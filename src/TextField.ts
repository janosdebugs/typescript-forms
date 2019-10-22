import RequiredStringValidator from "./validator/RequiredStringValidator";
import MinimumLengthValidator from "./validator/MinimumLengthValidator";
import MaximumLengthValidator from "./validator/MaximumLengthValidator";
import ValidationError from "./validator/ValidationError";
import FormField, {FormFieldParameters} from "./FormField";
import EmailValidator from "./validator/EmailValidator";

export interface TextFieldParameters extends FormFieldParameters<string> {
    type: "text" | "email" | "password",
    autocomplete ? : "name" | "email" | "current-password" | "new-password",
    minLength ? : number,
    maxLength ? : number,
    placeholderKey ? : string
}

export default class TextField extends FormField<TextFieldParameters, string> {
    constructor(
        public readonly parameters: TextFieldParameters
    ) {
        super(parameters);
    }

    validate() : ValidationError[] {
        let result: ValidationError[] = [];

        let validators = this.parameters.validators || [];
        if (this.parameters.required) {
            validators.push(new RequiredStringValidator());
        }
        if (this.parameters.minLength) {
            validators.push(new MinimumLengthValidator(this.parameters.minLength));
        }
        if (this.parameters.maxLength) {
            validators.push(new MaximumLengthValidator(this.parameters.maxLength));
        }
        if (this.parameters.type === "email") {
            validators.push(new EmailValidator());
        }

        validators.forEach((validator) => {
            if (!validator.validate(this.getValue())) {
                result.push({
                    key: validator.key(),
                    messageKey: validator.helpTextKey(),
                    parameters: validator.parameters()
                })
            }
        });
        return result;
    }

    getType(): string {
        return "text";
    }
}