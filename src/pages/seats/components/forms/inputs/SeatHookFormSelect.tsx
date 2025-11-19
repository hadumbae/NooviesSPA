import { Control, FieldValues, Path } from "react-hook-form";
import { Loader } from "lucide-react";
import HookFormMultiSelect from "@/common/components/forms/select/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/select/HookFormSelect.tsx";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import ErrorMessageDisplay from "@/common/components/errors/ErrorMessageDisplay.tsx";
import { SeatArraySchema } from "@/pages/seats/schema/seat/Seat.schema.ts";
import useFetchSeats from "@/pages/seats/hooks/query/useFetchSeats.ts";

import { SeatQueryFilters } from "@/pages/seats/schema/queries/SeatQueryOption.types.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import { SeatArray } from "@/pages/seats/schema/seat/Seat.types.ts";

/**
 * Props for {@link SeatHookFormSelect}.
 *
 * @template T - The type of form values used with `react-hook-form`.
 */
type Props<T extends FieldValues> = {
    /** Name of the field in the form, corresponding to a key in `T` */
    name: Path<T>;
    /** Label displayed above the select input */
    label: string;
    /** Optional description displayed under the label */
    description?: string;
    /** Placeholder text for the select input */
    placeholder?: string;
    /** React Hook Form control object for this form */
    control: Control<T>;
    /** Optional filters to limit which seats are fetched */
    filters?: SeatQueryFilters;
    /** Whether multiple seat selection is allowed */
    isMulti?: boolean;
};

/**
 * A hook-form-integrated select input for choosing seats.
 *
 * Fetches seat data using {@link useFetchSeats}, validates it against {@link SeatArraySchema},
 * and renders either a single-select (`HookFormSelect`) or multi-select (`HookFormMultiSelect`) component.
 *
 * Handles loading and error states using {@link QueryBoundary} and {@link ValidatedQueryBoundary}.
 *
 * @template T - The type of form values used with `react-hook-form`.
 *
 * @param props - Component props of type {@link Props}.
 *
 * @returns A `HookFormSelect` or `HookFormMultiSelect` component bound to React Hook Form.
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
    const { isMulti = false, filters = {} } = props;
    const query = useFetchSeats({ queries: filters });

    return (
        <QueryBoundary query={query} loaderComponent={Loader} errorComponent={ErrorMessageDisplay}>
            <ValidatedQueryBoundary query={query} schema={SeatArraySchema} loaderComponent={Loader} errorComponent={ErrorMessageDisplay}>
                {(seats: SeatArray) => {
                    const options = seats.map(
                        ({ _id, row, seatNumber }): ReactSelectOption => ({ value: _id, label: `Seat ${seatNumber} (Row ${row})` })
                    );

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
