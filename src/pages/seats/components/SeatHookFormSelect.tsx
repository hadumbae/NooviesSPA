import {Control, FieldValues, Path} from "react-hook-form";
import useFetchAllSeats from "@/pages/seats/hooks/useFetchAllSeats.ts";
import QueryFilters from "@/common/type/QueryFilters.ts";
import {Loader} from "lucide-react";
import HookFormMultiSelect from "@/common/components/forms/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/HookFormSelect.tsx";
import ReactSelectOption from "@/common/type/component/ReactSelectOption.ts";
import useValidateData from "@/common/hooks/validation/useValidateData.ts";
import {SeatArray, SeatArraySchema} from "@/pages/seats/schema/SeatSchema.ts";
import ErrorMessage from "@/common/components/text/ErrorMessage.tsx";

interface Props<T extends FieldValues> {
    name: Path<T>,
    label: string,
    description?: string,
    placeholder?: string,
    control: Control<T>,
    filters?: QueryFilters,
    isMulti?: boolean,
}

const SeatHookFormSelect = <T extends FieldValues>(props: Props<T>) => {
    const {isMulti = false, filters = {}} = props
    const {data, isPending, isError, error} = useFetchAllSeats({filters});

    const seats = useValidateData<typeof SeatArraySchema, SeatArray>({
        message: "[SeatHookFormSelect] Invalid `Seat` Data.",
        schema: SeatArraySchema,
        isPending,
        data,
    });

    if (isPending) return <Loader className="animate-spin" />;
    if (isError) return <ErrorMessage error={error} />;

    const options = seats!.map(
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
