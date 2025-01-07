import {FieldValues, Path, PathValue, UseFormReturn} from "react-hook-form";
import HookSelectValue from "@/common/type/HookSelectValue.ts";
import HookFormCombobox from "@/common/components/forms/HookFormCombobox.tsx";
import useFetchAllTheatres from "@/pages/theatres/hooks/useFetchAllTheatres.ts";
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

const TheatreHookFormCombobox = <T extends FieldValues>(
    props: Props<T>
) => {
    const {placeholder = "Select A Value", filters = {}} = props
    const {data: theatres, isPending, isError, error} = useFetchAllTheatres({filters});

    if (isPending) return <Loader className="animate-spin" />;
    if (isError) return <span>{error!.message || "Unknown Error"}</span>;

    const values: HookSelectValue<T>[] = theatres.map(
        (theatre): HookSelectValue<T> => ({
            label: theatre.name,
            key: theatre._id,
            value: theatre._id as PathValue<T, Path<T>>,
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

export default TheatreHookFormCombobox;
