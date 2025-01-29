import {Control, FieldValues, Path} from "react-hook-form";
import {Loader} from "lucide-react";

import useFetchAllMovies from "@/pages/movies/hooks/queries/useFetchAllMovies.ts";

import QueryFilters from "@/common/type/QueryFilters.ts";
import ReactSelectOption from "@/common/type/component/ReactSelectOption.ts";

import HookFormSelect from "@/common/components/forms/HookFormSelect.tsx";
import HookFormMultiSelect from "@/common/components/forms/HookFormMultiSelect.tsx";

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
    const {data: movies, isPending, isError, error} = useFetchAllMovies({filters});

    if (isPending) return <Loader className="animate-spin" />;
    if (isError) return <span>{error!.message || "Unknown Error"}</span>;

    const options: ReactSelectOption[] = movies.map(
        (movie): ReactSelectOption => ({label: movie.title, value: movie._id}),
    );

    return (
        isMulti
            ? <HookFormMultiSelect<TSubmit> options={options} {...props} />
            : <HookFormSelect<TSubmit> options={options} {...props} />
    );
};

export default TheatreHookFormSelect;
