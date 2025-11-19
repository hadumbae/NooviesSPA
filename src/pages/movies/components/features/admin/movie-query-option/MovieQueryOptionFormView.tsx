/**
 * @file MovieQueryOptionFormView.tsx
 * @description
 * Provides a dynamic and schema-driven filter and sort form for querying movies.
 * This component integrates with `react-hook-form` and uses a Zod schema to dynamically
 * enable or disable form fields based on configuration. It supports auto-submission with
 * a debounce delay, ideal for real-time search or filtering UIs.
 */

import {FC} from 'react';
import {SearchParamFormViewProps} from "@/common/type/form/SearchParamFormProps.ts";
import {MovieQueryOptionFormValues} from "@/pages/movies/schema/queries/MovieQueryOptionFormValueSchema.ts";
import {Form} from "@/common/components/ui/form.tsx";
import getActiveSchemaInputFields from "@/common/utility/forms/getActiveSchemaInputFields.ts";
import {MovieQueryOptionSchema} from "@/pages/movies/schema/queries/MovieQueryOption.schema.ts";
import useDebouncedFormAutoSubmit from "@/common/hooks/forms/useDebouncedFormAutoSubmit.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import GenreHookFormSelect from "@/pages/genres/components/input/GenreHookFormSelect.tsx";
import {cn} from "@/common/lib/utils.ts";
import CountryHookFormSelect from "@/common/components/forms/values/CountryHookFormSelect.tsx";
import HookFormCheckbox from "@/common/components/forms/checkbox/HookFormCheckbox.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import HookFormSortToggle from "@/common/components/forms/HookFormSortToggle.tsx";

/**
 * Props for {@link MovieQueryOptionFormView}.
 *
 * @template T
 * @extends SearchParamFormViewProps<MovieQueryOptionFormValues>
 * @property {UseFormReturn<MovieQueryOptionFormValues>} form
 *   The `react-hook-form` controller managing the form state.
 * @property {(data: MovieQueryOptionFormValues) => void} submitHandler
 *   Callback invoked when the form is submitted.
 * @property {string[]} [disableFields]
 *   Optional list of schema field keys to disable (prevent rendering).
 * @property {string} [className]
 *   Optional CSS class names for additional styling or layout control.
 */
type FormViewProps = SearchParamFormViewProps<MovieQueryOptionFormValues>;

/**
 * @component MovieQueryOptionFormView
 * @description
 * A flexible movie query form component that provides both **filter** and **sorting**
 * controls for querying movie data. The component dynamically renders input fields
 * based on a Zod schema and supports debounced auto-submission to minimize redundant updates.
 *
 * ### Features
 * - **Dynamic Field Rendering:** Uses `getActiveSchemaInputFields()` to show or hide form fields
 *   based on the active schema and disabled field list.
 * - **Auto Submission:** Automatically submits form data using `useDebouncedFormAutoSubmit()`
 *   with a 450ms debounce delay.
 * - **Schema-Driven Inputs:** Fully synchronized with `MovieQueryOptionSchema`.
 * - **Responsive Layout:** Uses Tailwind grid and flex utilities for consistent layout.
 * - **Rich Input Variety:** Supports text inputs, date inputs, select fields, checkboxes,
 *   and toggleable sort buttons.
 *
 * ### Example
 * ```tsx
 * <MovieQueryOptionFormView
 *   form={form}
 *   submitHandler={handleSearch}
 *   disableFields={["country"]}
 *   className="p-4 bg-white rounded-lg"
 * />
 * ```
 *
 * @returns {JSX.Element} Rendered movie query form with filters and sorting controls.
 */
const MovieQueryOptionFormView: FC<FormViewProps> = (props) => {
    const {form, className, disableFields, submitHandler} = props;

    // ⏳ Automatically submit the form after a 450ms delay when inputs change.
    useDebouncedFormAutoSubmit({form, submitHandler, timeout: 450});

    // ⚙️ Determine which schema fields are active and should be rendered.
    const activeFields = getActiveSchemaInputFields({
        disableFields,
        schema: MovieQueryOptionSchema
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn(className, "space-y-4")}
            >
                {/* Filters */}
                <fieldset className="grid grid-cols-2 gap-4">
                    <h1 className="text-lg font-bold">Filters</h1>

                    {activeFields["title"] && (
                        <HookFormInput
                            name="title"
                            label="Title"
                            control={form.control}
                            className="col-span-2"
                        />
                    )}

                    {activeFields["originalTitle"] && (
                        <HookFormInput
                            name="originalTitle"
                            label="Original Title"
                            control={form.control}
                            className="col-span-2"
                        />
                    )}

                    {activeFields["genres"] && (
                        <GenreHookFormSelect
                            name="genres"
                            label="Genres"
                            isMulti={true}
                            control={form.control}
                            className="col-span-2"
                        />
                    )}

                    {activeFields["releaseDate"] && (
                        <HookFormInput
                            name="releaseDate"
                            label="Release Date"
                            type="date"
                            control={form.control}
                        />
                    )}

                    {activeFields["country"] && (
                        <CountryHookFormSelect
                            name="country"
                            label="Country"
                            control={form.control}
                        />
                    )}

                    {activeFields["isReleased"] && (
                        <HookFormCheckbox
                            name="isReleased"
                            label="Is Released"
                            control={form.control}
                        />
                    )}

                    {activeFields["isAvailable"] && (
                        <HookFormCheckbox
                            name="isAvailable"
                            label="Is Available"
                            control={form.control}
                        />
                    )}
                </fieldset>

                <Separator/>

                {/* Sorts */}
                <fieldset className="space-y-4">
                    <h1 className="text-lg font-bold">Sorts</h1>

                    <div className="flex flex-wrap">
                        {activeFields["sortByReleaseDate"] && (
                            <HookFormSortToggle
                                name="sortByReleaseDate"
                                label="Release Date"
                                control={form.control}
                            />
                        )}

                        {activeFields["sortByTitle"] && (
                            <HookFormSortToggle
                                name="sortByTitle"
                                label="Title"
                                control={form.control}
                            />
                        )}

                        {activeFields["sortByOriginalTitle"] && (
                            <HookFormSortToggle
                                name="sortByOriginalTitle"
                                label="Original Title"
                                control={form.control}
                            />
                        )}

                        {activeFields["sortByIsReleased"] && (
                            <HookFormSortToggle
                                name="sortByIsReleased"
                                label="Is Released?"
                                control={form.control}
                            />
                        )}

                        {activeFields["sortByIsAvailable"] && (
                            <HookFormSortToggle
                                name="sortByIsAvailable"
                                label="Is Available?"
                                control={form.control}
                            />
                        )}

                        {activeFields["sortByCountry"] && (
                            <HookFormSortToggle
                                name="sortByCountry"
                                label="Country"
                                control={form.control}
                            />
                        )}
                    </div>
                </fieldset>
            </form>
        </Form>
    );
};

export default MovieQueryOptionFormView;
