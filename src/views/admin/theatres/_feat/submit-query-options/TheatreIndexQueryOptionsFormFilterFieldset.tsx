/**
 * @fileoverview Renders a fieldset component containing filter inputs for theatre index query options.
 */

import {ReactElement} from "react";
import {cn, FormViewProps} from "@/common/_feat";
import {TheatreIndexQueryOptionsFormValues} from "@/domains/theatres";
import {HookFormSelect} from "@/views/common/_comp";
import {ISO3166Alpha2ShortCountryOptions} from "@/common/_const";
import {useFormContext} from "react-hook-form";
import {HookFormInput} from "@/views/common/_feat";
import {LabelledFormInput} from "@/views/admin/movies";

/**
 * Renders filter input fields for searching theatres by name, country, or postal code within a query options form.
 */
export function TheatreIndexQueryOptionsFormFilterFieldset(
    {className, disableFields, hideFields}: FormViewProps<TheatreIndexQueryOptionsFormValues>
): ReactElement {
    const {control} = useFormContext();

    return (
        <fieldset className={cn("query-option-fieldset-grid", className)}>
            {
                !hideFields?.name && (
                    <LabelledFormInput label="Name">
                        <HookFormInput
                            name="name"
                            control={control}
                            disabled={disableFields?.name}
                        />
                    </LabelledFormInput>
                )
            }

            {
                !hideFields?.country && (
                    <LabelledFormInput label="Country">
                        <HookFormSelect
                            name="country"
                            options={ISO3166Alpha2ShortCountryOptions}
                            disabled={disableFields?.country}
                        />
                    </LabelledFormInput>
                )
            }

            {
                !hideFields?.postalCode && (
                    <LabelledFormInput label="Postal Code">
                        <HookFormInput
                            name="postalCode"
                            control={control}
                            disabled={disableFields?.postalCode}
                        />
                    </LabelledFormInput>
                )
            }
        </fieldset>
    );
}