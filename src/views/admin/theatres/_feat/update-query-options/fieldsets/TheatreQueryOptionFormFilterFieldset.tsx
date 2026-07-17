/**
 * @fileoverview Fieldset component for rendering dynamic filter inputs within the theatre query option form.
 */

import {ReactElement} from 'react';
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {HookFormInput} from "@/views/common/_feat";

import {TheatreQueryOptionFormStarterValues} from "@/domains/theatres";
import {HookFormSelect} from "@/views/common/_comp";
import {IANATimezoneOptions, ISO3166Alpha2CountryOptions} from "@/common/_const";

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
                        classNames={{container: "col-span-2"}}
                    />
                )}

                {!disableFields?.street && (
                    <HookFormInput
                        name="street"
                        label="Street"
                        control={control}
                        classNames={{container: "col-span-2"}}
                    />
                )}

                {!disableFields?.city && (
                    <HookFormInput name="city" label="City" control={control}/>
                )}

                {!disableFields?.state && (
                    <HookFormInput name="state" label="State" control={control}/>
                )}

                {!disableFields?.postalCode && (
                    <HookFormInput name="postalCode" label="Postal Code" control={control}/>
                )}

                {!disableFields?.seatCapacity && (
                    <HookFormInput name="seatCapacity" label="Seat Capacity" type="number" min={0} control={control}/>
                )}
            </section>

            {!disableFields?.country && (
                <HookFormSelect name="country" label="Country" options={ISO3166Alpha2CountryOptions}/>
            )}

            {!disableFields?.timezone && (
                <HookFormSelect name="timezone" label="Timezone" options={IANATimezoneOptions}/>
            )}
        </fieldset>
    );
}
