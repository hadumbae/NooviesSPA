/**
 * @file Container component for the "Reset Review Likes" moderation form.
 * @filename ResetReviewLikesForm.tsx
 */

import {Form} from "@/common/components/ui/form.tsx";
import {useResetReviewLikesMutation} from "@/domains/review/features/admin-actions/mutations";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {MovieReview} from "@/domains/review/schemas/models/MovieReview.types.ts";
import {ReactNode} from "react";
import {AdminReviewActionFormContextProvider} from "@/domains/review/features/admin-actions/context";
import {ModerationMessageFormData, useModerationMessageForm} from "@/common/features/moderation/forms";

/**
 * Props for the ResetReviewLikesForm component.
 */
type FormProps = MutationOnSubmitParams<MovieReview> & {
    /** Nested UI components such as the justification textarea and submit buttons. */
    children: ReactNode;
    /** The ID of the review whose likes are to be cleared. */
    reviewID: ObjectId;
    /** Optional identifier to prevent ID collisions if multiple forms exist in the DOM. */
    uniqueKey?: string;
    /** Initial values for the moderation justification message. */
    presetValues?: Partial<ModerationMessageFormData>;
};

/**
 * Facilitates the administrative action of clearing engagement metrics (likes) from a review.
 * ---
 */
export const ResetReviewLikesForm = (
    {children, uniqueKey, reviewID, presetValues, ...onSubmitProps}: FormProps
) => {
    const formKey = `reset-review-likes-${uniqueKey ?? "form"}`;

    const form = useModerationMessageForm({presetValues});

    const {mutate} = useResetReviewLikesMutation({
        form,
        reviewID,
        onSubmit: onSubmitProps
    });

    const onSubmit = (values: ModerationMessageFormData) => {
        mutate(values);
    };

    return (
        <AdminReviewActionFormContextProvider formID={formKey} reviewID={reviewID}>
            <Form {...form}>
                <form id={formKey} onSubmit={form.handleSubmit(onSubmit)}>
                    {children}
                </form>
            </Form>
        </AdminReviewActionFormContextProvider>
    );
};