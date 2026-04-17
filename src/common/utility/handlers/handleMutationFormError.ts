/**
 * @fileoverview Utility for mapping backend and mutation errors back to
 * React Hook Form field states.
 */

import {FieldValues, Path, UseFormReturn} from "react-hook-form";
import {FormValidationError} from "@/common/errors/FormValidationError.ts";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import Logger from "@/common/utility/features/logger/Logger.ts";

/**
 * Parameters for the {@link handleMutationFormError} utility.
 */
type FormErrorParams<TFormValues extends FieldValues, TForm extends FieldValues = TFormValues> = {
    form: UseFormReturn<TFormValues, unknown, TForm>;
    error: unknown;
    displayMessage?: string;
};

/**
 * Orchestrates error feedback for form submissions.
 */
export default function handleMutationFormError<
    TFormValues extends FieldValues, TForm extends FieldValues = TFormValues
>(
    {form, error, displayMessage}: FormErrorParams<TFormValues, TForm>
): void {
    if (error instanceof FormValidationError) {
        const {errors} = error;

        Logger.error({msg: "Form Validation Failed: ", error, context: {errors}});

        for (let validationError of errors) {
            const {path, message} = validationError;

            const formPath = path
                .map((v) => typeof v === "number" ? `${v}` : v)
                .join(".") as Path<TFormValues>;

            form.setError(formPath, {type: "manual", message});
        }
    } else {
        handleMutationResponseError({error, displayMessage});
    }
}