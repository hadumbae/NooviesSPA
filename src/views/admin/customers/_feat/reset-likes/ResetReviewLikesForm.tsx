/**
 * @fileoverview Form wrapper for administrative operations that reset movie review likes.
 */

import {ReactElement, ReactNode, useId} from "react";
import {ObjectId} from "@/common/_schemas";
import {ModerationMessageFormData, useModerationMessageForm} from "@/common/_feat/moderation/forms";
import {Form} from "@/common/components/ui/form.tsx";
import {MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";
import {MovieReview} from "@/domains/movie-reviews/_schema";
import {useResetReviewLikesMutation} from "@/domains/movie-reviews/_feat";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {handleCustomerReviewFormSubmit} from "@/domains/customers";


/** Props for the ResetReviewLikesForm component. */
type FormProps = MutationResponseConfig<MovieReview, ModerationMessageFormData> & MutationFormResetConfig & {
    children: ReactNode;
    reviewID: ObjectId;
    presetValues?: Partial<ModerationMessageFormData>;
};

/**
 * Orchestrates the data flow and submission logic for resetting review like counts.
 */
export function ResetReviewLikesForm(
    {children, reviewID, presetValues, ...onSubmitConfig}: FormProps
): ReactElement {
    const id = useId();
    const formID = `reset-review-likes-form-${id}`;

    const form = useModerationMessageForm({presetValues});
    const {mutateAsync, isPending, isError} = useResetReviewLikesMutation({reviewID});

    const resetLikes = async (values: ModerationMessageFormData) => {
        await handleCustomerReviewFormSubmit({
            form,
            data: values,
            submitData: mutateAsync,
            ...onSubmitConfig,
        });
    };

    return (
        <BaseFormContextProvider formID={formID} isPending={isPending} isError={isError} submitHandler={resetLikes}>
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(resetLikes)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}