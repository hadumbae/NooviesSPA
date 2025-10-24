import {FC} from 'react';
import {Control} from "react-hook-form";
import HookFormMultiSelect from "@/common/components/forms/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/HookFormSelect.tsx";
import RequestQueryFilters from "@/common/type/request/RequestQueryFilters.ts";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import useFetchGenres from "@/pages/genres/hooks/useFetchGenres.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {GenreArraySchema} from "@/pages/genres/schema/genre/Genre.schema.ts";
import {GenreArray} from "@/pages/genres/schema/genre/Genre.types.ts";

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
    const query = useFetchGenres(filters);

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={GenreArraySchema}>
                {(genres: GenreArray) => {
                    const options = genres.map(({_id, name}): ReactSelectOption => ({value: _id, label: name}));

                    return (
                        isMulti
                            ? <HookFormMultiSelect options={options} {...props} />
                            : <HookFormSelect options={options} {...props} />
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default GenreHookFormSelect;
