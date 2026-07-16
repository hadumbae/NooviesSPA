/**
 * @fileoverview Form wrapper for administrative operations that toggle the visibility of a movie review.
 */

import {ReactElement, ReactNode, useId} from "react";
import {ObjectId} from "@/common/_schemas";
import {Form} from "@/common/components/ui/form.tsx";
import {ModerationMessageFormData, useModerationMessageForm} from "@/common/_feat/moderation/forms";

import {MovieReview} from "@/domains/movie-reviews/_schema/model";
import {MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";
import {useToggleReviewPublicityMutation} from "@/domains/movie-reviews/_feat";
import {handleCustomerReviewFormSubmit} from "@/domains/customers";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";

/** Props for the ToggleReviewPublicityForm component. */
type FormProps = MutationResponseConfig<MovieReview, ModerationMessageFormData> & MutationFormResetConfig & {
    children: ReactNode;
    reviewID: ObjectId;
    presetValues?: Partial<ModerationMessageFormData>;
};

/**
 * Orchestrates the data flow and submission logic for toggling review visibility.
 */
export function ToggleReviewPublicityForm(
    {children, reviewID, presetValues, ...onSubmitConfig}: FormProps
): ReactElement {
    const id = useId();
    const formKey = `toggle-review-publicity-form-${id}`;

    const form = useModerationMessageForm({presetValues});
    const {mutateAsync, isPending, isError} = useToggleReviewPublicityMutation({reviewID});

    const togglePublicity = async (values: ModerationMessageFormData) => {
        await handleCustomerReviewFormSubmit({
            form,
            data: values,
            submitData: mutateAsync,
            ...onSubmitConfig,
        });
    };

    return (
        <BaseFormContextProvider
            formID={formKey}
            isPending={isPending}
            isError={isError}
            submitHandler={togglePublicity}
        >
            <Form {...form}>
                <form id={formKey} onSubmit={form.handleSubmit(togglePublicity)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}
