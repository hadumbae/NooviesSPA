import {FieldValues, UseFormReturn} from "react-hook-form";
import {ParseError} from "@/common/errors/ParseError.ts";

/**
 * Parameters for the `handleFormSubmitError` function.
 *
 * @template TForm - The type of form fields, extending react-hook-form's `FieldValues`.
 */
type HandlerParams<TForm extends FieldValues> = {
    /** The react-hook-form methods and state for the form. */
    form: UseFormReturn<TForm>;

    /** The error thrown during form submission. */
    error: Error;
}

/**
 * Handles errors thrown during form submission, specifically `ParseError` instances
 * from schema validation (e.g., Zod), and sets them on the form using `setError`.
 *
 * This function is intended to be used inside an async form submit handler to catch
 * and surface validation errors back to the user interface.
 *
 * @template TForm - The type of the form values, extending `FieldValues`.
 * @param params - An object containing the form instance and the error thrown.
 */
export default function handleFormSubmitError<TForm extends FieldValues>({form, error}: HandlerParams<TForm>): void {
    if (error instanceof ParseError) {
        console.error("Zod Parsing Errors: ", error.errors);

        for (let validationError of error.errors) {
            const {path, message} = validationError;
            form.setError(path.join(".") as any, {type: "manual", message});
        }
    }
}