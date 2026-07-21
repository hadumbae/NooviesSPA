/**
 * @fileoverview Fieldset component for dynamic movie query filtering.
 */

import {ReactElement} from 'react';
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/_feat";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {MovieQueryOptionFormValues} from "@/domains/movies";
import {HookFormCheckbox, HookFormInput} from "@/views/common/_feat";
import {HookFormSelect} from "@/views/common/_comp";
import {ISO3166Alpha2CountryOptions} from "@/common/_const";
import {LabelledFormInput} from "@/views/admin/movies";

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
        <fieldset className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
            {!disableFields?.title && (
                <LabelledFormInput label="Title">
                    <HookFormInput name="title" control={control}/>
                </LabelledFormInput>
            )}

            {!disableFields?.originalTitle && (
                <LabelledFormInput label="Oirignal Title">
                    <HookFormInput name="originalTitle" control={control}/>
                </LabelledFormInput>
            )}

            {!disableFields?.releaseDate && (
                <LabelledFormInput label="Release Date">
                    <HookFormInput name="releaseDate" type="date" control={control}/>
                </LabelledFormInput>
            )}

            {!disableFields?.country && (
                <LabelledFormInput label="Country">
                    <HookFormSelect name="country" options={ISO3166Alpha2CountryOptions}/>
                </LabelledFormInput>
            )}

            {!disableFields?.isReleased && (
                <HookFormCheckbox name="isReleased" label="Is Released"/>
            )}

            {!disableFields?.isAvailable && (
                <HookFormCheckbox name="isAvailable" label="Is Available"/>
            )}
        </fieldset>
    );
}
