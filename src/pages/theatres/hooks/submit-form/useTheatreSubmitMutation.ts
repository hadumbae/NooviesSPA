/**
 * @file useTheatreSubmitMutation.ts
 *
 * React Query mutation hook for submitting theatre form data.
 *
 * Supports both create and update workflows, handling:
 * - API submission via {@link TheatreRepository}
 * - Response validation with {@link TheatreSchema}
 * - Toast-based user feedback
 * - Form-level error mapping
 * - Query cache invalidation
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

import {
    TheatreIDQueryKeys,
    TheatreListQueryKeys,
} from "@/pages/theatres/constants/TheatreQueryKeys.ts";

import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";

/**
 * Parameters for {@link useTheatreSubmitMutation}.
 *
 * Composes:
 * - {@link MutationOnSubmitParams} for messaging and callbacks
 * - {@link MutationEditByIDParams} for edit state and entity ID
 * - {@link UseFormReturn} for form state management
 */
export type TheatreSubmitMutationParams = MutationOnSubmitParams<Theatre> & MutationEditByIDParams & {
    /**
     * React Hook Form instance bound to the theatre form.
     */
    form: UseFormReturn<TheatreFormValues>;
};

/**
 * React hook for submitting theatre form data.
 *
 * Internally wraps {@link useMutation} to:
 * - Create or update a theatre entity
 * - Validate returned data against a schema
 * - Display success and error notifications
 * - Handle API-driven form errors
 * - Invalidate relevant theatre queries
 *
 * @param params - Mutation configuration and form handlers.
 * @returns A {@link UseMutationResult} for theatre submission.
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
     * Query keys invalidated after a successful mutation.
     *
     * Covers:
     * - Theatre detail queries
     * - Theatre list queries
     */
    const keys = [...TheatreIDQueryKeys, ...TheatreListQueryKeys].map(key => [key]);
    const invalidateQueries = useInvalidateQueryKeys({keys, exact: false});

    /**
     * Submits theatre data to the backend.
     *
     * - Chooses create or update based on `isEditing`
     * - Normalizes API error handling
     * - Validates the response payload
     *
     * @param values - Form values to submit.
     * @returns The validated {@link Theatre} entity.
     *
     * @throws {@link ParseError} If returned data fails schema validation.
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
     * Handles successful mutation completion.
     *
     * - Invalidates cached theatre queries
     * - Displays a success notification
     * - Invokes the optional success callback
     */
    const onSuccess = async (theatre: Theatre): Promise<void> => {
        await invalidateQueries();

        const message = isEditing ? "Theatre updated." : "Theatre created.";
        toast.success(successMessage || message);

        onSubmitSuccess?.(theatre);
    };

    /**
     * Handles mutation errors.
     *
     * - Displays an error notification
     * - Maps API errors back to the form
     * - Invokes the optional error callback
     */
    const onError = (error: unknown): void => {
        toast.error(errorMessage || "Oops. Something went wrong.");
        handleMutationFormError({form, error});
        onSubmitError?.(error);
    };

    /**
     * Registers the theatre submission mutation.
     */
    return useMutation({
        mutationKey: ["submit_theatre_data"],
        mutationFn: submitTheatreData,
        onSuccess,
        onError,
    });
}
