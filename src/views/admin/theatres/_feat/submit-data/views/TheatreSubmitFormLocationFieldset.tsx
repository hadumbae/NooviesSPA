/**
 * @fileoverview Fieldset containing address, timezone, and coordinate inputs for a theatre.
 */

import {ReactElement, useEffect} from "react";
import {cn} from "@/common/lib/utils.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {CountryHookFormSelect} from "@/common/components/forms/values/CountryHookFormSelect.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {
    IANATimezoneHookFormSelect
} from "@/common/components/forms/values/IANATimezoneHookFormSelect.tsx";
import HookFormCheckbox from "@/common/components/forms/checkbox/HookFormCheckbox.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {LocationFormStarterValues} from "@/common/_models/location-form";
import {useFormContext} from "react-hook-form";

/** Props for the TheatreSubmitFormLocationFieldset component. */
type InputProps = FormFieldsetProps<LocationFormStarterValues>;

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
                <PrimaryHeaderText>Location</PrimaryHeaderText>
                <Separator/>
            </div>

            <div className={cn("grid grid-cols-2 gap-4", className)}>
                <HookFormInput
                    className="col-span-2"
                    name="location.street"
                    label="Street"
                    control={control}
                />

                <HookFormInput
                    className="col-span-2"
                    name="location.city"
                    label="City"
                    control={control}
                />

                <HookFormInput
                    className="col-span-2"
                    name="location.state"
                    label="State"
                    control={control}
                />

                <CountryHookFormSelect
                    className="col-span-2"
                    name="location.country"
                    label="Country"
                    control={control}
                    isMulti={false}
                />

                <HookFormInput
                    className="col-span-2"
                    name="location.postalCode"
                    label="Postal Code"
                    control={control}
                />

                <IANATimezoneHookFormSelect
                    className="col-span-2"
                    name="location.timezone"
                    label="Timezone"
                    control={control}
                />

                <HookFormCheckbox
                    className="col-span-2"
                    name="location.includeCoordinates"
                    label="Include Coordinates?"
                    control={control}
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
    );
}