/**
 * @file ReservationSeatMapInput.tsx
 *
 * React Hook Form wrapper for seat map selection.
 *
 * Bridges form state with the {@link ReservationSeatMapSelector}
 * component, allowing seat selections to be managed as a form field.
 */

import {FormField} from "@/common/components/ui/form.tsx";
import {Control, FieldValues, Path} from "react-hook-form";
import ReservationSeatMapSelector
    from "@/features/client/reservations/components/seating/ReservationSeatMapSelector.tsx";
import {SeatMapDetails} from "@/pages/seatmap/schema/model/SeatMap.types.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Props for {@link ReservationSeatMapInput}.
 */
type InputProps<TValues extends FieldValues> = {
    /** Field name within the form schema */
    name: Path<TValues>;

    /** React Hook Form control instance */
    control: Control<any>;

    /** Seat map data used for rendering selectable seats */
    seating: SeatMapDetails[];

    /** Optional CSS class for layout or styling */
    className?: string;
};

/**
 * Form input component for seat map selection.
 *
 * @remarks
 * - Integrates with React Hook Form via {@link FormField}
 * - Treats selected seats as an array of {@link ObjectId}
 * - Delegates rendering and interaction to `ReservationSeatMapSelector`
 *
 * @param props - Form control, field name, and seat map data
 */
const ReservationSeatMapInput = <TValues extends FieldValues>(
    {control, name, seating}: InputProps<TValues>
) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({field: {value, onChange}}) => (
                <ReservationSeatMapSelector
                    seating={seating}
                    value={value}
                    updateValue={(selection: ObjectId[]) =>
                        onChange(selection)
                    }
                />
            )}
        />
    );
};

export default ReservationSeatMapInput;
