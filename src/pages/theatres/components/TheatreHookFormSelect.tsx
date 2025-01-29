import {Control, FieldValues, Path} from "react-hook-form";
import useFetchAllTheatres from "@/pages/theatres/hooks/queries/useFetchAllTheatres.ts";
import QueryFilters from "@/common/type/QueryFilters.ts";
import {Loader} from "lucide-react";
import HookFormMultiSelect from "@/common/components/forms/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/HookFormSelect.tsx";
import ReactSelectOption from "@/common/type/component/ReactSelectOption.ts";

interface Props<TSubmit extends FieldValues> {
    name: Path<TSubmit>,
    label: string,
    description?: string,
    placeholder?: string;
    control: Control<TSubmit>,
    isMulti?: boolean;
    filters?: QueryFilters,
}

const TheatreHookFormSelect = <TSubmit extends FieldValues>(props: Props<TSubmit>) => {
    const {isMulti = false, filters = {}} = props
    const {data: theatres, isPending, isError, error} = useFetchAllTheatres({filters});

    if (isPending) return <Loader className="animate-spin" />;
    if (isError) return <span>{error!.message || "Unknown Error"}</span>;

    const options: ReactSelectOption[] = theatres.map(
        (theatre): ReactSelectOption => ({label: theatre.name, value: theatre._id}),
    );

    return (
        isMulti
            ? <HookFormMultiSelect<TSubmit> options={options} {...props} />
            : <HookFormSelect<TSubmit> options={options} {...props} />
    );
};

export default TheatreHookFormSelect;
