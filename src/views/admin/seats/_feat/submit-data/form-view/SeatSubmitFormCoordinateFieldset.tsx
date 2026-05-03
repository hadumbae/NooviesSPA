/**
 * @fileoverview Fieldset component for rendering seat grid coordinates (X and Y) with dynamic column layout.
 */

import {ReactElement} from 'react';
import {cn} from "@/common/lib/utils.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {useFormContext} from "react-hook-form";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {SeatFormValues} from "@/domains/seats/_feat/submit-data/schemas/SeatFormValuesSchema.ts";
import {FormFieldsetProps} from "@/common/features/submit-data/formTypes.ts";

/**
 * Renders coordinate inputs for seat positioning, adjusting the grid layout based on field visibility.
 */
export function SeatSubmitFormCoordinateFieldset(
    {disableFields, className}: Omit<FormFieldsetProps<SeatFormValues>, "isNestedView">
): ReactElement {
    const {control} = useFormContext();

    const hasActiveField = !disableFields?.x && !disableFields?.y;

    return (
        <fieldset className={cn("space-y-4", className)}>
            <div>
                <PrimaryHeaderText>Coordinates</PrimaryHeaderText>
                <Separator/>
            </div>

            <div className={cn("grid gap-2", hasActiveField ? "grid-cols-2" : "grid-cols-1")}>
                {
                    !disableFields?.x &&
                    <HookFormInput
                        name="x"
                        label="X Coord."
                        type="number"
                        min={1}
                        step={1}
                        control={control}
                    />
                }

                {
                    !disableFields?.y &&
                    <HookFormInput
                        name="y"
                        label="Y Coord."
                        type="number"
                        min={1}
                        step={1}
                        control={control}
                    />
                }
            </div>
        </fieldset>
    );
}