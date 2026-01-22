/**
 * @file TheatreShowingQueryFormView.tsx
 *
 * Presentational form component for Theatre Showing queries.
 *
 * Responsibilities:
 * - Renders form inputs based on active schema fields
 * - Automatically submits changes using debounced behavior
 * - Respects disabled field configuration
 *
 * Contains no routing or URL logic.
 */

import {FormOptions} from "@/common/type/form/HookFormProps.ts";
import {
    TheatreShowingQueryFormValues
} from "@/pages/showings/schema/features/movie-showings/TheatreShowingQueryOptions.types.ts";
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {cn} from "@/common/lib/utils.ts";
import getActiveSchemaInputFields from "@/common/utility/forms/getActiveSchemaInputFields.ts";
import {
    TheatreShowingQueryFormValuesSchema
} from "@/pages/showings/schema/features/movie-showings/TheatreShowingQueryOptions.schema.ts";
import {Form} from "@/common/components/ui/form.tsx";
import CountryHookFormSelect from "@/common/components/forms/values/CountryHookFormSelect.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import useDebouncedFormAutoSubmit from "@/common/hooks/forms/useDebouncedFormAutoSubmit.ts";

/**
 * Props for {@link TheatreShowingQueryFormView}.
 */
type FormProps =
    Pick<FormOptions<TheatreShowingQueryFormValues>, "disableFields"> & {
    /** React Hook Form instance */
    form: UseFormReturn<TheatreShowingQueryFormValues>;
    /** Submit handler invoked on debounced form changes */
    submitHandler: SubmitHandler<TheatreShowingQueryFormValues>;
    /** Optional wrapper class name */
    className?: string;
};

/**
 * Stateless view component for Theatre Showing query inputs.
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
        schema: TheatreShowingQueryFormValuesSchema,
        disableFields,
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn("grid grid-cols-2 md:grid-cols-3 gap-2", className)}
            >
                {/* Slug filters */}
                <>
                    {activeFields.movieSlug && (
                        <HookFormInput
                            name="movieSlug"
                            label="Movie"
                            control={form.control}
                        />
                    )}

                    {activeFields.screenSlug && (
                        <HookFormInput
                            name="screenSlug"
                            label="Screen"
                            control={form.control}
                        />
                    )}

                    {activeFields.theatreSlug && (
                        <CountryHookFormSelect
                            name="theatreSlug"
                            label="Theatre"
                            control={form.control}
                        />
                    )}
                </>

                {/* Location filters */}
                <>
                    {activeFields.theatreCity && (
                        <HookFormInput
                            name="theatreCity"
                            label="City"
                            control={form.control}
                        />
                    )}

                    {activeFields.theatreState && (
                        <HookFormInput
                            name="theatreState"
                            label="State"
                            control={form.control}
                        />
                    )}

                    {activeFields.theatreCountry && (
                        <CountryHookFormSelect
                            name="theatreCountry"
                            label="Country"
                            control={form.control}
                            className="max-md:col-span-2"
                        />
                    )}
                </>
            </form>
        </Form>
    );
};

export default TheatreShowingQueryFormView;
