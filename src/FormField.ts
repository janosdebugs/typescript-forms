import Validator from "./validator/Validator";
import ValidationError from "./validator/ValidationError";

export interface FormFieldParameters<DATATYPE> {
    required?: boolean,
    disabled?: boolean,
    name: string,
    labelKey: string,
    helpText?: string,
    initialValue?: DATATYPE,
    validators?: Validator<DATATYPE>[]
}

export default abstract class FormField<PARAMETERTYPE extends FormFieldParameters<DATATYPE>, DATATYPE> {
    protected value?: DATATYPE;
    protected serverErrors: ValidationError[] = [];

    constructor(
        public readonly parameters: PARAMETERTYPE
    ) {
        this.value = parameters.initialValue;
    }
    setServerErrors(errors: ValidationError[]): void {
        this.serverErrors = errors;
    }
    getServerErrors():ValidationError[] {
        return this.serverErrors;
    }
    validate():ValidationError[] {
        let result:ValidationError[] = [];
        let validators = this.parameters.validators || [];

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
    setValue(value?: DATATYPE):void {
        this.value = value;
    }
    getValue():DATATYPE|undefined {
        return this.value;
    }
    abstract getType() : string;
}
