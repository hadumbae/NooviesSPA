import {Control, FieldValues, Path} from "react-hook-form";
import useFetchAllSeats from "@/pages/seats/hooks/useFetchAllSeats.ts";
import QueryFilters from "@/common/type/QueryFilters.ts";
import {Loader} from "lucide-react";
import HookFormMultiSelect from "@/common/components/forms/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/HookFormSelect.tsx";
import ReactSelectOption from "@/common/type/component/ReactSelectOption.ts";

interface Props<T extends FieldValues> {
    name: Path<T>,
    label: string,
    description?: string,
    placeholder?: string,
    control: Control<T>,
    filters?: QueryFilters,
    isMulti?: boolean,
}

const SeatHookFormSelect = <T extends FieldValues>(
    props: Props<T>
) => {
    const {isMulti = false, filters = {}} = props
    const {data, isPending, isError, error} = useFetchAllSeats({filters});

    if (isPending) return <Loader className="animate-spin" />;
    if (isError) return <span>{error!.message || "Unknown Error"}</span>;

    const options = data.map(
        ({_id, row, seatNumber}): ReactSelectOption => ({value: _id, label: `${seatNumber} (Row ${row})`})
    );

    return (
        isMulti
            ? <HookFormMultiSelect options={options} {...props} />
            : <HookFormSelect options={options} {...props} />
    );
};

export default SeatHookFormSelect;
