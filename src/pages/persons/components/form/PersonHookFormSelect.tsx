import {FC} from 'react';
import {Control} from "react-hook-form";
import HookFormMultiSelect from "@/common/components/forms/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/HookFormSelect.tsx";
import {Loader} from "lucide-react";
import ReactSelectOption from "@/common/type/component/ReactSelectOption.ts";
import useFetchPersons from "@/pages/persons/hooks/fetch/useFetchPersons.ts";
import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import ErrorMessageDisplay from "@/common/components/errors/ErrorMessageDisplay.tsx";
import {PersonArraySchema} from "@/pages/persons/schema/person/Person.schema.ts";
import {PersonQueryFilters} from "@/pages/persons/schema/queries/PersonFilter.types.ts";

interface Props {
    name: string,
    label: string;
    description?: string;
    placeholder?: string;
    control: Control<any>;
    filters?: PersonQueryFilters;
    isMulti?: boolean;
}

const PersonHookFormSelect: FC<Props> = (props) => {
    const {isMulti = false, filters = {}} = props;

    const {data, isPending, isError, error: queryError} = useFetchPersons(filters);
    const {success, error: parseError, data: persons} = useValidateData({
        data,
        isPending,
        schema: PersonArraySchema,
        message: "Invalid Person Data.",
    });

    if (isPending) return <Loader className="animate-spin" />;
    if (isError) return <ErrorMessageDisplay error={queryError} />;
    if (!success) return <ErrorMessageDisplay error={parseError} />;

    const options = persons.map(({_id, name}): ReactSelectOption => ({value: _id, label: name}));

    return (
        isMulti
            ? <HookFormMultiSelect options={options} {...props} />
            : <HookFormSelect options={options} {...props} />
    );
};

export default PersonHookFormSelect;
