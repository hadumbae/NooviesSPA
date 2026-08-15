/**
 * @fileoverview Fieldset containing address, timezone, and coordinate inputs for a theatre.
 */

import {cn} from "@/common/_feat";
import {ReactElement, useEffect} from "react";
import {useFormContext} from "react-hook-form";
import {Separator} from "@/views/common/_comp/ui";
import {HookFormSelect} from "@/views/common/_comp";
import {HookFormCheckbox, HookFormInput} from "@/views/common/_feat";
import {IANATimezoneOptions, ISO3166Alpha2CountryOptions} from "@/common/_const";

/** Props for the TheatreSubmitFormLocationFieldset component. */
type InputProps = {
    className?: string;
};

/**
 * Renders location-specific form inputs including address details and geographic coordinates.
 */
export function TheatreSubmitFormLocationFieldset(
    {className}: InputProps
): ReactElement {
    const {resetField, control, watch} = useFormContext();

    const includeCoordinates = watch("location.includeCoordinates");

    useEffect(() => {
        if (!includeCoordinates) {
            resetField("location.coordinates.coordinates.0");
            resetField("location.coordinates.coordinates.1");
        }
    }, [includeCoordinates]);

    return (
        <fieldset className="space-y-4">
            <div>
                <h3 className="fieldset-header">Location</h3>
                <Separator/>
            </div>

            <div className={cn("space-y-4", className)}>
                <HookFormInput
                    name="location.street"
                    label="Street"
                    control={control}
                />

                <HookFormInput
                    name="location.city"
                    label="City"
                    control={control}
                />

                <HookFormInput
                    name="location.state"
                    label="State"
                    control={control}
                />

                <HookFormSelect
                    name="location.country"
                    label="Country"
                    options={ISO3166Alpha2CountryOptions}
                />

                <HookFormInput
                    name="location.postalCode"
                    label="Postal Code"
                    control={control}
                />

                <HookFormSelect
                    name="location.timezone"
                    label="Timezone"
                    options={IANATimezoneOptions}
                />

                <HookFormCheckbox
                    name="location.includeCoordinates"
                    label="Include Coordinates?"
                />

                {includeCoordinates && (
                    <>
                        <HookFormInput
                            name="location.coordinates.coordinates.0"
                            label="Longitude"
                            control={control}
                        />

                        <HookFormInput
                            name="location.coordinates.coordinates.1"
                            label="Latitude"
                            control={control}
                        />
                    </>
                )}
            </div>
        </fieldset>
    )
        ;
}