import {FieldValues, Path, UseFormReturn} from "react-hook-form";
import {FormValidationError} from "@/common/errors/FormValidationError.ts";
import {toast} from "react-toastify";
import handleMutationResponseError from "@/common/utility/mutations/handleMutationResponseError.ts";

/**
 * Parameters for handling form errors in a mutation.
 *
 * @template TFormValues - The shape of the form values, extending react-hook-form's FieldValues.
 */
type FormErrorParams<TFormValues extends FieldValues> = {
    /** The form instance returned from `useForm` hook */
    form: UseFormReturn<TFormValues>;

    /** The error object to handle, can be any unknown value */
    error: unknown;
};

/**
 * Handles mutation errors related to forms by setting form errors and showing toast notifications.
 *
 * Specifically handles `FormValidationError` by applying validation errors to the form fields.
 * For other errors, it delegates to `handleMutationResponseError`.
 *
 * @template TFormValues - The shape of the form values, extending react-hook-form's FieldValues.
 * @param params - The parameters object containing the form instance and the error to handle.
 */
export default function handleMutationFormError<TFormValues extends FieldValues>(
    {form, error}: FormErrorParams<TFormValues>
) {
    if (error instanceof FormValidationError) {
        toast.error("Form submit failed. Please try again.");

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

    handleMutationResponseError(error);
}