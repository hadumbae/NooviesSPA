/**
 * @file TheatreQueryOptionFormFilterFieldset.tsx
 * @description Fieldset component for rendering filter inputs within the theatre query option form.
 * Dynamically displays input fields based on the active schema fields.
 */

import { FC } from 'react';
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import CountryHookFormSelect from "@/common/components/forms/values/CountryHookFormSelect.tsx";
import IANATimezoneHookFormSelect from "@/common/components/forms/values/IANATimezoneHookFormSelect.tsx";
import { UseFormReturn } from "react-hook-form";
import { TheatreQueryOptionFormValues } from "@/pages/theatres/schema/queries/TheatreQueryOptionFormSchema.ts";
import { TheatreQueryFilters } from "@/pages/theatres/schema/queries/TheatreQueryOption.types.ts";

/**
 * Props for {@link TheatreQueryOptionFormFilterFieldset}.
 */
type FieldsetProps = {
    /** The form instance from `react-hook-form`. */
    form: UseFormReturn<TheatreQueryOptionFormValues>;

    /**
     * A record of active filter fields derived from the schema.
     * Determines which input controls should be displayed.
     */
    activeFields: Record<keyof TheatreQueryFilters, boolean>;
};

/**
 * `TheatreQueryOptionFormFilterFieldset` renders a responsive set of
 * filter input controls for theatre query options.
 *
 * - Uses `HookFormInput` for text and number fields.
 * - Uses `CountryHookFormSelect` and `IANATimezoneHookFormSelect` for select inputs.
 * - Displays only the inputs that are marked active in `activeFields`.
 * - Integrates with `react-hook-form` for controlled state management.
 *
 * @component
 * @example
 * ```tsx
 * <TheatreQueryOptionFormFilterFieldset
 *   form={form}
 *   activeFields={{
 *     name: true,
 *     city: true,
 *     country: false
 *   }}
 * />
 * ```
 */
const TheatreQueryOptionFormFilterFieldset: FC<FieldsetProps> = (props) => {
    const { activeFields, form } = props;

    return (
        <fieldset className="grid grid-cols-1 gap-2">
            <section className="grid grid-cols-2 gap-2">
                {activeFields["name"] && (
                    <HookFormInput
                        name="name"
                        label="Name"
                        control={form.control}
                        className="col-span-2"
                    />
                )}

                {activeFields["street"] && (
                    <HookFormInput
                        name="street"
                        label="Street"
                        control={form.control}
                        className="col-span-2"
                    />
                )}

                {activeFields["city"] && (
                    <HookFormInput name="city" label="City" control={form.control} />
                )}

                {activeFields["state"] && (
                    <HookFormInput name="state" label="State" control={form.control} />
                )}

                {activeFields["postalCode"] && (
                    <HookFormInput
                        name="postalCode"
                        label="Postal Code"
                        control={form.control}
                    />
                )}

                {activeFields["seatCapacity"] && (
                    <HookFormInput
                        name="seatCapacity"
                        label="Seat Capacity"
                        type="number"
                        min={0}
                        control={form.control}
                    />
                )}
            </section>

            {activeFields["country"] && (
                <CountryHookFormSelect
                    name="country"
                    label="Country"
                    control={form.control}
                />
            )}

            {activeFields["timezone"] && (
                <IANATimezoneHookFormSelect
                    name="timezone"
                    label="Timezone"
                    control={form.control}
                />
            )}
        </fieldset>
    );
};

export default TheatreQueryOptionFormFilterFieldset;
