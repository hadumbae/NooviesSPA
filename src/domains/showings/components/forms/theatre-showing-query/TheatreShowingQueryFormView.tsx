/**
 * @file Showings page query form view component.
 * @filename TheatreShowingQueryFormView.tsx
 */

import {FormOptions} from "@/common/type/form/HookFormProps.ts";
import {
    ShowingsPageQueryFormValues
} from "@/domains/movies/views/client/movie-info-showings-page/schemas/QueryStrings.types.ts";
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {cn} from "@/common/lib/utils.ts";
import getActiveSchemaInputFields from "@/common/utility/forms/getActiveSchemaInputFields.ts";
import {
    ShowingsPageQueryFormValuesSchema
} from "@/domains/movies/views/client/movie-info-showings-page/schemas/QueryStrings.schema.ts";
import {Form} from "@/common/components/ui/form.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import useDebouncedFormAutoSubmit from "@/common/hooks/forms/useDebouncedFormAutoSubmit.ts";

/**
 * Props for {@link TheatreShowingQueryFormView}.
 */
type FormProps =
    Pick<FormOptions<ShowingsPageQueryFormValues>, "disableFields"> & {
    /** React Hook Form instance. */
    form: UseFormReturn<ShowingsPageQueryFormValues>;
    /** Invoked when the form auto-submits. */
    submitHandler: SubmitHandler<ShowingsPageQueryFormValues>;
    /** Optional wrapper class name. */
    className?: string;
};

/**
 * View component for showings query inputs.
 */
const TheatreShowingQueryFormView = (
    {disableFields, form, submitHandler, className}: FormProps
) => {
    useDebouncedFormAutoSubmit({
        form,
        submitHandler,
        timeout: 450,
    });

    const activeFields = getActiveSchemaInputFields({
        schema: ShowingsPageQueryFormValuesSchema,
        disableFields,
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn("space-y-4", className)}
            >
                {activeFields.near && (
                    <HookFormInput
                        name="near"
                        type="text"
                        label="Location"
                        control={form.control}
                        className="col-span-2 md:col-span-4"
                    />
                )}

                {activeFields.page && (
                    <HookFormInput
                        name="page"
                        type="number"
                        min={1}
                        label="Showings Page"
                        control={form.control}
                        className="md:col-span-2"
                    />
                )}
            </form>
        </Form>
    );
};

export default TheatreShowingQueryFormView;