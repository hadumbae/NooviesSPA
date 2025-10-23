import {FC} from 'react';
import {Control} from "react-hook-form";
import HookFormMultiSelect from "@/common/components/forms/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/HookFormSelect.tsx";
import useFetchAllGenres from "@/pages/genres/hooks/useFetchAllGenres.ts";
import RequestQueryFilters from "@/common/type/request/RequestQueryFilters.ts";
import {Loader} from "lucide-react";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";

interface Props {
    name: string,
    label: string;
    description?: string;
    placeholder?: string;
    control: Control<any>;
    filters?: RequestQueryFilters;
    isMulti?: boolean;
}

const GenreHookFormSelect: FC<Props> = (props) => {
    const {isMulti = false, filters = {}} = props;

    const {data, isPending, isError, error} = useFetchAllGenres({filters});

    if (isPending) return <Loader className="animate-spin" />;
    if (isError) return <span className="text-neutral-500">{error?.message || "An Error Occurred."}</span>;

    const options = data.map(({_id, name}): ReactSelectOption => ({value: _id, label: name}));

    return (
        isMulti
            ? <HookFormMultiSelect options={options} {...props} />
            : <HookFormSelect options={options} {...props} />
    );
};

export default GenreHookFormSelect;
