/**
 * @file SeatMapFormPriceFields.tsx
 * @summary
 * Price-related form fields for the Seat Map form.
 *
 * This component conditionally renders price inputs based on the provided
 * `activeFields` map, allowing dynamic enablement of pricing strategies
 * such as base pricing, multipliers, or explicit overrides.
 *
 * Integrates with `react-hook-form` via controlled inputs.
 */

import {SeatMapFormValues} from "@/pages/seatmap/schema/form/SeatMapForm.types.ts";
import {UseFormReturn} from "react-hook-form";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {cn} from "@/common/lib/utils.ts";
import {HookFormField} from "@/common/type/form/HookFormFieldGroupTypes.ts";
import {cloneElement} from "react";

/**
 * Props for {@link SeatMapFormPriceFields}.
 */
type FieldProps = {
    /**
     * Optional flag indicating the component is rendered inside a panel context.
     * Currently unused but reserved for layout or styling variations.
     */
    isPanel?: boolean;

    /**
     * React Hook Form instance for the Seat Map form.
     */
    form: UseFormReturn<SeatMapFormValues>;

    /**
     * Map of form fields indicating which price-related inputs
     * should be rendered.
     */
    activeFields: Record<keyof SeatMapFormValues, boolean>;
};

/**
 * Renders price-related inputs for the Seat Map form.
 *
 * Fields are displayed conditionally based on `activeFields`:
 * - `basePrice`
 * - `priceMultiplier`
 * - `overridePrice`
 *
 * @param props Component props
 * @returns JSX element containing the active price fields
 *
 * @example
 * ```tsx
 * <SeatMapFormPriceFields
 *   form={form}
 *   activeFields={{
 *     basePrice: true,
 *     priceMultiplier: false,
 *     overridePrice: true,
 *   }}
 * />
 * ```
 */
const SeatMapFormPriceFields = ({form, activeFields, isPanel}: FieldProps) => {
    const fieldGroup: HookFormField[] = [
        {
            key: "basePrice",
            render: activeFields["basePrice"],
            element: <HookFormInput
                label="Base Price"
                name="basePrice"
                control={form.control}
            />
        },
        {
            key: "priceMultiplier",
            render: activeFields["priceMultiplier"],
            element: <HookFormInput
                label="Price Multiplier"
                name="priceMultiplier"
                control={form.control}
            />
        },
        {
            key: "overridePrice",
            render: activeFields["overridePrice"],
            element: <HookFormInput
                label="Override Price"
                name="overridePrice"
                control={form.control}
            />
        }
    ];

    const fields = fieldGroup.map(({render, key, element}) => render ? cloneElement(element, {key}) : null);

    return (
        <fieldset className="space-y-4">
            <div>
                <PrimaryHeaderText>Price</PrimaryHeaderText>
                <Separator/>
            </div>


            <div className={cn("grid gap-4", isPanel ? "grid-cols-1" : "grid-cols-3")}>
                {fields}
            </div>
        </fieldset>
    );
};

export default SeatMapFormPriceFields;
