/**
 * @file Custom React Hook for managing base moderation justification forms.
 * @filename useModerationMessageForm.ts
 */

import {
    ModerationMessageFormData,
    ModerationMessageFormSchema
} from "@/common/features/moderation/forms/ModerationMessageFormSchema.ts";
import {useForm, UseFormReturn} from "react-hook-form";
import {useMemo} from "react";
import {zodResolver} from "@hookform/resolvers/zod";

/**
 * Parameters for initializing the base moderation message form.
 */
type FormParams = {
    /** Optional initial data to populate the justification message. */
    presetValues?: Partial<ModerationMessageFormData>;
}

/**
 * A reusable hook for simple moderation actions that only require an audit message.
 * ---
 * @param params - Configuration containing optional initial form values.
 * @returns {UseFormReturn<ModerationMessageFormData>} Standard hook-form methods and state.
 */
export function useModerationMessageForm(
    {presetValues}: FormParams = {}
): UseFormReturn<ModerationMessageFormData> {

    const defaultValues: ModerationMessageFormData = useMemo(() => ({
        message: "",
        ...presetValues,
    }), [presetValues]);

    return useForm<ModerationMessageFormData>({
        resolver: zodResolver(ModerationMessageFormSchema),
        defaultValues,
        mode: "onSubmit",
    });
}