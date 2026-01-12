/**
 * @file SeatMapFormReferenceFields.tsx
 *
 * @summary Form fields component for managing Seat references in a Seat Map form.
 *
 * @description
 * Renders reference-based input fields for a Seat Map form, including:
 * - Seat selection filtered by layout type and screen
 * - Dynamic activation of fields based on the `activeFields` configuration
 *
 * The component integrates with React Hook Form via `UseFormReturn`
 * and uses {@link SeatHookFormSelect} for selecting seat references.
 */

import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import SeatHookFormSelect from "@/pages/seats/components/forms/inputs/SeatHookFormSelect.tsx";
import {UseFormReturn} from "react-hook-form";
import {SeatMapFormValues} from "@/pages/seatmap/schema/form/SeatMapForm.types.ts";
import SeatMapStatusRadioGroup from "@/pages/seatmap/components/forms/input/SeatMapStatusRadioGroup.tsx";
import {HookFormField} from "@/common/type/form/HookFormFieldGroupTypes.ts";
import {cloneElement} from "react";
import {SeatQueryOptions} from "@/pages/seats/schema/queries/SeatQueryOptions.ts";

/**
 * Props for {@link SeatMapFormDetailsFields}.
 */
type FieldProps = {
    /** React Hook Form instance controlling the Seat Map form. */
    form: UseFormReturn<SeatMapFormValues>;

    /** Record of which fields are currently active (true = visible/enabled). */
    activeFields: Record<keyof SeatMapFormValues, boolean>;

    /** ID of the screen associated with the Seat Map, used for filtering seats. */
    seatMapScreen: ObjectId;
};

/**
 * Renders Seat reference fields for the Seat Map form.
 *
 * - Filters available seats by `layoutType: "SEAT"` and the current `screen`
 * - Applies sorting by row and seat number
 * - Conditionally renders fields based on `activeFields`
 *
 * @param props - {@link FieldProps} including form, activeFields, and seatMapScreen
 *
 * @returns JSX element containing reference input fields
 *
 * @example
 * ```tsx
 * <SeatMapFormReferenceFields
 *   form={form}
 *   activeFields={{ seat: true }}
 *   seatMapScreen="abc123"
 * />
 * ```
 */
const SeatMapFormDetailsFields = (props: FieldProps) => {
    const {form, activeFields, seatMapScreen} = props;

    // --- Seat Filters ---
    const seatFilters: SeatQueryOptions = {
        layoutType: "SEAT",
        screen: seatMapScreen,
        sortByRow: 1,
        sortBySeatNumber: 1,
    };

    // --- Fields ---
    const fieldGroup: HookFormField[] = [
        {
            key: "seat-map-seat",
            render: activeFields["seat"],
            element: <SeatHookFormSelect
                name="seat"
                label="Seat"
                control={form.control}
                filters={seatFilters}
            />
        },
        {
            key: "seat-map-status",
            render: activeFields["status"],
            element: <SeatMapStatusRadioGroup
                name="status"
                label="Status"
                control={form.control}
                className="grid grid-cols-2 gap-4"
            />
        },

    ];

    const fields = fieldGroup.map(({render, key, element}) => render ? cloneElement(element, {key}) : null);

    // --- Render ---
    return (
        <fieldset className="space-y-4">
            <div>
                <PrimaryHeaderText as="h2">Details</PrimaryHeaderText>
                <Separator/>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {fields}
            </div>
        </fieldset>
    );
};

export default SeatMapFormDetailsFields;
