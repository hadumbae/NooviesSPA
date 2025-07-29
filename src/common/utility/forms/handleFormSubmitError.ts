import {FieldValues, Path, UseFormReturn} from "react-hook-form";
import {FormValidationError} from "@/common/errors/FormValidationError.ts";

type HandlerParams<TForm extends FieldValues> = {
    form: UseFormReturn<TForm>;
    error: Error;
}

export default function handleFormSubmitError<TForm extends FieldValues>({form, error}: HandlerParams<TForm>): void {
    if (error instanceof FormValidationError) {
        const {errors} = error;
        console.error("Form Validation Issues: ", errors);

        for (let validationError of errors) {
            const {path, message} = validationError;

            const formPath = path
                .map((v) => typeof v === "number" ? `${v}` : v)
                .join(".") as Path<TForm>;

            form.setError(formPath, {type: "manual", message});
        }
    }
}