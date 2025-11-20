/**
 * @file MovieQueryOptionFormFilterFieldset.tsx
 * @description
 * A fieldset component that renders an adaptive list of movie query filter inputs.
 * Each field is conditionally displayed based on the `activeFields` configuration.
 *
 * This component is intended to be used inside a larger movie query form and relies
 * on React Hook Form for state management.
 *
 * Automatically displays text inputs, selects, and checkboxes depending on which
 * fields are enabled. This makes the filter UI dynamic and easily configurable.
 *
 * @example
 * ```tsx
 * const form = useForm<MovieQueryOptionFormValues>();
 *
 * <MovieQueryOptionFormFilterFieldset
 *   form={form}
 *   activeFields={{
 *     title: true,
 *     originalTitle: false,
 *     genres: true,
 *     releaseDate: true,
 *     country: true,
 *     isReleased: true,
 *     isAvailable: false
 *   }}
 * />
 * ```
 */

import {FC} from 'react';
import {UseFormReturn} from "react-hook-form";
import {MovieQueryOptionFormValues} from "@/pages/movies/schema/queries/MovieQueryOptionFormValueSchema.ts";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import GenreHookFormSelect from "@/pages/genres/components/input/GenreHookFormSelect.tsx";
import CountryHookFormSelect from "@/common/components/forms/values/CountryHookFormSelect.tsx";
import HookFormCheckbox from "@/common/components/forms/checkbox/HookFormCheckbox.tsx";

/**
 * @typedef FieldsetProps
 * @description Props for the `MovieQueryOptionFormFilterFieldset` component.
 *
 * @property {UseFormReturn<MovieQueryOptionFormValues>} form
 * The React Hook Form instance managing the state of the movie query form.
 *
 * @property {Record<keyof MovieQueryOptionFormValues, boolean>} activeFields
 * A map that determines which fields should be displayed.
 * Each key corresponds to a field in the form schema; when set to `true`,
 * the corresponding input will be rendered in the fieldset.
 */
type FieldsetProps = {
    form: UseFormReturn<MovieQueryOptionFormValues>;
    activeFields: Record<keyof MovieQueryOptionFormValues, boolean>;
};

/**
 * @component MovieQueryOptionFormFilterFieldset
 * @description
 * Renders a dynamic set of filter inputs for movie queries.
 * Each filter input appears only if its corresponding flag in `activeFields` is enabled.
 *
 * Supported filters include:
 * - Title
 * - Original Title
 * - Genres (multi-select)
 * - Release Date
 * - Country
 * - Is Released (checkbox)
 * - Is Available (checkbox)
 *
 * This modular approach allows the parent component to configure exactly which
 * filters are shown based on context (e.g., user role, page section, or form mode).
 *
 * @param {FieldsetProps} props - Props containing the form reference and field activation map.
 * @returns {JSX.Element} A JSX `<fieldset>` with dynamically rendered form controls.
 */
const MovieQueryOptionFormFilterFieldset: FC<FieldsetProps> = ({form, activeFields}) => {
    return (
        <fieldset className="grid grid-cols-2 gap-4">
            <PrimaryHeaderText>Filters</PrimaryHeaderText>

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
    );
};

export default MovieQueryOptionFormFilterFieldset;
