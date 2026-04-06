/**
 * @file Custom React Hook for managing the "Reset Display Name" moderation form state.
 * @filename useResetReviewDisplayNameForm.ts
 */

import {
    ResetReviewDisplayNameFormData,
    ResetReviewDisplayNameFormSchema
} from "@/domains/review/features/admin-actions/forms/ResetReviewDisplayNameFormSchema.ts";
import {useMemo} from "react";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

/**
 * Configuration options for initializing the Reset Display Name form.
 */
type FormProps = {
    /** Optional initial data to populate the form fields (e.g., current name). */
    presetValues?: Partial<ResetReviewDisplayNameFormData>;
}

/**
 * A specialized hook for handling validation and state for name-reset moderation.
 * ---
 * @param props - Form configuration including optional presets.
 * @returns {UseFormReturn<ResetReviewDisplayNameFormData>} Standard hook-form methods and state.
 */
export function useResetReviewDisplayNameForm(
    {presetValues}: FormProps = {}
): UseFormReturn<ResetReviewDisplayNameFormData> {
    const defaultValues: ResetReviewDisplayNameFormData = useMemo(() => ({
        displayName: "",
        message: "",
        ...presetValues,
    }), [presetValues]);

    return useForm<ResetReviewDisplayNameFormData>({
        resolver: zodResolver(ResetReviewDisplayNameFormSchema),
        defaultValues,
        mode: "onSubmit",
    });
}