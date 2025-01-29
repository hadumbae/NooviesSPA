import {FC} from 'react';
import {Control} from "react-hook-form";
import HookFormMultiSelect from "@/common/components/forms/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/HookFormSelect.tsx";
import useFetchAllPersons from "@/pages/persons/hooks/useFetchAllPersons.ts";
import QueryFilters from "@/common/type/QueryFilters.ts";
import {Loader} from "lucide-react";
import ReactSelectOption from "@/common/type/component/ReactSelectOption.ts";

interface Props {
    name: string,
    label: string;
    description?: string;
    placeholder?: string;
    control: Control<any>;
    filters?: QueryFilters;
    isMulti?: boolean;
}

const PersonHookFormSelect: FC<Props> = (props) => {
    const {isMulti = false, filters = {}} = props;

    const {data, isPending, isError, error} = useFetchAllPersons({filters});

    if (isPending) return <Loader className="animate-spin" />;
    if (isError) return <span className="text-neutral-500">{error?.message || "An Error Occurred."}</span>;

    const options = data.map(({_id, name}): ReactSelectOption => ({value: _id, label: name}));

    return (
        isMulti
            ? <HookFormMultiSelect options={options} {...props} />
            : <HookFormSelect options={options} {...props} />
    );
};

export default PersonHookFormSelect;
