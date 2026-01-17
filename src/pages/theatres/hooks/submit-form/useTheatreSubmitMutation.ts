/**
 * @file useTheatreSubmitMutation.ts
 *
 * React Query mutation hook for creating or updating `Theatre` entities.
 *
 * Responsibilities:
 * - Submit form data via {@link TheatreRepository}
 * - Validate responses with {@link TheatreSchema}
 * - Surface toast notifications
 * - Map API errors back to React Hook Form
 * - Invalidate related theatre query caches
 */

import {UseFormReturn} from "react-hook-form";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {toast} from "react-toastify";

import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";
import {TheatreSchema} from "@/pages/theatres/schema/model/theatre/Theatre.schema.ts";
import {Theatre} from "@/pages/theatres/schema/model/theatre/Theatre.types.ts";
import {TheatreForm, TheatreFormValues} from "@/pages/theatres/schema/forms/TheatreForm.types.ts";

import {ParseError} from "@/common/errors/ParseError.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";

import {
    MutationEditByIDParams,
    MutationOnSubmitParams,
} from "@/common/type/form/MutationSubmitParams.ts";

import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {TheatreQueryKeys} from "@/pages/theatres/utilities/query/TheatreQueryKeys.ts";

/**
 * Parameters for {@link useTheatreSubmitMutation}.
 *
 * Combines:
 * - Submit lifecycle callbacks and messaging
 * - Optional edit mode and entity ID
 * - React Hook Form instance
 */
export type TheatreSubmitMutationParams =
    MutationOnSubmitParams<Theatre> &
    MutationEditByIDParams & {
    /**
     * Bound React Hook Form instance.
     */
    form: UseFormReturn<TheatreFormValues>;
};

/**
 * Mutation hook for submitting theatre form data.
 *
 * Automatically switches between create and update modes
 * based on `isEditing`, validates responses, and keeps the
 * React Query cache in sync.
 *
 * @param params Mutation configuration and form handlers
 * @returns React Query mutation result
 *
 * @example
 * ```ts
 * const form = useForm<TheatreFormValues>();
 *
 * const mutation = useTheatreSubmitMutation({
 *   form,
 *   isEditing: false,
 *   successMessage: "Theatre created!",
 * });
 *
 * mutation.mutate(form.getValues());
 * ```
 */
export default function useTheatreSubmitMutation(
    params: TheatreSubmitMutationParams
): UseMutationResult<Theatre, unknown, TheatreForm> {
    const {
        successMessage,
        onSubmitSuccess,
        errorMessage,
        onSubmitError,
        isEditing,
        _id,
        form,
    } = params;

    /**
     * Invalidates theatre-related query caches after mutation.
     */
    const invalidateQueries = useInvalidateQueryKeys();

    /**
     * Executes the create or update request and validates the response.
     *
     * @throws {@link ParseError} When schema validation fails
     */
    const submitTheatreData = async (values: TheatreForm): Promise<Theatre> => {
        const action = isEditing
            ? () => TheatreRepository.update({_id, data: values})
            : () => TheatreRepository.create({data: values});

        const returnData = await handleMutationResponse({
            action,
            errorMessage: "Failed to submit data. Please try again.",
        });

        const {success, data, error} = TheatreSchema.safeParse(returnData);

        if (!success) {
            toast.error("Invalid data returned. Please try again.");
            throw new ParseError({
                errors: error?.errors,
                message: "Invalid Theatre Data.",
            });
        }

        return data;
    };

    /**
     * Handles successful submission.
     */
    const onSuccess = (theatre: Theatre): void => {
        invalidateQueries(
            [
                TheatreQueryKeys.ids({_id: theatre._id}),
                TheatreQueryKeys.slugs({slug: theatre.slug}),
                TheatreQueryKeys.paginated(),
                TheatreQueryKeys.query(),
            ],
            {exact: false},
        );

        toast.success(
            successMessage ??
            (isEditing ? "Theatre updated." : "Theatre created.")
        );

        onSubmitSuccess?.(theatre);
    };

    /**
     * Handles submission errors.
     */
    const onError = (error: unknown): void => {
        toast.error(errorMessage || "Oops. Something went wrong.");
        handleMutationFormError({form, error});
        onSubmitError?.(error);
    };

    /**
     * Registers the mutation.
     */
    return useMutation({
        mutationKey: ["submit_theatre_data"],
        mutationFn: submitTheatreData,
        onSuccess,
        onError,
    });
}
