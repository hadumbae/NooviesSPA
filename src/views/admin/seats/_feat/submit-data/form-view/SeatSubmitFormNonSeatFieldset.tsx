/**
 * @fileoverview Renders the form fields for non-seat elements such as aisles and stairs.
 */

import {ReactElement} from 'react';
import {SeatFormValues} from "@/domains/seats/_feat/submit-data/schemas/SeatFormValuesSchema.ts";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/lib/utils.ts";

/** Renders the non-seat fieldset containing row and coordinate inputs. */
export function SeatSubmitFormNonSeatFieldset(
    {disableFields, isNestedView, className}: FormFieldsetProps<SeatFormValues>
): ReactElement {
    const {control} = useFormContext();

    return (
        <fieldset className={cn("space-y-4", className)}>
            <div>
                <PrimaryHeaderText>Seat</PrimaryHeaderText>
                <Separator/>
            </div>

            <div className={cn("grid gap-2 grid-cols-3", isNestedView && "max-lg:grid-cols-2")}>
                {
                    !disableFields?.row &&
                    <HookFormInput
                        name="row"
                        label="Row"
                        control={control}
                        className={cn(isNestedView && "max-lg:col-span-2")}
                    />
                }

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