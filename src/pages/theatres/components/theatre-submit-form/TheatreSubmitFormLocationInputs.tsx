import {FC, useEffect} from 'react';
import {UseFormReturn} from "react-hook-form";
import {TheatreFormValues} from "@/pages/theatres/schema/forms/TheatreForm.types.ts";
import {cn} from "@/common/lib/utils.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import CountryHookFormSelect from "@/common/components/forms/values/CountryHookFormSelect.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import IANATimezoneHookFormSelect from "@/common/components/forms/timezone/IANATimezoneHookFormSelect.tsx";
import HookFormCheckbox from "@/common/components/forms/HookFormCheckbox.tsx";

type InputProps = {
    className?: string;
    form: UseFormReturn<TheatreFormValues>;
};

// TO-DO
// [x] street
// [x] city
// [x] state
// [x] country
// [X] postalCode
// [] timezone

const TheatreSubmitFormLocationInputs: FC<InputProps> = ({className, form}) => {
    const includeCoordinates = form.watch("location.includeCoordinates");

    useEffect(() => {
        if (!includeCoordinates) {
            form.resetField("location.coordinates.coordinates.0");
            form.resetField("location.coordinates.coordinates.1");
        }
    }, [includeCoordinates]);

    return (
        <fieldset className="space-y-4">
            <section>
                <h1 className="text-lg font-bold">Location</h1>
                <Separator/>
            </section>

            <section className={cn("grid grid-cols-2 gap-4", className)}>
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
                {
                    includeCoordinates && <>
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
                }
            </section>
        </fieldset>
    );
};

export default TheatreSubmitFormLocationInputs;
