import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {
    MovieCreditSubmit
} from "@/pages/moviecredit/schemas/model/form/MovieCreditSubmitSchema.ts";
import MovieCreditRepository from "@/pages/moviecredit/repositories/MovieCreditRepository.ts";
import {toast} from "react-toastify";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {MovieCredit} from "@/pages/moviecredit/schemas/model/base/MovieCreditSchema.ts";

/**
 * Parameters for configuring the movie credit submit mutation.
 */
interface SubmitParams {
    /** Optional callback invoked after a successful movie credit submission. */
    onSubmit?: (credit: MovieCredit) => void;

    /** Optional callback invoked when the submission fails. */
    onFail?: (error: Error) => void;

    /** Custom message to display in a toast upon successful submission. */
    successToast?: string;

    /** Custom message to display in a toast upon submission failure. */
    errorToast?: string;

    /** Whether to populate related data in the response. Defaults to false. */
    populate?: boolean;
}

/**
 * React hook to submit a new movie credit via a mutation.
 *
 * This hook wraps the {@link MovieCreditRepository.create} function and integrates
 * with `react-query`'s `useMutation` to manage the mutation lifecycle.
 *
 * It handles error and success feedback via `react-toastify`, and allows optional
 * side effect callbacks through the {@link SubmitParams}.
 *
 * @param params - Callbacks and optional toast messages for mutation outcomes.
 * @returns A `react-query` mutation object for submitting a {@link MovieCreditSubmit} payload.
 */
export default function useMovieCreditSubmitMutation(
    params?: SubmitParams
): UseMutationResult<MovieCredit, Error, MovieCreditSubmit> {
    const queryClient = useQueryClient();
    const {onSubmit, onFail, successToast, errorToast, populate = false} = params || {};

    const mutationKey = ["submit_single_movie_credit"];

    const submitData = async (values: MovieCreditSubmit) => {
        console.log("Movie Credit Submit: ", values);

        const {response, result} = await MovieCreditRepository.create({data: values, populate});
        if (!response.ok) throw new HttpResponseError({response});

        return result;
    }

    const onSuccess = async (credit: MovieCredit) => {
        const queryKeys = [
            "fetch_all_movie_credits",
            "fetch_paginated_movie_credits",
        ];

        await Promise.all(queryKeys.map(key =>
            queryClient.invalidateQueries({queryKey: [key], exact: false})));

        toast.success(successToast || "Created movie credit successfully.");
        onSubmit && onSubmit(credit);
    }

    const onError = (error: Error) => {
        toast.error(errorToast || "Failed to create movie credit. Please try again.")
        onFail && onFail(error);
    }

    return useMutation({
        mutationKey,
        mutationFn: submitData,
        onSuccess,
        onError,
    });
}