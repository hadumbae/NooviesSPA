/**
 * @fileoverview Custom React Hook for managing the Reset Display Name moderation form state.
 */

import {
    ResetReviewDisplayNameFormData,
    ResetReviewDisplayNameFormSchema, ResetReviewDisplayNameFormValues
} from "@/domains/movieReviews/_feat/admin-actions/forms/ResetReviewDisplayNameFormSchema.ts";
import {useMemo} from "react";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

/** Props for the useResetReviewDisplayNameForm hook. */
type FormProps = {
    presetValues?: Partial<ResetReviewDisplayNameFormData>;
}

/** Specialized hook for handling validation and state for name-reset moderation. */
export function useResetReviewDisplayNameForm(
    {presetValues}: FormProps = {}
): UseFormReturn<ResetReviewDisplayNameFormValues, unknown, ResetReviewDisplayNameFormData> {
    const defaultValues: ResetReviewDisplayNameFormData = useMemo(() => ({
        displayName: "",
        message: "",
        ...presetValues,
    }), [presetValues]);

    return useForm<ResetReviewDisplayNameFormValues, unknown, ResetReviewDisplayNameFormData>({
        resolver: zodResolver(ResetReviewDisplayNameFormSchema),
        defaultValues,
        mode: "onSubmit",
    });
}