/**
 * @fileoverview Form component for resetting a review author's display name to system defaults.
 */

import {
    ResetReviewDisplayNameFormData,
    useResetReviewDisplayNameForm
} from "@/domains/movie-reviews/_feat/admin-actions/forms";
import {Form} from "@/common/components/ui/form.tsx";
import {useResetReviewDisplayNameMutation} from "@/domains/movie-reviews/_feat/admin-actions/mutations";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {ReactElement, ReactNode, useId} from "react";

import {MovieReview} from "@/domains/movie-reviews/_schema/model";
import {MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {handleCustomerReviewFormSubmit} from "@/domains/customers";

/** Props for the ResetReviewDisplayNameForm component. */
type FormProps = MutationResponseConfig<MovieReview, ResetReviewDisplayNameFormData> & MutationFormResetConfig & {
    children: ReactNode;
    reviewID: ObjectId;
    presetValues?: Partial<ResetReviewDisplayNameFormData>;
};

/**
 * Administrative form wrapper for reverting review display names to system defaults.
 */
export function ResetReviewDisplayNameForm(
    {children, reviewID, presetValues, ...onSubmitConfig}: FormProps
): ReactElement {
    const id = useId();
    const formID = `reset-review-display-name-form-${id}`;

    const form = useResetReviewDisplayNameForm({presetValues});
    const {mutateAsync, isPending, isError} = useResetReviewDisplayNameMutation({reviewID});

    const resetDisplayName = async (values: ResetReviewDisplayNameFormData) => {
        await handleCustomerReviewFormSubmit({
            form,
            data: values,
            submitData: mutateAsync,
            ...onSubmitConfig,
        });
    };

    return (
        <BaseFormContextProvider
            formID={formID}
            isPending={isPending}
            isError={isError}
            submitHandler={resetDisplayName}
        >
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(resetDisplayName)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}