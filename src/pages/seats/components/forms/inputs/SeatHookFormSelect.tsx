/**
 * @file SeatHookFormSelect.tsx
 *
 * A hook-form-integrated select component for choosing seats.
 *
 * This component:
 * - Fetches seat data via {@link useFetchSeats}.
 * - Validates query results using {@link SeatArraySchema}.
 * - Renders a single-select or multi-select React Select component
 *   wrapped in `react-hook-form` bindings.
 * - Handles loading and error states through {@link QueryBoundary}
 *   and {@link ValidatedQueryBoundary}.
 *
 * It is designed to serve as a reusable form input for selecting seats
 * within any form built using React Hook Form.
 */

import {Control, FieldValues, Path} from "react-hook-form";
import {Loader} from "lucide-react";
import HookFormMultiSelect from "@/common/components/forms/select/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/select/HookFormSelect.tsx";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import ErrorMessageDisplay from "@/common/components/errors/ErrorMessageDisplay.tsx";
import useFetchSeats from "@/pages/seats/hooks/query/useFetchSeats.ts";

import {SeatQueryFilters} from "@/pages/seats/schema/queries/SeatQueryOption.types.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {SeatArraySchema} from "@/pages/seats/schema/seat/SeatRelated.schema.ts";
import {SeatArray} from "@/pages/seats/schema/seat/SeatRelated.types.ts";
import buildString from "@/common/utility/buildString.ts";

/**
 * Props for {@link SeatHookFormSelect}.
 *
 * @template T - Form values type used with `react-hook-form`.
 */
type Props<T extends FieldValues> = {
    /** Name of the field in the form. Must be a key of `T`. */
    name: Path<T>;
    /** Label displayed above the select input. */
    label: string;
    /** Optional description shown under the label. */
    description?: string;
    /** Placeholder text for the select input. */
    placeholder?: string;
    /** React Hook Form control instance. */
    control: Control<T>;
    /** Optional filters used when fetching seats. */
    filters?: SeatQueryFilters;
    /** Whether the component should allow selecting multiple seats. */
    isMulti?: boolean;
};

/**
 * SeatHookFormSelect
 *
 * A form-controlled select component for choosing seats.
 *
 * This component integrates:
 * - **Data fetching:** via {@link useFetchSeats}
 * - **Validation:** against {@link SeatArraySchema}
 * - **Rendering:** using {@link HookFormSelect} or {@link HookFormMultiSelect}
 *
 * It also wraps the fetch operation in {@link QueryBoundary} and
 * {@link ValidatedQueryBoundary} to ensure the UI gracefully handles
 * loading states, errors, and schema validation.
 *
 * @template T - Form values type.
 *
 * @param props - {@link Props} used to configure the component.
 *
 * @returns A hook-form-bound select component for seat selection.
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
        <QueryBoundary query={query} loaderComponent={Loader} errorComponent={ErrorMessageDisplay}>
            <ValidatedQueryBoundary
                query={query}
                schema={SeatArraySchema}
                loaderComponent={Loader}
                errorComponent={ErrorMessageDisplay}
            >
                {(seats: SeatArray) => {
                    const options = seats
                        .filter(seat => seat.layoutType === "SEAT")
                        .map(({_id, row, seatNumber, x, y, seatLabel}): ReactSelectOption => ({
                            value: _id,
                            label: buildString([
                                `${row} • ${seatNumber}`,
                                seatLabel && `(${seatLabel})`,
                                "|",
                                `(X${x}, Y${y})`,
                            ]),
                        }));

                    return (
                        isMulti
                            ? <HookFormMultiSelect options={options} {...props} />
                            : <HookFormSelect options={options} {...props} />
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default SeatHookFormSelect;
