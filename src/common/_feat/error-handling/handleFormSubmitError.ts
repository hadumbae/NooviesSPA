/**
 * @fileoverview Utility for handling form submission errors and mapping validation errors to react-hook-form.
 */

import {FieldValues, Path, UseFormReturn} from "react-hook-form";
import {FormValidationError} from "@/common/_err/FormValidationError.ts";
import {handleSubmitResponseError} from "@/common/_feat/error-handling/handleSubmitResponseError.ts";
import {Logger} from "@/common/_feat/logger/Logger.ts";

/** Configuration for the form submit error handler. */
type HandlerConfig<TFormValues extends FieldValues, TForm extends FieldValues = TFormValues> = {
    form: UseFormReturn<TFormValues, unknown, TForm> | UseFormReturn<TFormValues>;
    error: unknown;
    displayMessage?: string;
};

/**
 * Processes submission errors by either setting form field errors or triggering a global error notification. */
export function handleFormSubmitError<TFormValues extends FieldValues, TForm extends FieldValues = TFormValues>(
    {form, error, displayMessage}: HandlerConfig<TFormValues, TForm>
): void {
    if (error instanceof FormValidationError) {
        const {errors} = error;
        Logger.error({msg: "Form Validation Failed: ", error, context: {errors}});

        for (let {path, message} of errors) {
            const formPath = path.map((v) => typeof v === "number" ? `${v}` : v).join(".") as Path<TFormValues>;
            form.setError(formPath, {type: "manual", message});
        }
    } else {
        handleSubmitResponseError({error, displayMessage});
    }
}