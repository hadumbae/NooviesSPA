/**
 * @file SeatSubmitFormLayoutFieldset
 *
 * A fieldset component for rendering the seat layout type selection UI
 * within the seat submission form. Integrates with React Hook Form and
 * conditionally displays the layout selector based on `activeFields`.
 */

import { FC, ReactElement } from 'react';
import { UseFormReturn } from "react-hook-form";
import { SeatFormValues } from "@/pages/seats/schema/form/SeatFormValuesSchema.ts";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import { Separator } from "@/common/components/ui/separator.tsx";
import SeatLayoutTypeRadioGroup from "@/pages/seats/components/forms/inputs/SeatLayoutTypeRadioGroup.tsx";

/**
 * Props for {@link SeatSubmitFormLayoutFieldset}.
 *
 * @template T - Form value type derived from React Hook Form.
 */
type FieldsetProps = {
    /**
     * The React Hook Form instance managing the seat form.
     */
    form: UseFormReturn<SeatFormValues>;

    /**
     * A record specifying which fields should be displayed.
     *
     * Each key corresponds to a field in {@link SeatFormValues},
     * and the boolean value determines whether the field is rendered.
     */
    activeFields: Record<keyof SeatFormValues, boolean>;
};

/**
 * SeatSubmitFormLayoutFieldset
 *
 * A presentational fieldset component that:
 * - Displays a header and separator for form organization.
 * - Conditionally renders the layout type radio selector based on `activeFields`.
 * - Integrates the layout selector with React Hook Form using `form.control`.
 *
 * @param props - Component props of type {@link FieldsetProps}.
 *
 * @returns {React.ReactElement}
 * A fully rendered fieldset containing optional seat-layout UI.
 *
 * @example
 * ```tsx
 * const form = useForm<SeatFormValues>();
 *
 * <SeatSubmitFormLayoutFieldset
 *   form={form}
 *   activeFields={{ layoutType: true, row: false, seatNumber: false, ... }}
 * />
 * ```
 */
const SeatSubmitFormLayoutFieldset: FC<FieldsetProps> = ({ form, activeFields }): ReactElement => {
    return (
        <fieldset className="space-y-4">
            <div>
                <PrimaryHeaderText>Layout Type</PrimaryHeaderText>
                <Separator />
            </div>

            {activeFields["layoutType"] && (
                <SeatLayoutTypeRadioGroup
                    name="layoutType"
                    label="Layout Type"
                    control={form.control}
                    className="flex space-x-5"
                />
            )}
        </fieldset>
    );
};

export default SeatSubmitFormLayoutFieldset;
