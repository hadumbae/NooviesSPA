/**
 * @file Custom React Hook for managing the "Set Review Rating" moderation form state.
 * @filename useSetReviewRatingForm.ts
 */

import {useMemo} from "react";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    SetReviewRatingFormData,
    SetReviewRatingFormSchema
} from "@/domains/review/features/admin-actions/forms/SetReviewRatingFormSchema.ts";

/**
 * Configuration options for initializing the manual rating override form.
 */
type FormProps = {
    /** Optional initial data to populate the form fields (e.g., current rating). */
    presetValues?: Partial<SetReviewRatingFormData>;
}

/**
 * A specialized hook for handling validation and state for rating-adjustment moderation.
 * ---
 * @param props - Form configuration including optional presets.
 * @returns {UseFormReturn<SetReviewRatingFormData>} Standard hook-form methods and state.
 */
export function useSetReviewRatingForm(
    {presetValues}: FormProps = {}
): UseFormReturn<SetReviewRatingFormData> {
    const defaultValues: SetReviewRatingFormData = useMemo((): SetReviewRatingFormData => ({
        rating: 0,
        message: "",
        ...presetValues,
    }), [presetValues]);

    return useForm<SetReviewRatingFormData>({
        resolver: zodResolver(SetReviewRatingFormSchema),
        defaultValues,
        /** Delays validation until the 'Submit' action to reduce UI noise */
        mode: "onSubmit",
    });
}