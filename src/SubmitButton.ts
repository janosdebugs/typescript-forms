import ValidationError from "./validator/ValidationError";
import FormField, {FormFieldParameters} from "./FormField";

export interface SubmitButtonParameters extends FormFieldParameters<void> {

}

export default class SubmitButton extends FormField<SubmitButtonParameters, void>{
    constructor(
        public readonly parameters: SubmitButtonParameters
    ) {
        super(parameters);
    }

    validate() : ValidationError[] {
        return [];
    }

    getType(): string {
        return "submit";
    }
}