import FormField from "./FormField";
import ValidationError from "./validator/ValidationError";

export interface FormParameters {
    fields: FormField<any, any>[],
    serverErrors: Map<string, ValidationError[]>
}

export default abstract class Form<DATATYPE> {
    protected constructor(
        public readonly parameters: FormParameters
    ) {
        let serverErrors = parameters.serverErrors || {};

        parameters.fields.forEach((field) => {
            if (serverErrors.has(field.parameters.name)) {
                field.setServerErrors(serverErrors.get(field.parameters.name) as ValidationError[]);
            }
        });
    }

    public abstract onSubmit(data: DATATYPE):void;

    public validate() : Map<string, ValidationError[]> {
        let result = new Map<string, ValidationError[]>();
        this.parameters.fields.forEach((field) => {
            let validationResult = field.validate();
            if (validationResult.length > 0) {
                result.set(field.parameters.name, validationResult);
            }
        });
        return result;
    }

    public getValues() : DATATYPE {
        let result:any = {};
        this.parameters.fields.forEach((field) => {
            result[field.parameters.name] = field.getValue();
        });
        return result as DATATYPE;
    }
}
