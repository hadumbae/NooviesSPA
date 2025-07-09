import {Control, FieldValues, Path} from "react-hook-form";
import {Loader} from "lucide-react";
import HookFormMultiSelect from "@/common/components/forms/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/HookFormSelect.tsx";
import ReactSelectOption from "@/common/type/component/ReactSelectOption.ts";
import ErrorMessageDisplay from "@/common/components/errors/ErrorMessageDisplay.tsx";
import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import {SeatArraySchema} from "@/pages/seats/schema/seat/Seat.schema.ts";
import useFetchSeats from "@/pages/seats/hooks/fetch/useFetchSeats.ts";

import {SeatQueryFilters} from "@/pages/seats/schema/queries/SeatFilter.types.ts";

interface Props<T extends FieldValues> {
    name: Path<T>,
    label: string,
    description?: string,
    placeholder?: string,
    control: Control<T>,
    filters?: SeatQueryFilters,
    isMulti?: boolean,
}

const SeatHookFormSelect = <T extends FieldValues>(props: Props<T>) => {
    const {isMulti = false, filters = {}} = props
    const {data, isPending, isError, error: queryError} = useFetchSeats(filters);
    const {data: seats, error: parseError, success} = useValidateData({
        data,
        isPending,
        schema: SeatArraySchema,
        message: "Failed to fetch seats. Please try again.",
    });

    if (isPending) return <Loader className="animate-spin"/>;
    if (isError) return <ErrorMessageDisplay error={queryError}/>;
    if (!success) return <ErrorMessageDisplay error={parseError}/>;

    const options = seats.map(
        ({_id, row, seatNumber}): ReactSelectOption =>
            ({value: _id, label: `Seat ${seatNumber} (Row ${row})`})
    );

    return (
        isMulti
            ? <HookFormMultiSelect options={options} {...props} />
            : <HookFormSelect options={options} {...props} />
    );
};

export default SeatHookFormSelect;
