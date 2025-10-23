import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {PersonImageRepository} from "@/pages/persons/repositories/PersonImageRepository.ts";
import {toast} from "react-toastify";
import {PersonProfileImageForm, PersonProfileImageFormValues} from "@/pages/persons/schema/forms/PersonForm.types.ts";
import {PersonSchema} from "@/pages/persons/schema/person/Person.schema.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import handleMutationFormError from "@/common/utility/mutations/handleMutationFormError.ts";
import {UseFormReturn} from "react-hook-form";
import {Person} from "@/pages/persons/schema/person/Person.types.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Parameters for submitting a profile image for a `Person`.
 *
 * Extends {@link MutationOnSubmitParams} but overrides
 * `onSubmitSuccess` and `onSubmitError` to use a `Person`-specific signature.
 */
type ImageSubmitParams = Omit<MutationOnSubmitParams, "onSubmitSuccess" | "onSubmitError"> & {
    /**
     * The ObjectId of the `Person` whose profile image will be updated.
     */
    _id: ObjectId;

    /**
     * The react-hook-form instance managing the profile image form.
     */
    form: UseFormReturn<PersonProfileImageFormValues>;

    /**
     * Called when the profile image is successfully uploaded and validated.
     *
     * @param person - The updated `Person` object returned by the API.
     */
    onSubmitSuccess?: (person: Person) => void;

    /**
     * Called when an error occurs during the submission process.
     *
     * @param error - The error object thrown by the mutation.
     */
    onSubmitError?: (error: unknown) => void;
};

/**
 * React Query mutation hook for submitting a new profile image for a `Person`.
 *
 * This hook:
 * - Uploads the selected image file to the server.
 * - Validates the server response against {@link PersonSchema}.
 * - Displays success/error toasts.
 * - Invalidates relevant React Query caches so updated data is fetched.
 * - Maps API and validation errors to form-level errors using {@link handleMutationFormError}.
 *
 * @param params - Configuration for the mutation, including:
 *   - `form`: react-hook-form instance for error handling.
 *   - `_id`: The ID of the person being updated.
 *   - `successMessage` / `errorMessage`: Optional custom messages for toasts.
 *   - `onSubmitSuccess` / `onSubmitError`: Optional lifecycle callbacks.
 *
 * @returns A `useMutation` result object configured for uploading a profile image.
 *
 * @example
 * ```ts
 * const form = useForm<PersonProfileImageFormValues>();
 *
 * const mutation = usePersonProfileImageSubmitMutation({
 *   _id: personId,
 *   form,
 *   successMessage: "Profile picture updated!",
 *   onSubmitSuccess: (person) => console.log("Updated:", person),
 * });
 *
 * const onSubmit = form.handleSubmit(values => mutation.mutate(values));
 * ```
 */
export default function usePersonProfileImageSubmitMutation(params: ImageSubmitParams) {
    const queryClient = useQueryClient();
    const {_id, form, onSubmitSuccess, onSubmitError, successMessage, errorMessage} = params;

    const mutationKey = ["submit_person_profile_image", _id] as const;

    const uploadImage = async (formValues: PersonProfileImageForm): Promise<Person> => {
        const formData = new FormData();
        formData.append("profileImage", formValues.profileImage);

        const data = await handleMutationResponse({
            errorMessage: "Failed to submit profile image. Please try again.",
            action: () => PersonImageRepository.uploadProfileImage({personID: _id, data: formData}),
        });

        const {data: parsedData, success, error} = validateData({
            data,
            schema: PersonSchema,
            message: "Invalid data returned from API."
        });

        if (!success) throw error;
        return parsedData;
    }

    const onSuccess = async (person: Person) => {
        toast.success(successMessage ?? "Image upload successfully.");

        await Promise.all([
            queryClient.invalidateQueries({queryKey: ["fetch_single_person"], exact: false}),
            queryClient.invalidateQueries({queryKey: ["fetch_person_by_query"], exact: false}),
        ]);

        onSubmitSuccess && onSubmitSuccess(person);
    }

    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Failed to submit profile image. An error occurred. Please try again.";
        handleMutationFormError({form, error, displayMessage});
        onSubmitError && onSubmitError(error);
    }

    return useMutation<Person, unknown, PersonProfileImageForm>({
        mutationKey,
        mutationFn: uploadImage,
        onSuccess,
        onError,
    });
}