/**
 * @fileoverview Fieldset component for dynamic movie query filtering.
 */

import {ReactElement} from 'react';
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {CountryHookFormSelect} from "@/common/components/forms/values/CountryHookFormSelect.tsx";
import HookFormCheckbox from "@/common/components/forms/checkbox/HookFormCheckbox.tsx";
import {GenreMultiSelect} from "@/views/admin/genres";
import {MovieQueryOptionFormValues} from "@/domains/movies/_feat/submit-queries/MovieQueryOptionFormValues";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {useFormContext} from "react-hook-form";
import {PageSectionHeader} from "@/views/common/_comp/page";
import {cn} from "@/common/lib/utils.ts";

/** Props for the MovieQueryOptionFormFilterFieldset component. */
type FieldsetProps = Omit<FormFieldsetProps<MovieQueryOptionFormValues>, "isNestedView">;

/**
 * Renders a dynamic set of movie filter inputs based on an active fields configuration.
 */
export function MovieQueryOptionFormFilterFieldset(
    {disableFields, className}: FieldsetProps
): ReactElement {
    const {control} = useFormContext();

    return (
        <fieldset className="space-y-4">
            <PageSectionHeader as="h2" text="Filters"/>

            <div className={cn("grid grid-cols-2 gap-4", className)}>
                {!disableFields?.title && (
                    <HookFormInput
                        name="title"
                        label="Title"
                        control={control}
                        classNames={{container: "col-span-2"}}
                    />
                )}

                {!disableFields?.originalTitle && (
                    <HookFormInput
                        name="originalTitle"
                        label="Original Title"
                        control={control}
                        classNames={{container: "col-span-2"}}
                    />
                )}

                {!disableFields?.genres && (
                    <GenreMultiSelect
                        name="genres"
                        label="Genres"
                        className="col-span-2"
                    />
                )}

                {!disableFields?.releaseDate && (
                    <HookFormInput
                        name="releaseDate"
                        label="Release Date"
                        type="date"
                        control={control}
                    />
                )}

                {!disableFields?.country && (
                    <CountryHookFormSelect
                        name="country"
                        label="Country"
                        control={control}
                    />
                )}

                {!disableFields?.isReleased && (
                    <HookFormCheckbox
                        name="isReleased"
                        label="Is Released"
                        control={control}
                    />
                )}

                {!disableFields?.isAvailable && (
                    <HookFormCheckbox
                        name="isAvailable"
                        label="Is Available"
                        control={control}
                    />
                )}
            </div>
        </fieldset>
    );
}
