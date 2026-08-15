/**
 * @fileoverview Renders a fieldset component containing sort toggle controls for theatre index query options.
 */

import {ReactElement} from "react";
import {cn, FormViewProps} from "@/common/_feat";
import {TheatreIndexQueryOptionsFormValues} from "@/domains/theatres";
import {HookFormSortToggle} from "@/views/common/_feat";

/**
 * Renders sort options for ordering theatres by name, country, or postal code within a query options form.
 */
export function TheatreIndexQueryOptionsFormSortFieldset(
    {className, disableFields, hideFields}: FormViewProps<TheatreIndexQueryOptionsFormValues>
): ReactElement {
    return (
        <fieldset className={cn("query-option-fieldset-flex", className)}>
            {
                !hideFields?.sortByName && (
                    <HookFormSortToggle
                        name="sortByName"
                        label="Name"
                        disabled={disableFields?.sortByName}
                    />
                )
            }

            {
                !hideFields?.sortByCountry && (
                    <HookFormSortToggle
                        name="sortByCountry"
                        label="Country"
                        disabled={disableFields?.sortByCountry}
                    />
                )
            }

            {
                !hideFields?.sortByPostalCode && (
                    <HookFormSortToggle
                        name="sortByPostalCode"
                        label="Postal Code"
                        disabled={disableFields?.sortByPostalCode}
                    />
                )
            }
        </fieldset>
    );
}