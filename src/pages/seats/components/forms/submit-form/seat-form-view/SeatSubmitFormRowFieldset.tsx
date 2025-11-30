/**
 * @file SeatSubmitFormRowFieldset.tsx
 *
 * @summary
 * Renders the **Row-related fields** (row identifier, seat number, seat label)
 * of the Seat Submit Form. Each field is displayed conditionally based on
 * the `activeFields` configuration.
 *
 * @description
 * This component is part of the multi-section seat submission and editing workflow.
 * It integrates tightly with `react-hook-form` and the shared form input components.
 *
 * The fieldset may render:
 * - **Row** – The alpha or alphanumeric row identifier.
 * - **Seat Number** – The numeric seat position.
 * - **Seat Label** – A custom label override for the seat, if any.
 *
 * The layout uses a three-column grid but adapts gracefully depending on which
 * fields are active.
 */

import {FC} from 'react';
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {UseFormReturn} from "react-hook-form";
import {SeatFormValues} from "@/pages/seats/schema/form/SeatForm.types.ts";

/**
 * Props for {@link SeatSubmitFormRowFieldset}.
 *
 * @property form - The react-hook-form return object controlling this fieldset.
 * @property activeFields - A visibility map determining which row-related fields
 * should be rendered.
 */
type FieldsetProps = {
    /** The react-hook-form instance managing seat form state and validation. */
    form: UseFormReturn<SeatFormValues>;

    /**
     * Indicates which row fields to show.
     * Relevant keys include:
     * - `row`
     * - `seatNumber`
     * - `seatLabel`
     */
    activeFields: Record<keyof SeatFormValues, boolean>;
};

/**
 * @component SeatSubmitFormRowFieldset
 *
 * @description
 * A reusable fieldset for handling row metadata within the seat form.
 * All fields are optional and only rendered if explicitly activated through `activeFields`.
 *
 * @param props - See {@link FieldsetProps}.
 * @returns A labeled and separated fieldset with row inputs.
 *
 * @example
 * ```tsx
 * <SeatSubmitFormRowFieldset
 *   form={form}
 *   activeFields={{
 *     row: true,
 *     seatNumber: true,
 *     seatLabel: false,
 *     x: false,
 *     y: false,
 *     theatre: false,
 *     screen: false,
 *     seatType: false,
 *     priceMultiplier: false,
 *     isAvailable: false
 *   }}
 * />
 * ```
 */
const SeatSubmitFormRowFieldset: FC<FieldsetProps> = ({form, activeFields}) => {
    return (
        <fieldset className="space-y-2">
            <div>
                <PrimaryHeaderText>Row</PrimaryHeaderText>
                <Separator/>
            </div>

            <div className="grid grid-cols-3 gap-2">
                {activeFields["row"] && (
                    <HookFormInput
                        name="row"
                        label="Row"
                        control={form.control}
                    />
                )}

                {activeFields["seatNumber"] && (
                    <HookFormInput
                        name="seatNumber"
                        label="Number"
                        type="number"
                        min={1}
                        step={1}
                        control={form.control}
                    />
                )}

                {activeFields["seatLabel"] && (
                    <HookFormInput
                        name="seatLabel"
                        label="Label"
                        control={form.control}
                    />
                )}
            </div>
        </fieldset>
    );
};

export default SeatSubmitFormRowFieldset;
