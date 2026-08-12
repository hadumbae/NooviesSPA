/**
 * @fileoverview Renders form filter fields for querying person index lists.
 */

import {ReactElement} from "react";
import {cn} from "@/common/_feat";
import {LabelledFormInput} from "@/views/admin/movies";
import {HookFormInput} from "@/views/common/_feat";
import {DisableFields, HideFields} from "@/common/_types";
import {useFormContext} from "react-hook-form";
import {HookFormSelect} from "@/views/common/_comp";
import {ISO3166Alpha2ShortCountryOptions} from "@/common/_const";
import {
    PersonIndexQueryOptionsFormValues
} from "@/domains/persons/_feat/validate-query-options/person-index/PersonIndexQueryOptionSchema.ts";

/** Props for the PersonIndexQueryOptionsFormFilterFieldset component. */
type FieldsetProps = {
    className?: string;
    disableFields?: DisableFields<PersonIndexQueryOptionsFormValues>;
    hiddenFields?: HideFields<PersonIndexQueryOptionsFormValues>;
};

/**
 * Renders a set of form inputs for filtering person index query options.
 */
export function PersonIndexQueryOptionsFormFilterFieldset(
    {className, hiddenFields, disableFields}: FieldsetProps
): ReactElement {
    const {control} = useFormContext();

    return (
        <fieldset className={cn("grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4", className)}>
            {
                !hiddenFields?.name &&
                <LabelledFormInput label="Name">
                    <HookFormInput
                        name="name"
                        control={control}
                        disabled={disableFields?.name}
                    />
                </LabelledFormInput>
            }

            {
                !hiddenFields?.nationality &&
                <LabelledFormInput label="Email">
                    <HookFormSelect
                        name="nationality"
                        options={ISO3166Alpha2ShortCountryOptions}
                        disabled={disableFields?.name}
                    />
                </LabelledFormInput>
            }
        </fieldset>
    );
}