import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import MovieCreditRepository from "@/pages/moviecredit/repositories/MovieCreditRepository.ts";
import {MovieCreditSubmit} from "@/pages/moviecredit/schemas/form/MovieCreditSubmitSchema.ts";
import {toast} from "react-toastify";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {MovieCredit} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";

/**
 * Parameters for updating a movie credit.
 */
interface UpdateParams {
    /** ID of the movie credit to update. */
    _id: ObjectId;

    /** Whether to populate related fields in the response. Defaults to false. */
    populate?: boolean;

    /** Callback executed on successful update. */
    onSubmit?: (credit: MovieCredit) => void;

    /** Callback executed when the update fails. */
    onFail?: (error: Error) => void;

    /** Custom message shown in a toast on success. */
    successToast?: string;

    /** Custom message shown in a toast on failure. */
    errorToast?: string;
}

/**
 * Custom React Query mutation hook to update a movie credit.
 *
 * This hook wraps the update logic using `useMutation` from TanStack Query.
 * It handles the request via {@link MovieCreditRepository.update}, invalidates
 * all relevant cache entries (e.g., movie credit detail, list, and pagination views),
 * and shows toast notifications on success or failure.
 *
 * @param params - UpdateParams including ID, populate flag, and optional callbacks.
 * @returns A `UseMutationResult` object for managing the mutation state and triggering updates.
 */
export default function useMovieCreditUpdateMutation(
    params: UpdateParams
): UseMutationResult<MovieCredit, Error, MovieCreditSubmit> {
    const queryClient = useQueryClient();
    const {_id, onSubmit, onFail, successToast, errorToast, populate = false} = params;

    const mutationKey = ["update_single_movie_credit", {_id}];

    const updateMovieCredit = async (values: MovieCreditSubmit) => {
        console.log("Movie Credit Update: ", values);

        const {response, result} = await MovieCreditRepository.update({_id, data: values, populate});
        if (!response.ok) throw new HttpResponseError({response});

        return result;
    }

    const onSuccess = async (credit: MovieCredit) => {
        const queryKeys = [
            "fetch_movie_credit",
            "fetch_all_movie_credits",
            "fetch_paginated_movie_credits",
        ];

        await Promise.all(queryKeys.map(key =>
            queryClient.invalidateQueries({queryKey: [key], exact: false})));

        toast.success(successToast || "Updated successfully.");
        onSubmit && onSubmit(credit);
    }

    const onError = (error: Error) => {
        toast.error(errorToast || "Failed to update movie credit. Please try again.")
        onFail && onFail(error);
    }

    return useMutation({
        mutationKey,
        mutationFn: updateMovieCredit,
        onSuccess,
        onError,
    });
}