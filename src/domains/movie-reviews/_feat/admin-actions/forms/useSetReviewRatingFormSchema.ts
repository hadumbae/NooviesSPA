/**
 * @fileoverview Hook for managing the review rating moderation form state.
 */

import {useMemo} from "react";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    SetReviewRatingFormData,
    SetReviewRatingFormSchema,
    SetReviewRatingFormValues
} from "@/domains/movie-reviews/_feat/admin-actions/forms/SetReviewRatingFormSchema.ts";

/** Props for the useSetReviewRatingForm hook. */
type FormProps = {
    presetValues?: Partial<SetReviewRatingFormData>;
}

/**
 * Manages validation and state for the rating-adjustment moderation form.
 */
export function useSetReviewRatingForm(
    {presetValues}: FormProps = {}
): UseFormReturn<SetReviewRatingFormValues, unknown, SetReviewRatingFormData> {
    const defaultValues: SetReviewRatingFormData = useMemo((): SetReviewRatingFormData => ({
        rating: 0,
        message: "",
        ...presetValues,
    }), [presetValues]);

    return useForm<SetReviewRatingFormValues, unknown, SetReviewRatingFormData>({
        resolver: zodResolver(SetReviewRatingFormSchema),
        defaultValues,
        mode: "onSubmit",
    });
}