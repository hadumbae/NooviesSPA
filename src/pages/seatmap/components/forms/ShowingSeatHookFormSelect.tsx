import {Control, FieldValues, Path} from "react-hook-form";
import {Loader} from "lucide-react";
import HookFormMultiSelect from "@/common/components/forms/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/HookFormSelect.tsx";
import ReactSelectOption from "@/common/type/component/ReactSelectOption.ts";
import useValidateData from "@/common/hooks/validation/useValidateData.ts";
import {SeatArray, SeatArraySchema} from "@/pages/seats/schema/SeatSchema.ts";
import ErrorMessage from "@/common/components/text/ErrorMessage.tsx";
import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import useFetchSeatsForShowing from "@/pages/showings/hooks/queries/useFetchSeatsForShowing.ts";

interface Props<T extends FieldValues> {
    name: Path<T>,
    label: string,
    description?: string,
    placeholder?: string,
    control: Control<T>,
    isMulti?: boolean,
    showingID: ObjectId,
    mapped?: boolean,
}

const ShowingSeatHookFormSelect = <T extends FieldValues>(props: Props<T>) => {
    const {showingID, isMulti = false, mapped = false} = props
    const {data, isPending, isError, error} = useFetchSeatsForShowing({showingID, mapped});

    const seats = useValidateData<typeof SeatArraySchema, SeatArray>({
        message: "[ShowingSeatHookFormSelect] Invalid `Seat` Data.",
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

export default ShowingSeatHookFormSelect;
