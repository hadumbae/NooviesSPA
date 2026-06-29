/**
 * @fileoverview React Query mutation hook for movie credit creation and updates.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {MovieCreditDetails, MovieCreditDetailsSchema} from "@/domains/movie-credits/_schemas";
import {MovieCreditFormData} from "@/domains/movie-credits/_feat/submit-data";
import {create, update} from "@/domains/movie-credits/_feat/crud";
import {MovieCreditCRUDQueryKeys} from "@/domains/movie-credits/_feat/crud-hooks/queryKeys.ts";
import {MovieCreditCRUDMutationKeys} from "@/domains/movie-credits/_feat/crud-hooks/mutationKeys.ts";

/** Manages movie credit form submissions including validation and cache synchronization. */
export function useMovieCreditSubmitMutation(): UseMutationResult<MovieCreditDetails, unknown, MovieCreditFormData> {
    const queryClient = useQueryClient();
    const config = {populate: true, virtuals: true};

    const submitMovieCreditData = async ({_id, ...data}: MovieCreditFormData) => {
        const action = _id ? () => update({_id, data, config}) : () => create({data, config});
        const {result} = await action();

        const {data: parsed, success, error} = validateData({
            data: result,
            schema: MovieCreditDetailsSchema,
            message: "Invalid data returned. Please try again.",
        });

        if (!success) throw error;
        return parsed;
    };

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: MovieCreditCRUDQueryKeys.all, exact: false});
    };

    return useMutation({
        mutationKey: MovieCreditCRUDMutationKeys.submit(),
        mutationFn: submitMovieCreditData,
        onSuccess,
    });
}