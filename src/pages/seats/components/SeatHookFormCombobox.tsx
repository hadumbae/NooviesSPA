import {FieldValues, Path, PathValue, UseFormReturn} from "react-hook-form";
import HookSelectValue from "@/common/type/HookSelectValue.ts";
import HookFormCombobox from "@/common/components/forms/HookFormCombobox.tsx";
import useFetchAllSeats from "@/pages/seats/hooks/useFetchAllSeats.ts";
import QueryFilters from "@/common/type/QueryFilters.ts";
import {Loader} from "lucide-react";

interface Props<T extends FieldValues> {
    form: UseFormReturn<T>,
    name: Path<T>,
    label: string,
    placeholder?: string,
    description?: string,
    filters?: QueryFilters,
}

const SeatHookFormCombobox = <T extends FieldValues>(
    props: Props<T>
) => {
    const {placeholder = "Select A Value", filters = {}} = props
    const {data: seats, isPending, isError, error} = useFetchAllSeats({filters});

    if (isPending) return <Loader className="animate-spin" />;
    if (isError) return <span>{error!.message || "Unknown Error"}</span>;

    const values: HookSelectValue<T>[] = seats.map(
        (seat): HookSelectValue<T> => ({
            label: `${seat.row} | ${seat.seatNumber}`,
            key: seat._id,
            value: seat._id as PathValue<T, Path<T>>,
        }),
    );

    return (
        <HookFormCombobox
            {...props}
            values={values}
            placeholder={placeholder}
        />
    );
};

export default SeatHookFormCombobox;
