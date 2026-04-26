/**
 * @fileoverview Hook Form select component for choosing seats, supporting filtering and single/multi-selection.
 */

import {Control, FieldValues, Path} from "react-hook-form";
import {Loader} from "lucide-react";
import HookFormMultiSelect from "@/common/components/forms/select/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/select/HookFormSelect.tsx";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import useFetchSeats from "@/domains/seats/_feat/crud-hooks/useFetchSeats.ts";
import {SeatArraySchema} from "@/domains/seats/schema/seat/SeatRelated.schema.ts";
import {SeatArray} from "@/domains/seats/schema/seat/SeatRelated.types.ts";
import buildString from "@/common/utility/buildString.ts";
import {SeatQueryFilters} from "@/domains/seats/_feat/handle-query-options/SeatQueryMatchFilters.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {ReactElement} from "react";

/** Props for the SeatHookFormSelect component. */
type SelectProps<TValues extends FieldValues> = {
    name: Path<TValues>;
    label: string;
    description?: string;
    placeholder?: string;
    control: Control<TValues>;
    filters?: SeatQueryFilters;
    isMulti?: boolean;
};

/**
 * Renders a validated selection input for seats that maps query results to form options.
 */
export function SeatHookFormSelect<TValues extends FieldValues>(
    props: SelectProps<TValues>
): ReactElement {
    const {isMulti = false, filters = {layoutType: "SEAT"}} = props;
    const query = useFetchSeats({queries: filters});

    return (
        <ValidatedDataLoader query={query} schema={SeatArraySchema} loaderComponent={Loader}>
            {(seats: SeatArray) => {
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

                return isMulti
                    ? <HookFormMultiSelect options={options} {...props} />
                    : <HookFormSelect options={options} {...props} />;
            }}
        </ValidatedDataLoader>
    );
}