/**
 * @fileoverview Fieldset component for rendering seat grid coordinates (X and Y) with dynamic column layout.
 */

import {ReactElement} from 'react';
import {useFormContext} from "react-hook-form";
import {Separator} from "@/common/components/ui";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {HookFormInput} from "@/views/common/_feat";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {SeatFormValues} from "@/domains/seats";

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
                <h3 className="fieldset-header">Coordinates</h3>
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