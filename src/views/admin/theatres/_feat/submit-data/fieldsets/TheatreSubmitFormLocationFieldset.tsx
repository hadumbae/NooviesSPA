/**
 * @fileoverview Fieldset containing address, timezone, and coordinate inputs for a theatre.
 */

import {ReactElement, useEffect} from "react";
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {Separator} from "@/common/components/ui";
import {HookFormCheckbox, HookFormInput} from "@/views/common/_feat";
import {HookFormSelect} from "@/views/common/_comp";
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

            <div className={cn("grid grid-cols-2 gap-4", className)}>
                <HookFormInput
                    classNames={{container: "col-span-2"}}
                    name="location.street"
                    label="Street"
                    control={control}
                />

                <HookFormInput
                    classNames={{container: "col-span-2"}}
                    name="location.city"
                    label="City"
                    control={control}
                />

                <HookFormInput
                    classNames={{container: "col-span-2"}}
                    name="location.state"
                    label="State"
                    control={control}
                />

                <HookFormSelect
                    classNames={{container: "col-span-2"}}
                    name="location.country"
                    label="Country"
                    options={ISO3166Alpha2CountryOptions}
                />

                <HookFormInput
                    classNames={{container: "col-span-2"}}
                    name="location.postalCode"
                    label="Postal Code"
                    control={control}
                />

                <HookFormSelect
                    classNames={{container: "col-span-2"}}
                    name="location.timezone"
                    label="Timezone"
                    options={IANATimezoneOptions}
                />

                <HookFormCheckbox
                    classNames={{container: "col-span-2"}}
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