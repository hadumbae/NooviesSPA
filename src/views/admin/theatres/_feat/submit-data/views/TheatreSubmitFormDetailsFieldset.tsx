/**
 * @fileoverview Fieldset containing the core identity and capacity fields for a Theatre form.
 */

import {ReactElement} from "react";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {useFormContext} from "react-hook-form";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {TheatreFormStarterValues} from "@/domains/theatres/_feat/submit-data";
import {cn} from "@/common/lib/utils.ts";

/** Props for the TheatreSubmitFormDetailsFieldset component. */
type FieldProps = FormFieldsetProps<TheatreFormStarterValues>;

/**
 * Renders form fields for a theatre's name and seat capacity.
 */
export function TheatreSubmitFormDetailsFieldset(
    {disableFields, className}: FieldProps
): ReactElement {
    const {control} = useFormContext();

    return (
        <fieldset className="space-y-4">
            <div>
                <PrimaryHeaderText>Theatre</PrimaryHeaderText>
                <Separator/>
            </div>

            <div className={cn("grid grid-cols-1 gap-4", className)}>
                {
                    !disableFields?.name &&
                    <HookFormInput
                        name="name"
                        label="Name"
                        control={control}
                    />
                }

                {
                    !disableFields?.seatCapacity &&
                    <HookFormInput
                        name="seatCapacity"
                        label="Number Of Seats (Capacity)"
                        type="number"
                        min={0}
                        control={control}
                    />
                }
            </div>
        </fieldset>
    );
}