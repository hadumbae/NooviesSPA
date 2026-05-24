/**
 * @fileoverview Fieldset component for the seat submission form handling the selection of seat layout types via radio buttons.
 */

import {ReactElement} from 'react';
import {SeatFormValues} from "@/domains/seats/_feat/submit-data/schemas/SeatFormValuesSchema.ts";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {useFormContext} from "react-hook-form";
import {SeatLayoutTypeRadioGroup} from "@/views/admin/seats/_feat/form-inputs";
import {cn} from "@/common/lib/utils.ts";

/** Renders the layout type fieldset containing the radio group selection. */
export function SeatSubmitFormLayoutFieldset(
    {disableFields, className}: FormFieldsetProps<SeatFormValues>
): ReactElement {
    const {control} = useFormContext();

    return (
        <fieldset className={cn("space-y-4", className)}>
            <div>
                <PrimaryHeaderText>Layout Type</PrimaryHeaderText>
                <Separator/>
            </div>

            {!disableFields?.layoutType && (
                <SeatLayoutTypeRadioGroup
                    name="layoutType"
                    label="Layout Type"
                    control={control}
                    className="flex space-x-5"
                />
            )}
        </fieldset>
    );
}