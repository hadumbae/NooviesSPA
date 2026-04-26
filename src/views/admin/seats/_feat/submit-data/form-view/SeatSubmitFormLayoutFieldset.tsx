/**
 * @fileoverview Fieldset component for the seat submission form handling the selection of seat layout types via radio buttons.
 */

import {ReactElement} from 'react';
import {SeatFormValues} from "@/domains/seats/_feat/submit-data/schemas/SeatFormValuesSchema.ts";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {FormViewProps} from "@/common/features/submit-data/formTypes.ts";
import {useFormContext} from "react-hook-form";
import {SeatLayoutTypeRadioGroup} from "@/views/admin/seats/_feat/form-inputs";

/** Props for the SeatSubmitFormLayoutFieldset component. */
type FieldsetProps = Pick<FormViewProps<SeatFormValues>, "disableFields">;

/**
 * Renders a radio group for layout type selection, allowing users to define if a grid unit is a seat or a structural element.
 */
export function SeatSubmitFormLayoutFieldset(
    {disableFields}: FieldsetProps
): ReactElement {
    const {control} = useFormContext();

    return (
        <fieldset className="space-y-4">
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