/**
 * @file BrowseTheatreParamFormView.tsx
 *
 * Presentational form component for theatre browse parameters.
 *
 * Renders the input UI and delegates submission
 * behavior to the parent container.
 */

import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {Form} from "@/common/components/ui/form.tsx";
import useDebouncedFormAutoSubmit from "@/common/hooks/forms/useDebouncedFormAutoSubmit.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {
    BrowseTheatreParamFormValues,
} from "@/pages/theatres/schema/params/client/browse-theatre-list/BrowseTheatreParamSchema.ts";

/**
 * Props for the browse theatre parameter form view.
 */
type FormProps = {
    form: UseFormReturn<BrowseTheatreParamFormValues>;
    submitHandler: SubmitHandler<BrowseTheatreParamFormValues>;
    className?: string;
};

/**
 * Stateless browse theatre parameter form view.
 */
const BrowseTheatreParamFormView = (
    {form, submitHandler, className}: FormProps,
) => {
    useDebouncedFormAutoSubmit({
        form,
        submitHandler,
        timeout: 450,
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={className}
            >
                <HookFormInput
                    name="target"
                    label="City, State, Country, or Post Code"
                    hasLabel={false}
                    control={form.control}
                />
            </form>
        </Form>
    );
};

export default BrowseTheatreParamFormView;
