import {Control, FieldValues, Path} from "react-hook-form";
import QueryFilters from "@/common/type/QueryFilters.ts";
import {Loader} from "lucide-react";
import ReactSelectOption from "@/common/type/component/ReactSelectOption.ts";
import HookFormMultiSelect from "@/common/components/forms/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/HookFormSelect.tsx";
import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import {ScreenArraySchema} from "@/pages/screens/schema/screen/Screen.schema.ts";
import ErrorMessageDisplay from "@/common/components/errors/ErrorMessageDisplay.tsx";
import useFetchScreens from "@/pages/screens/hooks/queries/useFetchScreens.ts";

interface Props<TSubmit extends FieldValues> {
    name: Path<TSubmit>,
    label: string,
    description?: string,
    placeholder?: string;
    control: Control<TSubmit>,
    isMulti?: boolean;
    filters?: QueryFilters,
}

const ScreenHookFormSelect = <TSubmit extends FieldValues>(
    props: Props<TSubmit>
) => {
    const {isMulti = false, filters = {}} = props
    const {data, isPending, isError, error: queryError} = useFetchScreens(filters);
    const {success, data: screens, error: parseError} = useValidateData({
        data,
        isPending,
        schema: ScreenArraySchema,
        message: "Invalid Data Parsed. Please Try Again."
    });

    if (isPending) return <Loader className="animate-spin"/>;
    if (isError) return <ErrorMessageDisplay error={queryError}/>;
    if (!success) return <ErrorMessageDisplay error={parseError}/>;

    const options: ReactSelectOption[] = screens.map(
        ({_id, name, screenType}): ReactSelectOption => ({value: _id, label: `${name} (${screenType})`}),
    );

    return (
        isMulti
            ? <HookFormMultiSelect<TSubmit> options={options} {...props} />
            : <HookFormSelect<TSubmit> options={options} {...props} />
    );
};

export default ScreenHookFormSelect;
