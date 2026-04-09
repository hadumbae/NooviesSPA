/**
 * @file Form wrapper for administrative operations that reset movie review likes.
 * @filename ResetReviewLikesForm.tsx
 */

import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {MovieReview} from "@/domains/review/schemas/models/MovieReview.types.ts";
import {ReactNode} from "react";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {ModerationMessageFormData, useModerationMessageForm} from "@/common/features/moderation/forms";
import {useResetReviewLikesMutation} from "@/domains/review/features/admin-actions/mutations";
import {AdminReviewActionFormContextProvider} from "@/domains/review/features/admin-actions/context";
import {Form} from "@/common/components/ui/form.tsx";

/**
 * Props for the ResetReviewLikesForm component.
 */
type FormProps = MutationOnSubmitParams<MovieReview> & {
    /** The nested UI components, typically including the dialog trigger and fields. */
    children: ReactNode;
    /** Unique identifier suffix to ensure form ID uniqueness in multi-form views. */
    uniqueKey?: string;
    /** The target review's database ID. */
    reviewID: ObjectId;
    /** Optional initial state for the moderation message field. */
    presetValues?: Partial<ModerationMessageFormData>;
};

/**
 * Orchestrates the data flow and submission logic for resetting review like counts.
 * ---
 */
export const ResetReviewLikesForm = (
    {children, uniqueKey, reviewID, presetValues, ...onSubmitParams}: FormProps
) => {
    const formKey = `reset-review-likes-${uniqueKey ?? "form"}`;
    const form = useModerationMessageForm({presetValues});
    const {mutate} = useResetReviewLikesMutation({
        reviewID,
        form,
        onSubmit: onSubmitParams
    });

    const resetLikes = (values: ModerationMessageFormData) => {
        mutate(values);
    };

    return (
        <AdminReviewActionFormContextProvider reviewID={reviewID} formID={formKey}>
            <Form {...form}>
                <form
                    id={formKey}
                    onSubmit={form.handleSubmit(resetLikes)}
                >
                    {children}
                </form>
            </Form>
        </AdminReviewActionFormContextProvider>
    );
};