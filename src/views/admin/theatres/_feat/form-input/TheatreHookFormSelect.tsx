/**
 * @fileoverview Form-integrated Theatre selection component.
 * Combines React Hook Form with server-side data fetching to provide a
 * validated, searchable dropdown of cinema venues.
 */

import {Control, FieldValues, Path} from "react-hook-form";
import {Loader} from "lucide-react";
import HookFormMultiSelect from "@/common/components/forms/select/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/select/HookFormSelect.tsx";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import {TheatreQueryOptions} from "@/domains/theatres/_feat/handle-query-options/TheatreQueryOption.types.ts";
import {useFetchTheatres} from "@/domains/theatres/_feat/crud-hooks";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {TheatreArray, TheatreArraySchema} from "@/domains/theatres/schema/theatre/TheatreArraySchema.ts";

/**
 * Props for {@link TheatreHookFormSelect}.
 * @template TSubmit - The type structure of the form being managed.
 */
type SelectProps<TSubmit extends FieldValues> = {
    name: Path<TSubmit>;
    label: string;
    description?: string;
    placeholder?: string;
    control: Control<TSubmit>;
    isMulti?: boolean;
    disabled?: boolean;
    filters?: TheatreQueryOptions;
};

/**
 * Theatre Selection Component (Hook Form & Query Integrated).
 */
const TheatreHookFormSelect = <TSubmit extends FieldValues>(
    props: SelectProps<TSubmit>
) => {
    const {disabled, isMulti = false, filters} = props;
    const query = useFetchTheatres({schema: TheatreArraySchema, queries: filters});

    return (
        <QueryDataLoader query={query} loaderComponent={Loader}>
            {(theatres: TheatreArray) => {
                const options: ReactSelectOption[] = theatres.map(
                    (theatre): ReactSelectOption => ({label: theatre.name, value: theatre._id}),
                );

                return isMulti
                    ? <HookFormMultiSelect<TSubmit>{...props} options={options} disabled={disabled}/>
                    : <HookFormSelect<TSubmit>{...props} options={options} disabled={disabled}/>

            }}
        </QueryDataLoader>
    );
};

export default TheatreHookFormSelect;