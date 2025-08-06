import {FieldValues, Path, UseFormReturn} from "react-hook-form";
import {FormValidationError} from "@/common/errors/FormValidationError.ts";
import handleMutationResponseError from "@/common/utility/mutations/handleMutationResponseError.ts";

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
     * This can be:
     * - A {@link FormValidationError} representing validation errors that should
     *   be applied to the form fields.
     * - Any other error type, which will be delegated to
     *   {@link handleMutationResponseError}.
     */
    error: unknown;

    /**
     * Optional fallback message to display if the error does not have a
     * specific message.
     */
    fallbackMessage?: string;
};

/**
 * Handles errors that occur during form mutation or submission.
 *
 * If the error is a {@link FormValidationError}, this function:
 * - Extracts the validation issues.
 * - Maps error paths to form field names compatible with React Hook Form.
 * - Sets manual errors on the corresponding form fields.
 *
 * If the error is not a {@link FormValidationError}, it delegates handling
 * to {@link handleMutationResponseError}, optionally passing a fallback message.
 *
 * @template TFormValues - The shape of the form values managed by React Hook Form.
 * @param {FormErrorParams<TFormValues>} params - Parameters including the form, error, and optional fallback message.
 */
export default function handleMutationFormError<TFormValues extends FieldValues>(
    {form, error, fallbackMessage}: FormErrorParams<TFormValues>
) {
    if (error instanceof FormValidationError) {
        const {errors} = error;

        for (let validationError of errors) {
            const {path, message} = validationError;

            const formPath = path
                .map((v) => typeof v === "number" ? `${v}` : v)
                .join(".") as Path<TFormValues>;

            form.setError(formPath, {type: "manual", message});
        }

        return;
    }

    handleMutationResponseError({error, errorMessage: fallbackMessage});
}