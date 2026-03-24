/**
 * @file React Query mutation hook for managing Theatre Screen persistence.
 * @filename useTheatreScreenSubmitMutation.ts
 */

import {toast} from "react-toastify";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import ScreenRepository from "@/domains/theatre-screens/repositories/ScreenRepository.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {SubmitMutationParams} from "@/common/type/form/MutationSubmitParams.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {ScreenQueryKeys} from "@/domains/theatre-screens/utilities/query/ScreenQueryKeys.ts";
import {TheatreScreenForm, TheatreScreenFormValues} from "@/domains/theatre-screens/forms";
import {TheatreScreenDetails, TheatreScreenDetailsSchema} from "@/domains/theatre-screens/schema/model";

/**
 * Configuration parameters for the {@link useTheatreScreenSubmitMutation} hook.
 * * Extends standard mutation parameters to bind {@link TheatreScreenFormValues} to a {@link TheatreScreenDetails} response.
 */
export type SubmitParams =
    SubmitMutationParams<TheatreScreenFormValues, TheatreScreenDetails>;

/**
 * A specialized mutation hook for creating or updating Theatre Screen records.
 * @param params - Configuration including form context, lifecycle callbacks, and custom messages.
 * @returns A TanStack Query mutation result object.
 */
export default function useTheatreScreenSubmitMutation(
    params: SubmitParams
): UseMutationResult<TheatreScreenDetails, unknown, TheatreScreenForm> {
    const {form, editID, onSubmitSuccess, onSubmitError, successMessage, errorMessage} = params;

    const config = {populate: true, virtuals: true};
    const invalidateQueries = useInvalidateQueryKeys();

    const submitScreenData = async (values: TheatreScreenForm) => {
        const action = editID
            ? () => ScreenRepository.update({_id: editID, data: values, config})
            : () => ScreenRepository.create({data: values, config});

        const returnData = await handleMutationResponse({
            action,
            errorMessage: "Failed to submit data. Please try again.",
        });

        const {data: parsedData, success, error} = validateData({
            data: returnData,
            schema: TheatreScreenDetailsSchema,
            message: "Invalid data returned. Please try again.",
        });

        if (!success) throw error;
        return parsedData;
    };

    const onSuccess = (screen: TheatreScreenDetails) => {
        invalidateQueries(
            [
                ScreenQueryKeys.ids({_id: screen._id}),
                ScreenQueryKeys.slugs({slug: screen.slug}),
                ScreenQueryKeys.query(),
                ScreenQueryKeys.paginated(),
            ],
            {exact: false}
        );

        if (successMessage) toast.success(successMessage);
        onSubmitSuccess?.(screen);
    };

    const onError = (error: unknown) => {
        const displayMessage = errorMessage || "Something went wrong. Please try again.";
        handleMutationFormError({form, error, displayMessage});
        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: ["submit_screen_data"],
        mutationFn: submitScreenData,
        onSuccess,
        onError,
    });
}