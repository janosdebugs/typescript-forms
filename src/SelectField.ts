import {FormFieldParameters} from "./FormField";
import FormField from "./FormField";

export interface SelectFieldParameters extends FormFieldParameters<string> {
    options: Map<string, string>
}

export default class SelectField extends FormField<SelectFieldParameters, string> {
    constructor(
        public readonly parameters: SelectFieldParameters
    ) {
        super(parameters);
    }

    getType(): string {
        return "select";
    }

}