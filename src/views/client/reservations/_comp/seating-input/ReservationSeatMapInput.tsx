/**
 * @fileoverview Form input component that integrates seat map selection with React Hook Form.
 */

import {FormField} from "@/common/components/ui/form.tsx";
import {Control, FieldValues, Path} from "react-hook-form";
import {
    ReservationSeatMapSelector
} from "@/views/client/reservations/_comp/seating-input/ReservationSeatMapSelector.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {ReactElement} from "react";

import {SeatMapDetails} from "@/domains/seatmap/_schema/model/SeatMapDetailsSchema";

/** Props for the ReservationSeatMapInput component. */
type InputProps<TValues extends FieldValues> = {
    name: Path<TValues>;
    control: Control<any>;
    seating: SeatMapDetails[];
    className?: string;
};

/**
 * A React Hook Form wrapper for the seat map selector component.
 */
export function ReservationSeatMapInput<TValues extends FieldValues>(
    {control, name, seating}: InputProps<TValues>
): ReactElement {
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
}
