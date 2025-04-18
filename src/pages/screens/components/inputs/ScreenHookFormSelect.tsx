import {Control, FieldValues, Path} from "react-hook-form";
import QueryFilters from "@/common/type/QueryFilters.ts";
import {Loader} from "lucide-react";
import useFetchAllScreens from "@/pages/screens/hooks/queries/useFetchAllScreens.ts";
import {useEffect} from "react";
import ReactSelectOption from "@/common/type/component/ReactSelectOption.ts";
import HookFormMultiSelect from "@/common/components/forms/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/HookFormSelect.tsx";

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
    const {data: screens, isPending, isError, error, refetch} = useFetchAllScreens({filters});

    useEffect(() => {
        refetch();
    }, [filters]);

    if (isPending) return <Loader className="animate-spin" />;
    if (isError) return <span>{error!.message || "Unknown Error"}</span>;

    const options: ReactSelectOption[] = screens.map(
        (screen): ReactSelectOption => ({
            value: screen._id,
            label: `${screen.name} (${screen.screenType})`,
        }),
    );

    return (
        isMulti
            ? <HookFormMultiSelect<TSubmit> options={options} {...props} />
            : <HookFormSelect<TSubmit> options={options} {...props} />
    );
};

export default ScreenHookFormSelect;
