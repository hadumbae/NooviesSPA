/**
 * @fileoverview Fieldset component for dynamic movie query filtering.
 */

import {ReactElement} from 'react';
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {GenreMultiSelect} from "@/views/admin/genres";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {PageSectionHeader} from "@/views/common/_comp/page";
import {MovieQueryOptionFormValues} from "@/domains/movies";
import {HookFormCheckbox, HookFormInput} from "@/views/common/_feat";
import {HookFormSelect} from "@/views/common/_comp";
import {ISO3166Alpha2CountryOptions} from "@/common/_const";

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
            <PageSectionHeader as="h3" text="Filters" className="text-base"/>

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
                    <HookFormSelect name="country" label="Country" options={ISO3166Alpha2CountryOptions}/>
                )}

                {!disableFields?.isReleased && (
                    <HookFormCheckbox name="isReleased" label="Is Released"/>
                )}

                {!disableFields?.isAvailable && (
                    <HookFormCheckbox name="isAvailable" label="Is Available"/>
                )}
            </div>
        </fieldset>
    );
}
