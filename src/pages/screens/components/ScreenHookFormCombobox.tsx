import {FieldValues, Path, PathValue, UseFormReturn} from "react-hook-form";
import HookSelectValue from "@/common/type/HookSelectValue.ts";
import HookFormCombobox from "@/common/components/forms/HookFormCombobox.tsx";
import QueryFilters from "@/common/type/QueryFilters.ts";
import {Loader} from "lucide-react";
import useFetchAllScreens from "@/pages/screens/hooks/useFetchAllScreens.ts";
import {useEffect} from "react";

interface Props<T extends FieldValues> {
    form: UseFormReturn<T>,
    name: Path<T>,
    label: string,
    placeholder?: string,
    description?: string,
    filters?: QueryFilters,
}

const ScreenHookFormCombobox = <T extends FieldValues>(
    props: Props<T>
) => {
    const {placeholder = "Select A Value", filters = {}} = props
    const {data: screens, isPending, isError, error, refetch} = useFetchAllScreens({filters});

    useEffect(() => {
        refetch();
    }, [filters]);

    if (isPending) return <Loader className="animate-spin" />;
    if (isError) return <span>{error!.message || "Unknown Error"}</span>;

    const values: HookSelectValue<T>[] = screens.map(
        (screen): HookSelectValue<T> => ({
            label: `${screen.name} (${screen.screenType})`,
            key: screen._id,
            value: screen._id as PathValue<T, Path<T>>,
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

export default ScreenHookFormCombobox;
