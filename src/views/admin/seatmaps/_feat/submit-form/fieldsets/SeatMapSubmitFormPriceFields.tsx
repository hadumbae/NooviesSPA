/**
 * @fileoverview Price-related form fields for the Seat Map form.
 */

import {useFormContext} from "react-hook-form";
import {HookFormInput} from "@/views/common/_feat";
import {Separator} from "@/common/components/ui/separator.tsx";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {ReactElement} from "react";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {SeatMapFormValues} from "@/domains/seatmaps";
import {PageSectionHeader} from "@/views/common/_comp/page";

/** Props for the SeatMapFormPriceFields component. */
type ViewProps = FormFieldsetProps<SeatMapFormValues> & {
    isNestedView?: boolean;
}

/**
 * Renders pricing strategy inputs including base price, multipliers, and overrides.
 */
export function SeatMapSubmitFormPriceFields(
    {className, disableFields, isNestedView}: ViewProps
): ReactElement {
    const {control} = useFormContext();

    return (
        <fieldset className={cn("space-y-4", className)}>
            <div>
                <PageSectionHeader as="h2" text="Price"/>
                <Separator/>
            </div>

            <div className={cn("grid gap-4", isNestedView ? "grid-cols-1" : "grid-cols-3")}>
                {!disableFields?.basePrice && (
                    <HookFormInput label="Base Price" name="basePrice" control={control}/>
                )}

                {!disableFields?.priceMultiplier && (
                    <HookFormInput label="Price Multiplier" name="priceMultiplier" control={control}/>
                )}

                {!disableFields?.overridePrice && (
                    <HookFormInput label="Override Price" name="overridePrice" control={control}/>
                )}
            </div>
        </fieldset>
    );
}
