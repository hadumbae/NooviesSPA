/**
 * @fileoverview Custom React Hook for managing base moderation justification forms.
 */

import {
    ModerationMessageFormData,
    ModerationMessageFormSchema, ModerationMessageFormValues
} from "@/common/_feat/moderation/forms/ModerationMessageFormSchema.ts";
import {useForm, UseFormReturn} from "react-hook-form";
import {useMemo} from "react";
import {zodResolver} from "@hookform/resolvers/zod";

/** Parameters for initializing the base moderation message form. */
type FormParams = {
    presetValues?: Partial<ModerationMessageFormData>;
}

/** A reusable hook for simple moderation actions that only require an audit message. */
export function useModerationMessageForm(
    {presetValues}: FormParams = {}
): UseFormReturn<ModerationMessageFormValues, unknown, ModerationMessageFormData> {

    const defaultValues: ModerationMessageFormValues = useMemo(() => ({
        message: "",
        ...presetValues,
    }), [presetValues]);

    return useForm<ModerationMessageFormValues, unknown, ModerationMessageFormData>({
        resolver: zodResolver(ModerationMessageFormSchema),
        defaultValues,
        mode: "onSubmit",
    });
}