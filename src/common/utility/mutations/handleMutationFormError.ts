import {FieldValues, Path, UseFormReturn} from "react-hook-form";
import {FormValidationError} from "@/common/errors/FormValidationError.ts";
import handleMutationResponseError from "@/common/utility/mutations/handleMutationResponseError.ts";
import logger from "@/common/utility/logger/logger.ts";

/**
 * Parameters for {@link handleMutationFormError}.
 *
 * @template TFormValues - The shape of the form values managed by React Hook Form.
 */
type FormErrorParams<TFormValues extends FieldValues> = {
    /**
     * The React Hook Form instance controlling the form.
     */
    form: UseFormReturn<TFormValues>;

    /**
     * The error object thrown during the mutation or form submission.
     *
     * Can be:
     * - A {@link FormValidationError} containing validation issues for specific fields.
     * - Any other error type, which will be delegated to {@link handleMutationResponseError}.
     */
    error: unknown;

    /**
     * Optional fallback message to display if the error does not have a specific message.
     *
     * This is passed to {@link handleMutationResponseError} for non-validation errors.
     */
    displayMessage?: string;
};

/**
 * Handles errors that occur during form mutation or submission.
 *
 * - If the error is a {@link FormValidationError}:
 *   - Extracts validation issues.
 *   - Maps error paths to form field names compatible with React Hook Form.
 *   - Sets manual errors on the corresponding form fields using `form.setError`.
 *
 * - If the error is not a {@link FormValidationError}, delegates handling
 *   to {@link handleMutationResponseError}, optionally passing a fallback message.
 *
 * @template TFormValues - The shape of the form values managed by React Hook Form.
 * @param {FormErrorParams<TFormValues>} params - Parameters including the form, error, and optional fallback message.
 *
 * @example
 * ```ts
 * try {
 *   await submitSeatForm(data);
 * } catch (error) {
 *   handleMutationFormError({ form, error, displayMessage: "Failed to submit seat." });
 * }
 * ```
 */
export default function handleMutationFormError<TFormValues extends FieldValues>(
    {form, error, displayMessage}: FormErrorParams<TFormValues>
) {
    if (error instanceof FormValidationError) {
        logger.error("Form Validation Failed: ", error.errors);

        for (let validationError of error.errors) {
            const {path, message} = validationError;

            const formPath = path
                .map((v) => typeof v === "number" ? `${v}` : v)
                .join(".") as Path<TFormValues>;

            form.setError(formPath, {type: "manual", message});
        }

        return;
    }

    handleMutationResponseError({error, displayMessage});
}
