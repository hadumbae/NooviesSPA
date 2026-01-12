/**
 * @file SeatHookFormSelect.tsx
 *
 * React Hook Form–integrated select component for choosing seats.
 *
 * Responsibilities:
 * - Fetch seat data with optional query filters
 * - Runtime-validate seat results
 * - Transform seats into React Select options
 * - Render a single- or multi-select hook-form field
 */

import {Control, FieldValues, Path} from "react-hook-form";
import {Loader} from "lucide-react";
import HookFormMultiSelect from "@/common/components/forms/select/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/select/HookFormSelect.tsx";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import useFetchSeats from "@/pages/seats/hooks/query/useFetchSeats.ts";
import {SeatArraySchema} from "@/pages/seats/schema/seat/SeatRelated.schema.ts";
import {SeatArray} from "@/pages/seats/schema/seat/SeatRelated.types.ts";
import buildString from "@/common/utility/buildString.ts";
import {SeatQueryFilters} from "@/pages/seats/schema/queries/SeatQueryMatchFilters.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";

/**
 * Props for {@link SeatHookFormSelect}.
 *
 * @template T - React Hook Form values type.
 */
type Props<T extends FieldValues> = {
    /** Form field name. */
    name: Path<T>;
    /** Field label. */
    label: string;
    /** Optional helper text. */
    description?: string;
    /** Placeholder text. */
    placeholder?: string;
    /** React Hook Form control instance. */
    control: Control<T>;
    /** Optional seat query filters. */
    filters?: SeatQueryFilters;
    /** Enable multi-seat selection. */
    isMulti?: boolean;
};

/**
 * **SeatHookFormSelect**
 *
 * Hook-form-controlled seat selection input.
 *
 * Flow:
 * 1. Fetch seats via {@link useFetchSeats}
 * 2. Validate results with {@link SeatArraySchema}
 * 3. Map seats to React Select options
 * 4. Render single or multi select
 *
 * Validation:
 * - Enforced at runtime by {@link ValidatedDataLoader}
 *
 * @template T - React Hook Form values type.
 *
 * @param props - {@link Props}
 *
 * @returns Seat select input bound to form state.
 *
 * @example
 * ```tsx
 * <SeatHookFormSelect
 *   name="selectedSeats"
 *   label="Select Seats"
 *   control={form.control}
 *   isMulti
 *   filters={{ row: "A" }}
 * />
 * ```
 */
const SeatHookFormSelect = <T extends FieldValues>(props: Props<T>) => {
    const {isMulti = false, filters = {layoutType: "SEAT"}} = props;

    const query = useFetchSeats({queries: filters});

    return (
        <ValidatedDataLoader
            query={query}
            schema={SeatArraySchema}
            loaderComponent={Loader}
        >
            {(seats: SeatArray) => {
                const options = seats
                    .filter(seat => seat.layoutType === "SEAT")
                    .map(
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
};

export default SeatHookFormSelect;
