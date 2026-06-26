/**
 * @fileoverview Hook Form select component for choosing seats, supporting filtering and single/multi-selection.
 */

import {ReactElement} from "react";
import {FieldValues} from "react-hook-form";
import {Loader} from "lucide-react";
import {HookFormSelect} from "@/views/common/_comp/form-select/HookFormSelect.tsx";
import {ReactSelectOption} from "@/common/type/input/ReactSelectOption.ts";
import buildString from "@/common/utility/buildString.ts";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";

import {Seat, SeatQueryFilters, SeatSchema, useFetchSeats} from "@/domains/seats";

/** Props for the SeatHookFormSelect component. */
type SelectProps<TValues extends FieldValues> = Omit<HookFormInputControlProps<TValues>, "control"> & {
    filters?: SeatQueryFilters;
};

/**
 * Renders a validated selection input for seats that maps query results to form options.
 */
export function SeatHookFormSelect<TValues extends FieldValues>(
    {filters = {layoutType: "SEAT"}, ...rest}: SelectProps<TValues>
): ReactElement {
    const query = useFetchSeats({queries: filters, schema: generateArraySchema(SeatSchema)});

    return (
        <QueryDataLoader query={query} loaderComponent={Loader}>
            {(seats: Seat[]) => {
                const options = seats.filter(seat => seat.layoutType === "SEAT").map(
                    ({_id, row, seatNumber, x, y, seatLabel}): ReactSelectOption => ({
                        value: _id,
                        label: buildString([
                            `${row} • ${seatNumber}`,
                            seatLabel && `(${seatLabel})`,
                            "|",
                            `(X${x}, Y${y})`,
                        ]),
                    })
                );

                return (
                    <HookFormSelect options={options} {...rest} />
                );
            }}
        </QueryDataLoader>
    );
}