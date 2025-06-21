import {Control, FieldValues, Path} from "react-hook-form";
import QueryFilters from "@/common/type/QueryFilters.ts";
import {Loader} from "lucide-react";
import HookFormMultiSelect from "@/common/components/forms/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/HookFormSelect.tsx";
import ReactSelectOption from "@/common/type/component/ReactSelectOption.ts";
import useFetchTheatres from "@/pages/theatres/hooks/queries/query/fetch-by-query/useFetchTheatres.ts";
import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import {TheatreArraySchema} from "@/pages/theatres/schema/TheatreSchema.ts";
import ErrorMessageDisplay from "@/common/components/errors/ErrorMessageDisplay.tsx";

interface Props<TSubmit extends FieldValues> {
    name: Path<TSubmit>,
    label: string,
    description?: string,
    placeholder?: string;
    control: Control<TSubmit>,
    isMulti?: boolean;
    isDisabled?: boolean;
    filters?: QueryFilters,
}

const TheatreHookFormSelect = <TSubmit extends FieldValues>(props: Props<TSubmit>) => {
    const {isDisabled, isMulti = false, filters = {}} = props
    const {data, isPending, isError, error: queryError} = useFetchTheatres(filters);
    const {success, data: theatres, error: parseError} = useValidateData({
        isPending,
        data,
        schema: TheatreArraySchema,
        message: "Invalid Theatre Data.",
    });

    if (isPending) return <Loader className="animate-spin"/>;
    if (isError) return <ErrorMessageDisplay error={queryError} />;
    if (!success) return <ErrorMessageDisplay error={parseError} />;

    const options: ReactSelectOption[] = theatres.map(
        (theatre): ReactSelectOption => ({label: theatre.name, value: theatre._id}),
    );

    return (
        isMulti
            ? <HookFormMultiSelect<TSubmit> isDisabled={isDisabled} options={options} {...props} />
            : <HookFormSelect<TSubmit> isDisabled={isDisabled} options={options} {...props} />
    );
};

export default TheatreHookFormSelect;
