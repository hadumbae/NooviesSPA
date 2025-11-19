import { FC, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { TheatreFormValues } from "@/pages/theatres/schema/forms/TheatreForm.types.ts";
import { cn } from "@/common/lib/utils.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import CountryHookFormSelect from "@/common/components/forms/values/CountryHookFormSelect.tsx";
import { Separator } from "@/common/components/ui/separator.tsx";
import IANATimezoneHookFormSelect from "@/common/components/forms/values/IANATimezoneHookFormSelect.tsx";
import HookFormCheckbox from "@/common/components/forms/checkbox/HookFormCheckbox.tsx";

/**
 * Props for {@link TheatreSubmitFormLocationInputs}.
 */
export type TheatreSubmitFormLocationInputsProps = {
    /**
     * Optional class name to apply to the container.
     */
    className?: string;

    /**
     * The `react-hook-form` instance used to manage the theatre form state.
     */
    form: UseFormReturn<TheatreFormValues>;
};

/**
 * `TheatreSubmitFormLocationInputs` renders all form inputs related to a theatre's location.
 *
 * This includes:
 * - Street, city, state, postal code, and country
 * - Timezone (IANA format)
 * - Optional coordinates toggle and fields
 *
 * When **Include Coordinates** is unchecked, longitude and latitude fields are automatically cleared.
 *
 * @component
 * @example
 * ```tsx
 * const form = useForm<TheatreFormValues>();
 *
 * <TheatreSubmitFormLocationInputs form={form} className="mt-6" />
 * ```
 *
 * @remarks
 * This component is typically used inside the **Theatre submission form**.
 * It integrates directly with `react-hook-form` and custom `HookForm` components.
 */
const TheatreSubmitFormLocationInputs: FC<TheatreSubmitFormLocationInputsProps> = (props) => {
    const {className, form} = props;
    const includeCoordinates = form.watch("location.includeCoordinates");

    useEffect(() => {
        if (!includeCoordinates) {
            form.resetField("location.coordinates.coordinates.0");
            form.resetField("location.coordinates.coordinates.1");
        }
    }, [includeCoordinates, form]);

    return (
        <fieldset className="space-y-4">
            <div>
                <h1 className="text-lg font-bold">Location</h1>
                <Separator />
            </div>

            <div className={cn("grid grid-cols-2 gap-4", className)}>
                <HookFormInput
                    className="col-span-2"
                    name="location.street"
                    label="Street"
                    control={form.control}
                />

                <HookFormInput
                    className="col-span-2"
                    name="location.city"
                    label="City"
                    control={form.control}
                />

                <HookFormInput
                    className="col-span-2"
                    name="location.state"
                    label="State"
                    control={form.control}
                />

                <CountryHookFormSelect
                    className="col-span-2"
                    name="location.country"
                    label="Country"
                    control={form.control}
                    isMulti={false}
                />

                <HookFormInput
                    className="col-span-2"
                    name="location.postalCode"
                    label="Postal Code"
                    control={form.control}
                />

                <IANATimezoneHookFormSelect
                    className="col-span-2"
                    name="location.timezone"
                    label="Timezone"
                    control={form.control}
                />

                <HookFormCheckbox
                    className="col-span-2"
                    name="location.includeCoordinates"
                    label="Include Coordinates?"
                    control={form.control}
                />

                {includeCoordinates && (
                    <>
                        <HookFormInput
                            name="location.coordinates.coordinates.0"
                            label="Longitude"
                            control={form.control}
                        />
                        <HookFormInput
                            name="location.coordinates.coordinates.1"
                            label="Latitude"
                            control={form.control}
                        />
                    </>
                )}
            </div>
        </fieldset>
    );
};

export default TheatreSubmitFormLocationInputs;
