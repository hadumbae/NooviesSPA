/**
 * @fileoverview Fieldset component for rendering movie index query filter form inputs.
 */

import {ReactElement} from 'react';
import {useFormContext} from "react-hook-form";
import {cn, createFormFieldConfig, FormViewProps, renderFields} from "@/common/_feat";
import {MovieQueryOptionFormValues} from "@/domains/movies";
import {HookFormCheckbox, HookFormInput} from "@/views/common/_feat";
import {HookFormSelect} from "@/views/common/_comp";
import {ISO3166Alpha2CountryOptions} from "@/common/_const";
import {LabelledFormInput} from "@/views/admin/movies";
import {ConditionalRenderConfig} from "@/common/_types/form/HookFormFieldsetConfigTypes.ts";

/** Renders the form fields for filtering movie index query options. */
export function MovieIndexQueryOptionFormFilterFieldset(
    {disableFields, hideFields, className}: FormViewProps<MovieQueryOptionFormValues>
): ReactElement {
    const {control} = useFormContext();
    const field = createFormFieldConfig({disableFields, hideFields});

    const fields: ConditionalRenderConfig[] = [
        field({
            key: "title",
            element: <LabelledFormInput label="Title" classNames={{container: "md:col-span-2"}}>
                <HookFormInput name="title" control={control}/>
            </LabelledFormInput>
        }),
        field({
            key: "releaseDate",
            element: <LabelledFormInput label="Release Date">
                <HookFormInput name="releaseDate" type="date" control={control}/>
            </LabelledFormInput>
        }),
        field({
            key: "country",
            element: <LabelledFormInput label="Country">
                <HookFormSelect name="country" options={ISO3166Alpha2CountryOptions}/>
            </LabelledFormInput>
        }),
        field({
            key: "isReleased",
            element: <HookFormCheckbox name="isReleased" label="Is Released"/>
        }),
        field({
            key: "isAvailable",
            element: <HookFormCheckbox name="isAvailable" label="Is Available"/>
        }),
    ];

    return (
        <fieldset className={cn("grid grid-cols-1 md:md:grid-cols-2 xl:grid-cols-3 gap-4", className)}>
            {renderFields({fields})}
        </fieldset>
    );
}