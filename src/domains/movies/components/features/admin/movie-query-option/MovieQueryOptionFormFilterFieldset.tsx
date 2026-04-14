/**
 * @fileoverview Fieldset component for dynamic movie query filtering.
 * Conditionally renders inputs based on an activeFields configuration map.
 */

import {ReactElement} from 'react';
import {UseFormReturn} from "react-hook-form";
import {MovieQueryOptionFormValues} from "@/domains/movies/schema/queries/MovieQueryOptionFormValueSchema.ts";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import CountryHookFormSelect from "@/common/components/forms/values/CountryHookFormSelect.tsx";
import HookFormCheckbox from "@/common/components/forms/checkbox/HookFormCheckbox.tsx";
import {GenreHookFormSelect} from "@/views/admin/genres/_comp/input/GenreHookFormSelect.tsx";

/**
 * Props for MovieQueryOptionFormFilterFieldset.
 */
type FieldsetProps = {
    form: UseFormReturn<MovieQueryOptionFormValues>;
    activeFields: Partial<Record<keyof MovieQueryOptionFormValues, boolean>>;
};

/**
 * Renders a dynamic set of movie filter inputs based on activeFields.
 */
export function MovieQueryOptionFormFilterFieldset(
    {form, activeFields}: FieldsetProps
): ReactElement {
    return (
        <fieldset className="grid grid-cols-2 gap-4">
            <PrimaryHeaderText>Filters</PrimaryHeaderText>

            {activeFields.title && (
                <HookFormInput
                    name="title"
                    label="Title"
                    control={form.control}
                    className="col-span-2"
                />
            )}

            {activeFields.originalTitle && (
                <HookFormInput
                    name="originalTitle"
                    label="Original Title"
                    control={form.control}
                    className="col-span-2"
                />
            )}

            {activeFields.genres && (
                <GenreHookFormSelect
                    name="genres"
                    label="Genres"
                    isMulti={true}
                    control={form.control}
                    className="col-span-2"
                />
            )}

            {activeFields.releaseDate && (
                <HookFormInput
                    name="releaseDate"
                    label="Release Date"
                    type="date"
                    control={form.control}
                />
            )}

            {activeFields.country && (
                <CountryHookFormSelect
                    name="country"
                    label="Country"
                    control={form.control}
                />
            )}

            {activeFields.isReleased && (
                <HookFormCheckbox
                    name="isReleased"
                    label="Is Released"
                    control={form.control}
                />
            )}

            {activeFields.isAvailable && (
                <HookFormCheckbox
                    name="isAvailable"
                    label="Is Available"
                    control={form.control}
                />
            )}
        </fieldset>
    );
}