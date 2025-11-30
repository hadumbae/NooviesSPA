/**
 * @file SeatSubmitFormSeatFieldset.tsx
 *
 * @summary
 * A fieldset component responsible for rendering all **seat-specific** fields within
 * the seat submission form—such as seat type, price multiplier, and availability.
 *
 * @description
 * This fieldset displays inputs conditionally based on `activeFields`.
 * It integrates with `react-hook-form` and composes smaller reusable form-input components.
 * Fields rendered may include:
 * - **Seat Type** – Select input for choosing the seat’s category/type.
 * - **Price Multiplier** – Numeric input for modifying the seat’s price relative
 *   to base pricing.
 * - **Is Available** – Checkbox toggling whether the seat is available for booking.
 *
 * This fieldset is typically used alongside other fieldsets (coordinates/details) within the
 * seat creation or seat update workflow.
 */

import {FC} from 'react';
import {UseFormReturn} from "react-hook-form";
import {SeatFormValues} from "@/pages/seats/schema/form/SeatForm.types.ts";
import SeatTypeHookFormSelect from "@/pages/seats/components/forms/inputs/SeatTypeHookFormSelect.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormCheckbox from "@/common/components/forms/checkbox/HookFormCheckbox.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";

/**
 * Props for {@link SeatSubmitFormSeatFieldset}.
 *
 * @property form - The react-hook-form controller used to manage input state and validation.
 * @property activeFields - A map denoting which seat-related fields should be rendered.
 */
type FieldsetProps = {
    /** The react-hook-form instance managing the parent seat form. */
    form: UseFormReturn<SeatFormValues>;

    /**
     * A record describing which fields are active (visible). Relevant keys include:
     * - `seatType`
     * - `priceMultiplier`
     * - `isAvailable`
     */
    activeFields: Record<keyof SeatFormValues, boolean>;
};

/**
 * @component SeatSubmitFormSeatFieldset
 *
 * @description
 * Renders a “Seat” fieldset containing seat-type selection, price modifier input,
 * and an availability checkbox. Each field is only rendered if its corresponding
 * `activeFields` entry is true.
 *
 * @param props - {@link FieldsetProps}
 * @returns React element representing the seat fieldset.
 *
 * @example
 * ```tsx
 * <SeatSubmitFormSeatFieldset
 *   form={form}
 *   activeFields={{
 *     seatType: true,
 *     priceMultiplier: true,
 *     isAvailable: true,
 *     x: false,
 *     y: false,
 *     theatre: false,
 *     screen: false
 *   }}
 * />
 * ```
 */
const SeatSubmitFormSeatFieldset: FC<FieldsetProps> = ({form, activeFields}) => {
    return (
        <fieldset className="space-y-4">
            <div>
                <PrimaryHeaderText>Seat</PrimaryHeaderText>
                <Separator/>
            </div>

            <div className="grid grid-cols-2 gap-2">
                {
                    activeFields["seatType"] &&
                    <SeatTypeHookFormSelect
                        name="seatType"
                        label="Seat Type"
                        control={form.control}
                    />
                }

                {
                    activeFields["priceMultiplier"] &&
                    <HookFormInput
                        name="priceMultiplier"
                        label="Price Multiplier"
                        type="number"
                        min={0}
                        step={0.01}
                        control={form.control}
                    />
                }

                {
                    activeFields["isAvailable"] &&
                    <HookFormCheckbox
                        name="isAvailable"
                        label="Is Available?"
                        className="col-span-2"
                        control={form.control}
                    />
                }
            </div>
        </fieldset>
    );
};

export default SeatSubmitFormSeatFieldset;
