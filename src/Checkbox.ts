import ValidationError from "./validator/ValidationError";
import FormField, {FormFieldParameters} from "./FormField";
import RequiredBooleanValidator from "./validator/RequiredBooleanValidator";

export interface CheckboxParameters extends FormFieldParameters<boolean> {

}

export default class Checkbox extends FormField<CheckboxParameters, boolean>{
    constructor(
        public readonly parameters: CheckboxParameters
    ) {
        super(parameters);
    }

    validate() : ValidationError[] {
        let result: ValidationError[] = [];
        let validators = this.parameters.validators || [];
        if (this.parameters.required) {
            validators.push(new RequiredBooleanValidator());
        }
        validators.forEach((validator) => {
            if (!validator.validate(this.getValue())) {
                result.push({
                    key: validator.key(),
                    messageKey: validator.helpTextKey(),
                    parameters: validator.parameters()
                });
            }
        });
        return result;
    }

    getType(): string {
        return "checkbox";
    }
}