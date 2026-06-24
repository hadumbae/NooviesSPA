/**
 * @fileoverview Fieldset component for rendering dynamic filter inputs within the theatre query option form.
 *
 */
import {ReactElement} from 'react';
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/lib/utils.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {CountryHookFormSelect} from "@/common/components/forms/values/CountryHookFormSelect.tsx";
import {IANATimezoneHookFormSelect} from "@/common/components/forms/values/IANATimezoneHookFormSelect.tsx";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";

import {TheatreQueryOptionFormStarterValues} from "@/domains/theatres";

/**
 * Renders a responsive set of filter input controls for theatre query options based on active schema fields.
 */
export function TheatreQueryOptionFormFilterFieldset(
    {className, disableFields}: Omit<FormFieldsetProps<TheatreQueryOptionFormStarterValues>, "isNestedView">
): ReactElement {
    const {control} = useFormContext();

    return (
        <fieldset className={cn("grid grid-cols-1 gap-2", className)}>
            <section className="grid grid-cols-2 gap-2">
                {!disableFields?.name && (
                    <HookFormInput
                        name="name"
                        label="Name"
                        control={control}
                        className="col-span-2"
                    />
                )}

                {!disableFields?.street && (
                    <HookFormInput
                        name="street"
                        label="Street"
                        control={control}
                        className="col-span-2"
                    />
                )}

                {!disableFields?.city && (
                    <HookFormInput
                        name="city"
                        label="City"
                        control={control}
                    />
                )}

                {!disableFields?.state && (
                    <HookFormInput
                        name="state"
                        label="State"
                        control={control}
                    />
                )}

                {!disableFields?.postalCode && (
                    <HookFormInput
                        name="postalCode"
                        label="Postal Code"
                        control={control}
                    />
                )}

                {!disableFields?.seatCapacity && (
                    <HookFormInput
                        name="seatCapacity"
                        label="Seat Capacity"
                        type="number"
                        min={0}
                        control={control}
                    />
                )}
            </section>

            {!disableFields?.country && (
                <CountryHookFormSelect
                    name="country"
                    label="Country"
                    control={control}
                />
            )}

            {!disableFields?.timezone && (
                <IANATimezoneHookFormSelect
                    name="timezone"
                    label="Timezone"
                    control={control}
                />
            )}
        </fieldset>
    );
}
